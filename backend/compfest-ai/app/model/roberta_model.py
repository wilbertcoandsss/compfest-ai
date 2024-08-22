from transformers import AutoTokenizer, AutoModel
import os

MODEL_TYPE = "cardiffnlp/twitter-roberta-base"
PRELOADED_DIR = f"./preloaded_model"

class Roberta:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(Roberta, cls).__new__(cls)
            model_dir = kwargs.get('model_type', MODEL_TYPE)

            path = os.path.join(PRELOADED_DIR, MODEL_TYPE)

            if os.path.exists(path):
                cls._instance.tokenizer = AutoTokenizer.from_pretrained(path)
                cls._instance.model = AutoModel.from_pretrained(path)
            else:
                cls._instance.tokenizer = AutoTokenizer.from_pretrained(model_dir)
                cls._instance.model = AutoModel.from_pretrained(model_dir)

        return cls._instance

    def generate_embeddings(self, text):
        inputs = self.tokenizer(text, return_tensors='pt', truncation=True, padding=True)
        outputs = self.model(**inputs)
        return outputs.last_hidden_state
