import unittest
import pandas
import json
from app.schema.job import JobSchema
from marshmallow.exceptions import ValidationError
from app.migration.job_descriptions import load_data as load_job_descriptions, parse_data_for_embedding

class TestJobSchema(unittest.TestCase):
    def test_job_schema(self):
        job_data = {
            "name": "Frontend Developer",
            "role": "UI Developer",
            "experience": "3 to 5 years",
            "salary_range": "$50,000 - $70,000",
            "description": "Creating beautiful UI",
            "skills":[
                {
                    "name": "React",
                },
                {
                    "name": "Javascript",
                }
            ]
        }

        job_schema = JobSchema()
        job = job_schema.load(job_data)
        self.assertEqual(job.name, "Frontend Developer")
        self.assertEqual(job.role, "UI Developer")
        self.assertEqual(job.experience, "3 to 5 years")
        self.assertEqual(job.salary_range, "$50,000 - $70,000")
        self.assertEqual(job.description, "Creating beautiful UI")
        self.assertEqual(len(job.skills), 2)
        self.assertEqual(job.skills[0].name, "React")
        self.assertEqual(job.skills[1].name, "Javascript")
        
        job_json = job_schema.dump(job)
        self.assertEqual(job_json, job_data)

    def test_job_schema_load_invalid_data(self):
        input_data = {
            "name": "Software Developer",
            "description": "",
            "skills": [ 
                {
                    "name": "Python"
                },  
                {
                    "name": "JavaScript"
                }
            ]
        }

        job_schema = JobSchema()

        with self.assertRaises(ValidationError):
            job_schema.load(input_data)
    
    
    def test_load_job(self):
        df = load_job_descriptions(max=1)

        embedding_data = parse_data_for_embedding(df)
        job = embedding_data[0]
        self.assertEqual(job.name, df['job_title'][0])
        self.assertEqual(job.role, df['role'][0])
        self.assertEqual(job.experience, df['experience'][0])
        self.assertEqual(job.salary_range, df['salary_range'][0])
        self.assertEqual(job.description, df['job_description'][0])

if __name__ == "__main__":
    unittest.main()
