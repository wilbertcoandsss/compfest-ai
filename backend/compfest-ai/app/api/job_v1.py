from flask import request, jsonify, current_app as app
from marshmallow.exceptions import ValidationError
from . import job_v1_bp
from app.service import pinecone_service, embedding_service, tokenizer_service
from app.schema.job import JobSchema
from app.schema.skill import SkillSchema
from app.schema.job_request import JobRequestSchema
from app.utils.helper import flatten_metadata
from typing import List, Dict


@job_v1_bp.route('/insert', methods=["POST"])
def pinecone_job_insert():
    """
    Inserting additional jobs if necessary,
    currently only using migrations
    """
    data = request.get_json()

    try:
        job_schema = JobSchema()
        job = job_schema.load(data)
    except ValidationError as err:
        return jsonify({
            "error": "Data does not match schema",
            "messages": err.messages
        }), 400

    input = embedding_service.generate_job_knowledge_base_prompt(data)
    embedding = embedding_service.generate_embedding(input)
    vector = embedding.cpu().numpy().tolist()
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



@job_v1_bp.route('/recommendations', methods=["POST"])
def pinecone_job_recommendations_v1():
    """
    This queries for job recommendations based on
    the job knowledge base in the "jobs_description" namespace.

    It takes a JobRequest as an arugment which is a subset of Job,
    Then turning it a prompt then generates vector embedding based on that prompt,
    It queries to the database and recommends similar jobs of k amount 

    It returns a list of Job with its corresponding id and score.
    Score determines the similarity to the given input.
    """
    data = request.get_json()
    
    try:
        job_request_schema = JobRequestSchema()
        job_request = job_request_schema.load(data)
    except ValidationError as err:
        return jsonify({
            "error": "Data does not match schema",
            "messages": err.messages
        }), 400 

    prompt = embedding_service.generate_job_request_prompt(job_request)
    vector = embedding_service.generate_embedding(prompt)
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

            r['metadata']['skills'] = [{"name": skill.strip()} for skill in parsed_skills]

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

