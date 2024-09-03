import unittest
import pandas
from app.schema.job_request import JobRequestSchema
from marshmallow.exceptions import ValidationError
from app.service.embedding_service import generate_job_request_prompt

class TestEmbedding(unittest.TestCase):
    def test_job_request_embedding(self):
        input_data = {
            "qualifications": "M.Tech",
            "salary_range": "$30k",
            "preference": "i like designing and creating websites",
            "skills":[
                {
                    "name": "Javascript",
                },
                {
                    "name": "Typescript",
                },
                {
                    "name": "React",
                }
            ]
        }
        
        job_request_schema = JobRequestSchema()
        job_request = job_request_schema.load(input_data)

        prompt = generate_job_request_prompt(job_request)
        expected_result = "Qualifications: M.Tech.Salary range: $30k. Preference: i like designing and creating websites. Skills i have: Javascript, Typescript, React."

        self.assertEqual(len(job_request.skills), len(input_data['skills']))
        self.assertEqual(prompt, expected_result)
        
if __name__ == "__main__":
    unittest.main()
