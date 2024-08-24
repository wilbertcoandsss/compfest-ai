from flask import request, jsonify, current_app as app
from . import pinecone_v1_bp
from app.services import pinecone_service
from app.services import embeddings_service
from app.schema.job import JobSchema

@pinecone_v1_bp.route('/manage/index/<string:mode>', methods=["POST"])
def pinecone_manage_index(mode:str):
    response, status_code = pinecone_service.manage_index(mode)
    return jsonify({
        "message": response
    }), status_code

@pinecone_v1_bp.route('/insert', methods=["POST"])
def pinecone_insert():
    data = request.get_json()

    job_schema = JobSchema()
    job = job_schema.load(data)

    input = embeddings_service.generate_job_prompt(job)
    index_name = app.config['PINECONE_INDEX_NAME'] 
    
    # input = data['input']
    # word = data['word']
    # index_name = data['index_name']
    # response, status_code = pinecone_service.embed_and_upload_text(input, word, index_name) 
    response, status_code = pinecone_service.embed_and_upload_text(input, index_name) 
    return jsonify({
        "message": response,
    }), status_code

