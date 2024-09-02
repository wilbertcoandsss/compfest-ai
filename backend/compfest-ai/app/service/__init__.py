from pinecone.grpc import PineconeGRPC as Pinecone
from openai import OpenAI
import os

def pinecone_init():
    return Pinecone(
        api_key=os.getenv('PINECONE_API_KEY')
    )
def openai_init():
   return OpenAI(
        api_key=os.getenv("OPENAI_API_KEY")
    ) 
# make sure index is available
pc = pinecone_init()
openai = openai_init()


