from . import openai
from typing import List

def tokenize_and_infer_skills(skill: str):

    """
    This is to convert and tokenize skills from the dataset into
    a meaningful list of skills that can be used for the frontend instead of long strings
    """ 
    completion = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": (
                    f"Given the following skills: \"{skill}\", "
                    "please tokenize them into distinct skills separated by a '#' symbol without space seperation. "
                    "Additionally, infer other related and relevant skills that would be valuable in a professional job application context, such as for a LinkedIn profile. "
                    "For example, if the input is 'Cloud systems engineering Cloud infrastructure (e.g., AWS, Azure) DevOps practices Automation Security in the cloud Disaster recovery Scalability', "
                    "the output should include both the provided skills and inferred related skills, formatted as 'Cloud systems engineering#Cloud infrastructure (e.g., AWS, Azure)#DevOps practices#Automation#Security in the cloud#Disaster recovery#Scalability#Continuous Integration#Kubernetes#Monitoring and Logging#Cost Optimization#Infrastructure as Code (IaC)'."
                )
            }
        ]
    )
    
    return completion.choices[0].message.content

def parse_skills(skills: str) -> List[str]:
    skills_list = [skill.strip() for skill in skills.split('#') if skill.strip()]
    return skills_list 
