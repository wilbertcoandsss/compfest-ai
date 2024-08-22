from flask import request, jsonify
from . import pinecone_bp
from app.services import pinecone_service

@pinecone_bp.route('/manage/index/<string:mode>', methods=["POST"])
def pinecone_manage_index(mode:str):
    response, status_code = pinecone_service.manage_index(mode)
    return jsonify({
        "message": response
    }), status_code

@pinecone_bp.route('/insert', methods=["POST"])
def pinecone_insert():
    data = request.get_json()
    input = data['input']
    # word = data['word']
    index_name = data['index_name']
    # response, status_code = pinecone_service.embed_and_upload_text(input, word, index_name) 
    response, status_code = pinecone_service.embed_and_upload_text(input, index_name) 
    return jsonify({
        "message": response,
    }), status_code

