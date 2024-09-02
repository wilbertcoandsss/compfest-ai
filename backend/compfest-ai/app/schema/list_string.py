from marshmallow import fields, Schema, validate

class ListStringSchema(Schema):        
    skills = fields.List(fields.String(), required=True, validate=validate.Length(min=1))
