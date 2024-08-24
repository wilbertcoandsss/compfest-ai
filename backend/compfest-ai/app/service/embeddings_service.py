from app.embedder.roberta_model import Roberta
from app.model.job import Job

embedder = Roberta()

def generate_embeddings(input: str):
    result = embedder.generate_embeddings(input) 
    return result

def generate_job_knowledge_base_prompt(job: dict) -> str:
    """
    awikwok
    """
    prompt = (
        f"Job Title: {job['name']}. "
        f"Role: {job['role']}. "
        f"Salary Range: {job['salary_range']}. "
        f"Job Description: {job['description']}. "
        f"Experience required: {job['experience']}. "
        f"Skills needed: {job['skills']}. "
    )
    return prompt

def generate_job_prompt(job: Job):
    return f"""\
        I work as a {job.name}, which is tasked to {job.description}
    """
