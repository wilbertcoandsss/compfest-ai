from marshmallow import Schema, fields, post_load
from app.model.job import Job
from .skill import SkillSchema

class UntokenizedSkillSchema(Schema):
    name = fields.Str(required=True)

    @post_load
    def make_job(self, data, **kwargs):
        return data

