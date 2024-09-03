from .skill import Skill

class UserJobRequest:

    """
    name: namanya siapa
    purpose: ini ada dua pilihan, either dia cari findJob atau findSkill
    credentials: uniqueness dia apa kek id unique
    preference: ini kek short desc tentang dia
    graduateLevel: ini kek highschool, undergraduate, etc
    qualif: kalo highschool dia null, tapi kalo undergraduate nanti ada MBA, BCA, etc yg bisa dicocokin sama data lu nanti
    skills: ini skills apa aja yg dia puny, isinya array of skills
    """

    def __init__(self, name, purpose, credentials, graduate_level, preference, qualifications, skills):
        #Based on user
        self.name = name
        self.purpose = purpose
        self.credentials = credentials
        self.graduate_level = graduate_level 


        # Based on data
        self.preference = preference
        self.qualifications = qualifications
        self.skills = skills

        
    def __str__(self):
        return f"""\
            
            name = {self.name},
            purpose = {self.purpose},
            credentials = {self.credentials},
            preference = {self.preference},
            qualifications = {self.qualifications},
            skills = {self.skills},
            graduate_level = {self.graduate_level}
        """
