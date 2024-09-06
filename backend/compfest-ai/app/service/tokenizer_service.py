from typing import List

def parse_skills(skills: str) -> List[str]:
    skills_list = [skill.strip() for skill in skills.split('#') if skill.strip()]
    return skills_list 
