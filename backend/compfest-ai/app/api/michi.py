from flask import request, jsonify
from . import michi_blueprint

@michi_blueprint.route('/hello', methods=["GET"])
def hello():
    return jsonify({
        "response" : "i love michi"
    })

