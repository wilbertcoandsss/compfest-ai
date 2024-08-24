from .skill import Skill

class Job:
    def __init__(self, name, description, salary, skills):
        self.name = name
        self.description = description
        self.salary = salary
        self.skills = skills

    def __str__(self):
        return f"""
            name = {self.name},
            description = {self.description},
            salary = {self.salary},
            skills = {self.skills}
        """
