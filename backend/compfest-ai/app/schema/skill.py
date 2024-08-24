from marshmallow import Schema, fields, post_load
from app.model.skill import Skill

class SkillSchema(Schema):
    name = fields.Str(required=True)

    @post_load
    def make_skill(self, data, **kwargs):
        return Skill(**data)
