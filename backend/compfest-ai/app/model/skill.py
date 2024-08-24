class Skill:
    def __init__(self, name, experience, department):
        self.name = name
        self.experience = experience
        self.department = department

    def __str__(self):
        return f"""\
            name = {self.name},
            experience = {self.experience},
            department = {self.department}
        """
