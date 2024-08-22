from flask import request, jsonify
from . import embeddings_blueprint
from app.services import embeddings_service

@embeddings_blueprint.route('/', methods=["GET"])
def generate_embeddings():
    res = request.get_json()
    print(res)
    embeddings = embeddings_service.get_embeddings(res['input'])
    return jsonify({
        "response" : str(embeddings)
    })

