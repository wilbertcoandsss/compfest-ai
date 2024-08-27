from flask import Blueprint

michi_bp = Blueprint('michi', __name__, url_prefix='/michi')
pinecone_v1_bp = Blueprint('pinecone/v1', __name__, url_prefix='/pinecone/v1')
embeddings_v1_bp = Blueprint('embeddings/v1', __name__, url_prefix='/embeddings/v1')
jobs_v1_bp = Blueprint('jobs/v1', __name__, url_prefix='/jobs/v1')

from . import michi
from . import pinecone
from . import embeddings
from . import jobs
