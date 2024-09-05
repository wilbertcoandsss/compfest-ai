from flask import request, jsonify, current_app as app
from marshmallow.exceptions import ValidationError
from . import job_v2_bp
from app.service import pinecone_service, embedding_service, tokenizer_service
from app.schema.job import JobSchema
from app.schema.skill import SkillSchema
from app.schema.user_job_request import UserJobRequestSchema
from typing import List, Dict

@job_v2_bp.route('/recommendations/<string:userid>', methods=["GET"])
def pinecone_job_recommendations_v2(userid):
    """
    This queries for job recommendations based on the user's preferences
    in the "user_preference" namespace using the user's ID.

    The user's preferences are then used to query the job knowledge base in the "job_descriptions" namespace.

    Returns a list of Job.

    insane code smell
    """
    user_preference_namespace = "user_preference"
    job_descriptions_namespace = "jobs_description"
    
    user_preference_res, status_code = pinecone_service.queryById(
            namespace=user_preference_namespace,
            id=userid
        )

    if status_code != 200:
        return jsonify({
            "error": "Failed to query by user ID",
        }),status_code

    if not user_preference_res or not isinstance(user_preference_res, list) or len(user_preference_res) == 0:
        return jsonify({
            "error": "User preference data is empty or malformed",
            "message": "No data found for the provided user ID."
        }), 404

    user_preference_data = user_preference_res[0]

    if isinstance(user_preference_data['metadata']['skills'], str):
            parsed_skills = tokenizer_service.parse_skills(user_preference_data['metadata']['skills'])
            user_preference_data['metadata']['skills'] = [{"name": skill.strip()} for skill in parsed_skills]

    try:
        user_job_request_schema = UserJobRequestSchema()
        user_preference = user_job_request_schema.load(user_preference_data['metadata'])
    except ValidationError as err:
        return jsonify({
            "error": "User preference data does not match schema",
            "messages": err.messages
        }), 400

    prompt = embedding_service.generate_user_job_request_prompt(user_preference)
    vector = embedding_service.generate_embedding(prompt)
    
    job_descriptions_res, status_code = pinecone_service.query(
            namespace=job_descriptions_namespace,
            vector=vector,
        )

    if status_code != 200:
        return jsonify({
            "error": "Failed to query job descriptions",
        }), status_code        

    jobs: List[dict] = []
    job_schema = JobSchema()

    for r in job_descriptions_res:
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
