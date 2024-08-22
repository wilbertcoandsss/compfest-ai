import os

class Config(object):
    """ Base config class """
    TESTING = False
    PORT = 3002
    DEBUG = os.getenv("DEBUG")
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
    PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
    PINECONE_REGION = os.getenv("us-east-1")
    MODE = os.getenv("FLASK_ENV")
    
    
    
class ProductionConfig(Config):
    PORT = 3002

    
class DevelopmentConfig(Config):
    PORT = 5000
