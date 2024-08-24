from app.embedder.roberta_model import Roberta

embedder = Roberta()

def generate_embeddings(input:str, word:str):
    result = embedder.generate_embeddings(input, word) 
    return result
