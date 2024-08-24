from app.embedder.roberta_model import Roberta
from app.model.job import Job

embedder = Roberta()

def generate_embeddings(input: str, word: str):
    result = embedder.generate_embeddings(input, word) 
    return result


def generate_job_knowledge_base_prompt(
    experience
):

def generate_job_prompt(job: Job):
    return f"""\
        I work as a {job.name}, which is tasked to {job.description}
    """
