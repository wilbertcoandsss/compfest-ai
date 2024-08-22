import os

class Config(object):
    """ Base config class """
    TESTING = False
    PORT = 3002
    DEBUG = os.getenv("DEBUG")
    MODE = os.getenv("FLASK_ENV")
    
    """ Pinecone configs """
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
    PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
    PINECONE_REGION = os.getenv("PINECONE_REGION", "us-east-1")
    PINECONE_DIMENSIONS = 1024
    PINECONE_SIMILARITY_METRICS = "cosine"
    PINECONE_CLOUD_PROVIDER = "aws"
    PINECONE_TOP_K = 5
    PINECONE_INCLUDE_VALUES = False
    PINECONE_METADATA = True

    """ Model configs """
    EMBEDDING_MODEL="cardiffnlp/twitter-roberta-base"
    
    
class ProductionConfig(Config):
    PORT = 3002

    
class DevelopmentConfig(Config):
    PORT = 5000
