import os

class Config(object):
    """ Base config class """
    TESTING = False
    PORT = 3001
    DEBUG = os.getenv("DEBUG")
    MODE = os.getenv("FLASK_ENV")
    
    """ Pinecone configs """
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
    PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
    PINECONE_REGION = os.getenv("PINECONE_REGION", "us-east-1")
    PINECONE_DIMENSIONS = 768
    PINECONE_SIMILARITY_METRICS = "cosine"
    PINECONE_CLOUD_PROVIDER = "aws"
    PINECONE_TOP_K = 5
    PINECONE_INCLUDE_VALUES = False
    PINECONE_METADATA = True
    PINECONE_DELETION_PROTECTION = "enabled"

    """ Model configs """
    MODEL_TYPE = "cardiffnlp/twitter-roberta-base"
    PRELOADED_DIR = f"./preloaded_model"
 
    
class ProductionConfig(Config):
    PORT = 3001

    
class DevelopmentConfig(Config):
    PORT = 5000
