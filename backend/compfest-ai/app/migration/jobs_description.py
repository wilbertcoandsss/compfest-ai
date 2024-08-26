import os
import pandas as pd
from app.model.job import Job
from app.model.skill import Skill
from app.schema.job import JobSchema
from app.schema.skill import SkillSchema
from app.service import embeddings_service, pinecone_service
from marshmallow.exceptions import ValidationError
from flask import current_app as app
from typing import List, Tuple
from app.utils.helper import chunks

DATA_FOR_EMBEDDING = [
    "job_title",
    "role",
    "experience",
    "salary_range",
    "job_description",
    "skills",
    "qualifications"
]

CSV_TO_MODEL_MAPPING = {
    "job_title": "name",
    "role": "role",
    "experience": "experience",
    "qualifications": "qualifications",
    "salary_range": "salary_range",
    "job_description": "description",
    "skills": "skills",
    "responsibitilies": "responsibitilies"
}

def parse_data_for_embedding_v1(df) -> List[Job]:
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

def parse_data_for_embedding_v2(df) -> List[dict]:
    """
    awikwok
    """
    prepared_df = df[DATA_FOR_EMBEDDING]
    jobs: List[str] = []

    for row in prepared_df.itertuples(index=False):
        jobs.append({
            CSV_TO_MODEL_MAPPING[col]: getattr(row, col) for col in prepared_df.columns
        })
        
    return jobs


def load_data(debug=False, max=10000):
    df = pd.read_csv('./seeder/jobs_description.csv', on_bad_lines='skip', nrows=max)

    if debug:
        print(f'Number of rows :', {df.shape[0]})
        print(f'Info: {df.info()}')

    return df


def run():
    df = load_data()
    jobs = parse_data_for_embedding_v2(df)
    amount = len(jobs)
    embed = 0
    batch_size = 200
    vector_dim = app.config['PINECONE_DIMENSIONS']
    namespace = 'jobs_description'

    combined_data: List[Tuple[str, List[float], dict]] = []

    for job in jobs:
        print(f'Embedding: {embed}/{amount}')
        prompt = embeddings_service.generate_job_knowledge_base_prompt(job)
        vector = embeddings_service.generate_embeddings(prompt)
        
        """
        Ini dulu pake job schema, gausah lah itu buat kalo mau CRUD aja
        dataset udh di cleanup
        # meta = helper.flatten_metadata(job_schema.dump(job))
        # print(meta)

        """
        combined_data.append((prompt, vector, job))
        embed+=1

    print("Upserting chunks into database...")
    print(f'Using {namespace}')
    for chunk in chunks(combined_data, batch_size):
        prompt_chunk, vector_chunk, metadata_chunk = zip(*chunk)

        pinecone_service.batch_upload(
            vector_chunk, 
            namespace=namespace,
            metadata=metadata_chunk
        )

    print("Data upserted successfully.")
