import unittest
from app.schema.job import JobSchema
from app.schema.skill import SkillSchema

class TestJobSchema(unittest.TestCase):
    def test_job_schema(self):
        job_data = {
            "name": "Frontend Developer",
            "description": "Creating beautiful UI",
            "salary": 15000000,
            "skills":[
                {
                    "name": "React",
                    "experience": 3,
                    "department": "Web Development"
                },
                {
                    "name": "Javascript",
                    "experience": 5,
                    "department": "Web Development"
                }
            ]
        }


        job_schema = JobSchema()
        job = job_schema.load(job_data)
        self.assertEqual(job.name, "Frontend Developer")
        self.assertEqual(job.description, "Creating beautiful UI")
        self.assertEqual(job.salary, 15000000)
        self.assertEqual(len(job.skills), 2)
        self.assertEqual(job.skills[0].name, "React")
        self.assertEqual(job.skills[1].name, "Javascript")
        
        job_json = job_schema.dump(job)
        self.assertEqual(job_json, job_data)

        print(job_json)

if __name__ == "__main__":
    unittest.main()
