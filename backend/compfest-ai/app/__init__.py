import os
from flask import Flask
from flask_cors import CORS


def create_app():
    
    app = Flask(__name__)

    if os.environ.get('FLASK_ENV')  == "production":
        from .config import ProductionConfig
        app.config.from_object(ProductionConfig)
    elif os.environ.get('FLASK_ENV')  == "development":
        from .config import DevelopmentConfig
        app.config.from_object(DevelopmentConfig)

    CORS(app)

    """ Register routes """
    from app.api.michi import michi_blueprint
    from app.api.pinecone import pinecone_blueprint
    app.register_blueprint(michi_blueprint)
    app.register_blueprint(pinecone_blueprint)


    return app
        

