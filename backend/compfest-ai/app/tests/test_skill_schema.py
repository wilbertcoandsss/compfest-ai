import unittest
from app.schema.skill import SkillSchema

class TestSkillSchema(unittest.TestCase):
    def test_skill_schema(self):
        skill_data = {
            "name": "Software Architecture",
            "experience": 4,
            "department": "Software Engineering"
        }

        skill_schema = SkillSchema()

        skill = skill_schema.load(skill_data)
        self.assertEqual(skill.name, "Software Architecture")
        self.assertEqual(skill.experience, 4)
        self.assertEqual(skill.department, "Software Engineering")

        skill_json = skill_schema.dump(skill)
        self.assertEqual(skill_json, skill_data)

        print(skill_json)

if __name__ == "__main__":
    unittest.main()
