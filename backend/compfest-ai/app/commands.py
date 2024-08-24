import os
import click
from flask import Blueprint
from transformers import AutoModel, AutoTokenizer
import unittest
from .config import Config
from app.migration.jobs_description import run as run_jobs_description_migration

cli_bp = Blueprint("go", __name__)

@cli_bp.cli.command("test")
def test():
    print("Running tests...")
    test_loader = unittest.TestLoader()
    tests = test_loader.discover(start_dir='app/test', pattern='test*.py')

    runnable =  unittest.TextTestRunner(verbosity=2)
    runnable.run(tests)

@cli_bp.cli.command("preload")
def preload_model_and_tokenizer():
    print("Preloading models...")
    path = os.path.join(Config.PRELOADED_DIR, Config.MODEL_TYPE)
    os.makedirs(path, exist_ok=True)

    tokenizer = AutoTokenizer.from_pretrained(Config.MODEL_TYPE)
    model = AutoModel.from_pretrained(Config.MODEL_TYPE)

    tokenizer.save_pretrained(path)
    model.save_pretrained(path)

@cli_bp.cli.command("migrate")
@click.option('--force', is_flag=True, help='Force the migration (this action is irreversible and dangerous).')
def migrate(force):
    if not force:
        print("Error: U fr?. Use --force to confirm.")
        return
    print("Running migrations...")
    run_jobs_description_migration()

