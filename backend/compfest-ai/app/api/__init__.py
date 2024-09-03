from flask import Blueprint

michi_bp = Blueprint('michi', __name__, url_prefix='/michi')
pinecone_v1_bp = Blueprint('pinecone/v1', __name__, url_prefix='/pinecone/v1')
embedding_v1_bp = Blueprint('embedding/v1', __name__, url_prefix='/embedding/v1')
job_v1_bp = Blueprint('job/v1', __name__, url_prefix='/job/v1')
job_v2_bp = Blueprint('job/v2', __name__, url_prefix='/job/v2')
user_v1_bp = Blueprint('user/v1', __name__, url_prefix='/user/v1')

from . import michi
from . import pinecone
from . import embedding
from . import job_v1
from . import job_v2
from . import user
