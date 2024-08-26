import unittest
from app.schema.skill import SkillSchema
from marshmallow.exceptions import ValidationError

class TestSkillSchema(unittest.TestCase):
    def test_skill_schema(self):
        input_data = {
            "name": "Software Architecture",
        }

        skill_schema = SkillSchema()

        skill = skill_schema.load(input_data)
        self.assertEqual(skill.name, "Software Architecture")
        
        skill_json = skill_schema.dump(skill)
        self.assertEqual(skill_json, input_data)

    def test_skill_schema_invalid_data(self):
        invalid_skill_data = {
            "experience": 4,  
        }

        skill_schema = SkillSchema()

        with self.assertRaises(ValidationError):
            skill_schema.load(invalid_skill_data)


if __name__ == "__main__":
    unittest.main()
