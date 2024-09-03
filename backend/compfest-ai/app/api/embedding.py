from flask import request, jsonify
from . import embedding_v1_bp
from app.service import embedding_service

@embedding_v1_bp.route('/', methods=["POST"])
def get_embedding():
    """
    This generates an embedding vector if given a string
    """
    data = request.get_json()
    input = data['input']
    embedding = embedding_service.generate_embedding(input)
    return jsonify({
        "response" : str(embedding)
    })

