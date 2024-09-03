from app.embedder.roberta_model import Roberta
from app.model.job import Job
from app.model.job_request import JobRequest
from app.model.user_job_request import UserJobRequest
from app.utils.helper import deprecated

embedder = Roberta()

def generate_embedding(
        input: str, 
        method:str = 'cls'
):
    result = embedder.generate_embedding(input, method) 
    return result

def generate_job_knowledge_base_prompt(job: dict) -> str:
    """
    Prompt for nlp to process the attributes
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


def generate_job_request_prompt(job_request: JobRequest) -> str:
    """
    Creates a prompt for the JobRequest model
    which is used for /job/v1/reccomendations
    """
    skills = ', '.join([str(skill.name) for skill in job_request.skills])
    prompt = (
        f"Qualifications: {job_request.qualifications}."
        f"Salary range: {job_request.salary_range}. "
        f"Preference: {job_request.preference}. "
        f"Skills i have: {skills}."
    )
    return prompt

def generate_user_job_request_prompt(user_job_request: UserJobRequest) -> str:
    """
    Creates a prompt for the UserJobRequest model
    which is used for /job/v2/recommendations.
    
    The prompt includes the user's name, purpose, graduate level,
    qualifications, preference, and skills.
    """
    skills = ', '.join([str(skill.name) for skill in user_job_request.skills])
    
    prompt = (
        f"I am a {user_job_request.graduate_level} graduate. "
        f"My purpose is to {user_job_request.purpose}. "
        f"Qualifications {user_job_request.qualifications}. "
        f"Preference: {user_job_request.preference}. "
        f"Skills I have: {skills}."
    )
    
    return prompt


@deprecated
def generate_job_prompt(job: Job):
    return f"""\
        I work as a {job.name}, which is tasked to {job.description}
    """
