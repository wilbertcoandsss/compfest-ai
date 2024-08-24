import os
import pandas as pd
from typing import List
from app.model.job import Job
from app.model.skill import Skill
from app.schema.job import JobSchema
from app.schema.skill import SkillSchema
from marshmallow.exceptions import ValidationError

DATA_FOR_EMBEDDING = [
    "job_title",
    "role",
    "experience",
    "salary_range",
    "job_description",
    "skills"
]

CSV_TO_MODEL_MAPPING = {
    "job_title": "name",
    "role": "role",
    "experience": "experience",
    "salary_range": "salary_range",
    "job_description": "description",
    "skills": "skills"
}

def parse_data_for_embedding(df) -> List[Job]:
    prepared_df = df[DATA_FOR_EMBEDDING]
    jobs: List[Job] = []

    job_schema = JobSchema()
    skill_schema = SkillSchema()

    for row in prepared_df.itertuples(index=False):
        job_data = {
            CSV_TO_MODEL_MAPPING[col]: getattr(row, col) for col in prepared_df.columns
        }

        skills_str = job_data.get('skills', '')

        """
        might parse for ,
        idk tho
        """
        skill_names = [skills_str] if skills_str else []

        skill_objects = [
            {"name": skill_name} for skill_name in skill_names if skill_schema.load({"name": skill_name})
        ]

        job_data['skills'] = skill_objects
        
        try:
            job = job_schema.load(job_data)
            jobs.append(job)
        except ValidationError as e:
            print(f"Error loading job data: {e}")

    return jobs


def load_data(debug=False, max=10000):
    df = pd.read_csv('./seeder/jobs_description.csv', on_bad_lines='skip', nrows=max)

    if debug:
        print(f'Number of rows :', {df.shape[0]})
        print(f'Info: {df.info()}')

    return df



