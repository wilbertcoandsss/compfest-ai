from flask import request, jsonify
from . import michi_blueprint

@michi_blueprint.route('/', methods=["GET"])
def hello():
    return jsonify({
        "response" : "i love michi"
    })

