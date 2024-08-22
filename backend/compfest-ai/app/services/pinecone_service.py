from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
from flask import current_app, jsonify, Blueprint, request
from enum import Enum

class ManageIndexEnum(Enum):
    CREATE = "create"
    DELETE = "delete"

def initialize_pinecone():
    return Pinecone(
        api_key=current_app.config['PINECONE_API_KEY']
    )

def manage_index(mode: str):
    pc = initialize_pinecone()
    
    if mode == ManageIndexEnum.CREATE.value:
        index_name = current_app.config['PINECONE_INDEX_NAME']
        if not index_name:
            return "Index name not provided", 400
        if index_name in pc.list_indexes().names():
            return "Index already exists", 400

        pc.create_index(
            name=index_name,
            dimension=current_app.config['PINECONE_DIMENSIONS'],
            metric=current_app.config['PINECONE_SIMILARITY_METRIC'],
            spec=ServerlessSpec(
                cloud=current_app.config['PINECONE_CLOUD_PROVIDER'],
                region=current_app.config['PINECONE_REGION']
            )
        )
        return "Index created successfully", 201

    elif mode == ManageIndexEnum.DELETE.value:
        index_name = current_app.config['PINECONE_INDEX_NAME']
        if not index_name:
            return "Index name not provided", 400
        if index_name not in pc.list_indexes().names:
            return "Index does not exist", 400

        pc.delete_index(index_name)
        return "Index deleted successfully", 200

    else:
        return "Invalid action", 400
