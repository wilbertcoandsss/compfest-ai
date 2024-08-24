from marshmallow import Schema, fields, post_load
from app.model.job import Job
from .skill import SkillSchema

class JobSchema(Schema):
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    salary = fields.Float(required=True)
    skills = fields.List(fields.Nested(SkillSchema), required=True)

    @post_load
    def make_job(self, data, **kwargs):
        return Job(**data)

