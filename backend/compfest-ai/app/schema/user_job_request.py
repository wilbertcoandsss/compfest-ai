from marshmallow import Schema, fields, post_load
from .skill import SkillSchema
from app.model.user_job_request import UserJobRequest

class UserJobRequestSchema(Schema):
    name = fields.Str(required=True)
    purpose = fields.Str(required=True)
    credentials = fields.Str(required=True)
    graduate_level = fields.Str(required=True)
    preference = fields.Str(required=True)
    qualifications = fields.Str(allow_none=True)  # Allows null if not provided
    skills = fields.List(fields.Nested(SkillSchema), required=True) 

    @post_load
    def make_user_job_request(self, data, **kwargs):
        return UserJobRequest(**data)
