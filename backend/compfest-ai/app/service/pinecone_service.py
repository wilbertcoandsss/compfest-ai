from pinecone import ServerlessSpec
from flask import current_app as app, jsonify, Blueprint, request
from typing import List, Tuple
from enum import Enum
import uuid
from . import pc

class ManageIndexEnum(Enum):
    CREATE = "create"
    DELETE = "delete"


def manage_index(mode: ManageIndexEnum):
    """
    managing pinecone indexes, currently only using freakynus.
    ensure this shit exists
    """

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


def upsert_data(
    metadata: List[dict],
    vector: List[List[float]], 
    namespace: str,
    index_name: str = None,
    id: str = None
):
    if index_name is None:
        index_name = app.config["PINECONE_INDEX_NAME"]     

    if id is None:
        id = str(uuid.uuid4())

    upsert_data = [
        {
            "id": id,
            "values": vector,
            "metadata": metadata
        }
    ]

    index = pc.Index(index_name)
    index.upsert(
        namespace=namespace,
        vectors=upsert_data
    )

    return "Data successfully upserted", 200


def batch_upload(
    vectors: List[List[float]], 
    namespace: str,
    index_name: str = None, 
    metadata: List[dict] = None
):
    """
    Uploads a batch of vectors to the specified Pinecone index.

    Args:
        vectors (List[List[float]]): The list of vectors to upload.
        index_name (str): The name of the Pinecone index to upsert data into.
        metadata (List[dict], optional): List of metadata dictionaries corresponding to each vector.
    """
    if index_name is None:
        index_name = app.config["PINECONE_INDEX_NAME"] 

    index = pc.Index(index_name)

    upsert_data = []
    for i, vector in enumerate(vectors):
        id = str(uuid.uuid4())
        vector_data = {
            "id": id,
            "values": vector,
            "metadata": metadata[i] if metadata else {}
        }
        upsert_data.append(vector_data)

    index.upsert(
        namespace=namespace,
        vectors=upsert_data,
    )

    return "Data successfully upserted", 200


def query(
    namespace: str,
    vector: List[List[float]],
    index_name: str = None,
):
    if index_name is None:
        index_name = app.config["PINECONE_INDEX_NAME"] 

    index = pc.Index(index_name)

    res = index.query(
            vector=vector,
            namespace=namespace,
            top_k=app.config["PINECONE_TOP_K"],
            include_values=app.config["PINECONE_INCLUDE_VALUES"],
            include_metadata=app.config["PINECONE_INCLUDE_METADATA"] 
        )
    return res.matches, 200


def queryById(
    namespace: str,
    id: str,
    index_name: str = None,
):
    if index_name is None:
        index_name = app.config["PINECONE_INDEX_NAME"] 

    index = pc.Index(index_name)

    res = index.query(
            id=id,
            namespace=namespace,
            top_k=1,
            include_values=app.config["PINECONE_INCLUDE_VALUES"],
            include_metadata=app.config["PINECONE_INCLUDE_METADATA"] 
        )
    return res.matches, 200

