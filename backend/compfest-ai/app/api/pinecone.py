from flask import request, jsonify
from . import pinecone_v1_bp
from app.service import pinecone_service

@pinecone_v1_bp.route('/manage/index/<string:mode>', methods=["POST"])
def pinecone_manage_index(mode:str):
    """
    To manage pinecone indexes upon a fresh project.
    
    Arguements are to create or delete an set index based on the projects config

    "create" = to create the index
    "delete" = to delete the index
    """
    response, status_code = pinecone_service.manage_index(mode)
    return jsonify({
        "message": response
    }), status_code
