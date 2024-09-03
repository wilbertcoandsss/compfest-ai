from flask import request, jsonify, current_app as app
from marshmallow.exceptions import ValidationError
from . import job_v2_bp
from app.service import pinecone_service, embedding_service, tokenizer_service
from app.schema.job import JobSchema
from app.schema.skill import SkillSchema
from app.schema.user_job_request import UserJobRequestSchema
from typing import List, Dict

@job_v2_bp.route('/recommendations', methods=["POST"])
def pinecone_job_recommendations_v2():
    data = request.get_json()
    
    try:
        user_job_request_schema = UserJobRequestSchema()
        user_job_request = user_job_request_schema.load(data)
    except ValidationError as err:
        return jsonify({
            "error": "Data does not match schema",
            "messages": err.messages
        }), 400 

    prompt = embedding_service.generate_user_job_request_prompt(user_job_request)
    vector = embedding_service.generate_embedding(prompt)
    namespace = "job_description"

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

