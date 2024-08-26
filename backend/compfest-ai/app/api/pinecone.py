from flask import request, jsonify, current_app as app
from marshmallow.exceptions import ValidationError
from . import pinecone_v1_bp
from app.service import pinecone_service
from app.service import embeddings_service
from app.schema.job import JobSchema
from app.schema.skill import SkillSchema
from app.model.job import Job
from app.schema.job_request import JobRequestSchema
from app.utils.helper import flatten_metadata
from typing import List, Dict

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
    embeddings = embeddings_service.generate_embeddings(input)
    vector = embeddings.cpu().numpy().tolist()
    metadata = flatten_metadata(data)

    print(metadata)

    index_name = app.config['PINECONE_INDEX_NAME'] 
    namespace = "jobs_description" 
    response, status_code = pinecone_service.upsert_data(
        metadata=metadata,
        vector=vector,
        namespace=namespace,
        index_name=index_name
    ) 

    return jsonify({
        "message": response,
    }), status_code

@pinecone_v1_bp.route('/job/recommendations', methods=["POST"])
def pinecone_job_recommendations():
    data = request.get_json()
    
    try:
        job_request_schema = JobRequestSchema()
        job_request = job_request_schema.load(data)
    except ValidationError as err:
        return jsonify({
            "error": "Data does not match schema",
            "messages": err.messages
        }), 400 

    prompt = embeddings_service.generate_job_request_prompt(job_request)
    vector = embeddings_service.generate_embeddings(prompt)
    namespace = "jobs_description"

    res, status_code = pinecone_service.query(
        namespace=namespace,
        vector=vector,
    )    

    jobs: List[dict] = []
    job_schema = JobSchema()

    for r in res:
        if isinstance(r['metadata'].get('skills'), str):
            # Turn into list, then create a skill object
            r['metadata']['skills'] = [{"name": skill} for skill in [r['metadata']['skills']]]

        try:
            job_metadata = job_schema.load(r['metadata'])
            jobs.append({
                "id": r['id'],
                "job": job_schema.dump(job_metadata),
                "score": r['score']
            })
        except ValidationError as err:
            return jsonify({
                "error": "Failed to load job metadata",
                "messages": err.messages
            }), 400

    return jsonify({
        "response": jobs
    }), status_code
