import os
from flask import Flask
from flask_cors import CORS


def create_app(AppConfig):
    
    app = Flask(__name__)

    app.config.from_object(AppConfig)

    CORS(app)

    """ Register routes """
    from app.api.michi import michi_blueprint
    from app.api.pinecone import pinecone_blueprint
    from app.api.embeddings import embeddings_blueprint
    app.register_blueprint(michi_blueprint)
    app.register_blueprint(pinecone_blueprint)
    app.register_blueprint(embeddings_blueprint)


    return app
        

