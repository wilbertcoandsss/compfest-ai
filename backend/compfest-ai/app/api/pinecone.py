from flask import request, jsonify
from . import pinecone_blueprint
from app.services import pinecone_service

@pinecone_blueprint.route('/manage/<string:mode>', methods=["POST"])
def pinecone_manage_index(mode:str):
    response, status_code = pinecone_service.manage_index(mode)
    return jsonify({"message": response}), status_code
