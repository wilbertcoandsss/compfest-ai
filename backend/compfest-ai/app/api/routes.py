from . import api_blueprint
from flask import request, jsonify


@api_blueprint.route('/michi', methods=["GET"])
def michi():
    return jsonify({
        "response" : "i love michi"
    })

