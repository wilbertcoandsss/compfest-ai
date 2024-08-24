import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv


def create_app():
   
    env = os.getenv('FLASK_ENV', 'development')
    dotenv_path = f'.env.{env}'

    load_dotenv(dotenv_path)

    from app.config import DevelopmentConfig, ProductionConfig, Config

    config_mapping = {
        'development': DevelopmentConfig,
        'production': ProductionConfig,
    }

    AppConfig = config_mapping.get(env, Config)

    app = Flask(__name__)

    app.config.from_object(AppConfig)

    CORS(app)

    """ Register routes """
    from .commands import cli_bp
    from app.api.michi import michi_bp
    from app.api.pinecone import pinecone_v1_bp
    from app.api.embeddings import embeddings_v1_bp
    app.register_blueprint(cli_bp)
    app.register_blueprint(michi_bp)
    app.register_blueprint(pinecone_v1_bp)
    app.register_blueprint(embeddings_v1_bp)


    return app
        

