from marshmallow import Schema, fields, post_load
from .skill import SkillSchema
from app.model.job_request import JobRequest

class JobRequestSchema(Schema):
    qualifications = fields.Str(required=True)
    salary_range = fields.Str(required=True)
    preference = fields.Str(required=True)
    skills = fields.List(fields.Nested(SkillSchema), required=True)

    @post_load
    def make_job_request(self, data, **kwargs):
        return JobRequest(**data)


