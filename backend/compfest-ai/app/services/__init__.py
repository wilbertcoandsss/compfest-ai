from pinecone.grpc import PineconeGRPC as Pinecone
import os

def pinecone_init():
    return Pinecone(
        api_key=os.getenv('PINECONE_API_KEY')
    )

# make sure index is available
pc = pinecone_init()


