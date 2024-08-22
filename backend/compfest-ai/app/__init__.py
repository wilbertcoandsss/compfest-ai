import os
from flask import Flask
from flask_cors import CORS


def create_app(AppConfig):
    
    app = Flask(__name__)

    app.config.from_object(AppConfig)

    CORS(app)

    """ Register routes """
    from app.api.michi import michi_bp
    from app.api.pinecone import pinecone_bp
    from app.api.embeddings import embeddings_v1_bp
    app.register_blueprint(michi_bp)
    app.register_blueprint(pinecone_bp)
    app.register_blueprint(embeddings_v1_bp)


    return app
        

