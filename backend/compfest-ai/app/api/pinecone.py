from flask import request, jsonify, current_app as app
from marshmallow.exceptions import ValidationError
from . import pinecone_v1_bp
from app.service import pinecone_service
from app.service import embeddings_service
from app.schema.job import JobSchema

@pinecone_v1_bp.route('/manage/index/<string:mode>', methods=["POST"])
def pinecone_manage_index(mode:str):
    response, status_code = pinecone_service.manage_index(mode)
    return jsonify({
        "message": response
    }), status_code

"""
inserting additional jobs if necessary,
currently only using migrations
"""
@pinecone_v1_bp.route('/job/insert', methods=["POST"])
def pinecone_job_insert():
    data = request.get_json()

    try:
        job_schema = JobSchema()
        job = job_schema.load(data)
    except ValidationError as err:
        return jsonify({
            "error": "Data does not match schema",
            "messages": err.messages
        }), 400

    input = embeddings_service.generate_job_prompt(job)
    index_name = app.config['PINECONE_INDEX_NAME'] 
    
    response, status_code = pinecone_service.embed_and_upload_text(input, index_name) 
    return jsonify({
        "message": response,
    }), status_code

