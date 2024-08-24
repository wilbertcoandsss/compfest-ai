from pinecone import ServerlessSpec
from flask import current_app as app, jsonify, Blueprint, request
from enum import Enum
import uuid
from . import embeddings_service
from . import pc

class ManageIndexEnum(Enum):
    CREATE = "create"
    DELETE = "delete"


"""
managing pinecone indexes, currently only using freakynus.
ensure this shit exists
"""
def manage_index(mode: ManageIndexEnum):
    if mode == ManageIndexEnum.CREATE.value:
        index_name = app.config['PINECONE_INDEX_NAME']
        if not index_name:
            return "Index name not provided", 400
        if index_name in pc.list_indexes().names():
            return "Index already exists", 400

        pc.create_index(
            name=index_name,
            dimension=app.config['PINECONE_DIMENSIONS'],
            metric=app.config['PINECONE_SIMILARITY_METRICS'],
            spec=ServerlessSpec(
                cloud=app.config['PINECONE_CLOUD_PROVIDER'],
                region=app.config['PINECONE_REGION']
            ),
            deletion_protection=app.config['PINECONE_DELETION_PROTECTION']
        )
        return "Index created successfully", 201

    elif mode == ManageIndexEnum.DELETE.value:
        index_name = app.config['PINECONE_INDEX_NAME']
        if not index_name:
            return "Index name not provided", 400
        if index_name not in pc.list_indexes().names():
            return "Index does not exist", 400

        pc.delete_index(index_name)
        return "Index deleted successfully", 200

    else:
        return "Invalid action", 400


"""
def embed_and_upload_text(input: str, word: str, index_name: str):
    if index_name != app.config['PINECONE_INDEX_NAME']:
        return "Index name invalid", 400
    
    embeddings = embeddings_service.generate_embeddings(input, word)

    embedding_vector = embeddings.cpu().numpy().tolist()
    
    upsert_data = [(f"{input}-{word}", embedding_vector, {"text": input, "word": word})]
    index = pc.Index(index_name)
    index.upsert(vectors=upsert_data)

    return "Embedding successfully uploaded", 200
"""

def embed_and_upload_text(input: str, index_name: str, method="cls"):
    if index_name != app.config['PINECONE_INDEX_NAME']:
        return "Index name invalid", 400
    
    embeddings = embeddings_service.generate_embeddings(input, method)

    embedding_vector = embeddings.cpu().numpy().tolist()
    
    id = str(uuid.uuid4())
    upsert_data = [
        {
            "id": id,
            "values": embedding_vector,
            "metadata": {
                "input": input
            }
        }
    ]
    index = pc.Index(index_name)
    index.upsert(vectors=upsert_data)

    return "Embedding successfully uploaded", 200
