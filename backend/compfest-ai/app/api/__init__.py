from flask import Blueprint

michi_blueprint = Blueprint('michi', __name__, url_prefix='/michi')
pinecone_blueprint = Blueprint('pinecone', __name__, url_prefix='/pinecone')
embeddings_blueprint = Blueprint('embeddings', __name__, url_prefix='/embeddings')

from . import michi
from . import pinecone
from . import embeddings

