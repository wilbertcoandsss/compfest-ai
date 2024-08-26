from app.embedder.roberta_model import Roberta
from app.model.job import Job
from app.model.job_request import JobRequest

embedder = Roberta()

def generate_embeddings(input: str, method:str = 'cls'):
    result = embedder.generate_embeddings(input, method) 
    return result

def generate_job_knowledge_base_prompt(job: dict) -> str:
    """
    awikwok
    """
    prompt = (
        f"Job Title: {job['name']}. "
        f"Role: {job['role']}. "
        f"Salary Range: {job['salary_range']}. "
        f"Qualifications: {job['qualifications']}. "
        f"Job Description: {job['description']}. "
        f"Experience required: {job['experience']}. "
        f"Skills needed: {job['skills']}."
    )
    return prompt


def generate_job_request_prompt(job: JobRequest) -> str:
    skills = ', '.join([str(skill.name) for skill in job.skills])
    prompt = (
        f"Qualifications: {job.qualifications}."
        f"Salary range: {job.salary_range}. "
        f"Preference: {job.preference}. "
        f"Skills i have: {skills}."
    )
    return prompt

def generate_job_prompt(job: Job):
    return f"""\
        I work as a {job.name}, which is tasked to {job.description}
    """
