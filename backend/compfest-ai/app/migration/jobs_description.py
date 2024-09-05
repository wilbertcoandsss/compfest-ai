import os
import pandas as pd
from app.model.job import Job
from app.model.skill import Skill
from app.schema.job import JobSchema
from app.schema.skill import SkillSchema
from app.service import embedding_service, pinecone_service, tokenizer_service
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
    "qualifications",
]

CSV_TO_MODEL_MAPPING = {
    "job_title": "name",
    "role": "role",
    "experience": "experience",
    "salary_range": "salary_range",
    "skills": "skills",
    "job_description": "description",
    "qualifications": "qualifications",
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
    job_data = df[DATA_FOR_EMBEDDING].copy()
    data_len = job_data.shape[0]
    jobs: List[dict] = []

    for idx, row in job_data.iterrows():
        skills_str = row.get('skills', '')
        print(f"Embedding {idx}/{data_len}")
        job_data.loc[idx, 'skills'] = tokenizer_service.tokenize_and_infer_skills(skills_str)

        jobs.append({
            CSV_TO_MODEL_MAPPING[col]: row[col] for col in job_data.columns
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
        prompt = embedding_service.generate_job_knowledge_base_prompt(job)
        vector = embedding_service.generate_embedding(prompt)

        combined_data.append((prompt, vector, job))
        embed += 1

    df_logs = pd.DataFrame(combined_data, columns=['Prompt', 'Vector', 'Metadata'])

    df_logs.to_csv('./app/migration/migration_cache.csv', index=False)
    print("Logs saved to app/migration/migration_cache.csv")

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

