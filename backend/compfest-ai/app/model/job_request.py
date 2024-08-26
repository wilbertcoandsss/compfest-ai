from .skill import Skill

class JobRequest:
    def __init__(self, qualifications, salary_range, preference, skills):
        self.qualifications = qualifications
        self.salary_range = salary_range
        self.preference = preference
        self.skills = skills

    def __str__(self):
        return f"""\
            qualifications = {self.qualifications},
            salary_range = {self.salary_range},
            preference = {self.preference},
            skills = {self.skills}
        """
