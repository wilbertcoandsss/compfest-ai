from .skill import Skill

class Job:
    def __init__(self, name, role, experience, salary_range, description, skills):
        self.name = name
        self.role = role
        self.experience = experience
        self.salary_range = salary_range
        self.description = description
        self.skills = skills

    def __str__(self):
        return f"""\
            name = {self.name},
            role = {self.role},
            experience = {self.experience},
            salary_range = {self.salary_range},
            description = {self.description},
            skills = {self.skills}
        """
