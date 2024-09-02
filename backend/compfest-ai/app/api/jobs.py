from flask import request, jsonify, current_app as app
from marshmallow.exceptions import ValidationError
from . import jobs_v1_bp
from app.service import pinecone_service, embeddings_service, tokenizer_service
from app.schema.job import JobSchema
from app.schema.skill import SkillSchema
from app.model.job import Job
from app.schema.job_request import JobRequestSchema
from app.utils.helper import flatten_metadata
from typing import List, Dict

"""
inserting additional jobs if necessary,
currently only using migrations
"""
@jobs_v1_bp.route('/insert', methods=["POST"])
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

@jobs_v1_bp.route('/recommendations', methods=["POST"])
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
        if isinstance(r['metadata']['skills'], str):
            parsed_skills = tokenizer_service.parse_skills(r['metadata']['skills'])
            print(parsed_skills)

            r['metadata']['skills'] = [{"name": skill.strip()} for skill in parsed_skills if skill.strip()]

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

