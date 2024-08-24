import os
from flask import Blueprint
from transformers import AutoModel, AutoTokenizer
import unittest
from .config import Config

cli_bp = Blueprint("go", __name__)

@cli_bp.cli.command("test")
def test():
    test_loader = unittest.TestLoader()
    tests = test_loader.discover(start_dir='app/test', pattern='test*.py')

    runnable =  unittest.TextTestRunner(verbosity=2)
    runnable.run(tests)

@cli_bp.cli.command("preload")
def preload_model_and_tokenizer():
    path = os.path.join(Config.PRELOADED_DIR, Config.MODEL_TYPE)
    os.makedirs(path, exist_ok=True)

    tokenizer = AutoTokenizer.from_pretrained(Config.MODEL_TYPE)
    model = AutoModel.from_pretrained(Config.MODEL_TYPE)

    tokenizer.save_pretrained(path)
    model.save_pretrained(path)
