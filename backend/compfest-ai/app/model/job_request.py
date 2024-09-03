from .skill import Skill

"""
used for job/v1/recommendations
which only takes account for job inputs

when using job/v2/recommendations
which takes account for the user preference and their requested job
use the UserJobRequest
"""
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
