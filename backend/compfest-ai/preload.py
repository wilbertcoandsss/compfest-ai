from transformers import AutoModel, AutoTokenizer
import os

MODEL_TYPE = "cardiffnlp/twitter-roberta-base"
PRELOADED_DIR = f"./preloaded_model"

def preload_model_and_tokenizer():
    path = os.path.join(PRELOADED_DIR, MODEL_TYPE)
    os.makedirs(path, exist_ok=True)

    tokenizer = AutoTokenizer.from_pretrained(MODEL_TYPE)
    model = AutoModel.from_pretrained(MODEL_TYPE)

    tokenizer.save_pretrained(path)
    model.save_pretrained(path)

if __name__ == "__main__":
    preload_model_and_tokenizer()
