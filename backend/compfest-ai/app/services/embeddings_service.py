from app.model.roberta_model import Roberta
from flask import current_app

embedder = Roberta()

def get_embeddings(input:str):
    result = embedder.generate_embeddings(input) 
    return result
