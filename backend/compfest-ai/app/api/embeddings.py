from flask import request, jsonify
from . import embeddings_v1_bp
from app.service import embeddings_service

@embeddings_v1_bp.route('/', methods=["GET"])
def get_embeddings():
    data = request.get_json()
    input = data['input']
    embeddings = embeddings_service.generate_embeddings(input)
    return jsonify({
        "response" : str(embeddings)
    })

