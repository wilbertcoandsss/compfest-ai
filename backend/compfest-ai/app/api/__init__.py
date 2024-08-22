from flask import Blueprint

michi_blueprint = Blueprint('michi', __name__, url_prefix='/michi')
pinecone_blueprint = Blueprint('pinecone', __name__, url_prefix='/pinecone')

from . import michi
from . import pinecone
