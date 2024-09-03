from flask import request, jsonify, current_app as app
from marshmallow.exceptions import ValidationError
from . import user_v1_bp
from app.service import pinecone_service, embedding_service, tokenizer_service
from app.schema.user_job_request import UserJobRequestSchema
from app.utils.helper import flatten_metadata
from typing import List, Dict


@user_v1_bp.route('/preference', methods=["POST"])
def set_user_preference():
    """
    This creates the user preference.
    Then turning it a prompt then generates vector embedding based on that prompt,

    The vector representation will be the generated prompt, which is to future proof where
    theres an instance to query/recommend similar users

    This is used to later query recommendations for the user.
    
    Id will be the uuid of the user.
    Metadata will contain the generated prompt along with its associated parameters to create it.

    It returns void
    """
    
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
    metadata = flatten_metadata(data)
    namespace = "user_preference"
    index_name = app.config['PINECONE_INDEX_NAME'] 


    response, status_code =  pinecone_service.upsert_data(
        metadata=metadata,
        vector=vector,
        namespace=namespace,
        index_name=index_name,
        id=user_job_request.credentials
    )


    return jsonify({
        "message": response,
    }), status_code

