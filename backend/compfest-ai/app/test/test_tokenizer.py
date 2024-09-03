import unittest
from marshmallow.exceptions import ValidationError
from app.schema.untokenized_skill import UntokenizedSkillSchema
from app.schema.list_string import ListStringSchema
from app.service.tokenizer_service import tokenize_and_infer_skills, parse_skills

class TestTokenizer(unittest.TestCase):
    def test_tokenize_skill(self):
        input_data = {
            "name": "Cloud systems engineering Cloud infrastructure (e.g., AWS, Azure) DevOps practices Automation Security in the cloud Disaster recovery Scalability"
        }
        
        untokenized_skill_schema = UntokenizedSkillSchema()
        untokenized_skill = untokenized_skill_schema.load(input_data)["name"]
        
        tokenized_skill = tokenize_and_infer_skills(untokenized_skill)
        
        # This pattern checks if the output is a list of skills separated by '#'
        pattern = r"^([\w\s\(\),\-\.\/:]+#)*[\w\s\(\),\-\.\/:]+#?$"

        self.assertRegex(tokenized_skill, pattern, "The tokenized skills output is not in the expected format.")
        
    def test_parse_tokenized_skills(self):
        input_data = "Mobile app development languages (e.g., Java, Swift, Kotlin)#Cross-platform development (e.g., React Native, Flutter)#Mobile app design principles#APIs and web services integration#Debugging and troubleshooting#UI/UX Design#Data Structures and Algorithms#Software Testing and Quality Assurance#Version Control System (e.g., Git)#Backend Development (e.g., Node.js, Django)#Database Management (e.g., SQLite, MongoDB)#Agile/Scrum methodologies#Project Management#Continuous Integration/Continuous Delivery (CI/CD)#Problem Solving Skills#Knowledge of Protocol Buffers (protobuf)"

        parsed_skills = parse_skills(input_data)
    
        list_skills_schema = ListStringSchema()
        skills = list_skills_schema.load({
            "skills": parsed_skills
        })

        # Regex pattern to match a valid skills string without '#'
        pattern = r'^[\w\s\(\),\-\.\/:]+$'
        for skill in skills:
            self.assertRegex(skill, pattern, "Parsed skill output is not in the expected format")



        
if __name__ == "__main__":
    unittest.main()
