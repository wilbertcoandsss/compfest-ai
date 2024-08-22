from flask import request, jsonify
from . import michi_bp

@michi_bp.route('/', methods=["GET"])
def hello():
    return jsonify({
        "response" : "i love michi"
    })

