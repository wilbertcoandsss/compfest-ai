import os
from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    if os.environ.get('FLASK_DEBUG')  == "1":
        app.config['DEBUG'] = True
        CORS(app)


    from app.api.routes import api_blueprint
    app.register_blueprint(api_blueprint)
    
    return app
