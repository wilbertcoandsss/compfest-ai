from flask import Blueprint

michi_bp = Blueprint('michi', __name__, url_prefix='/michi')
pinecone_bp = Blueprint('pinecone', __name__, url_prefix='/pinecone')
embeddings_v1_bp = Blueprint('embeddings', __name__, url_prefix='/embeddings/v1')

from . import michi
from . import pinecone
from . import embeddings

