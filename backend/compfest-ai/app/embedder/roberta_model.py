from transformers import AutoTokenizer, AutoModel
import torch
import os
import numpy as np

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
                cls._instance.model = AutoModel.from_pretrained(path, output_hidden_states=True)
            else:
                cls._instance.tokenizer = AutoTokenizer.from_pretrained(model_dir)
                cls._instance.model = AutoModel.from_pretrained(model_dir, output_hidden_states=True)

            cls._instance.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            cls._instance.model.to(cls._instance.device)

        return cls._instance


    """
    https://stackoverflow.com/questions/60824589/how-can-i-get-roberta-word-embeddings
    God bless...
    """
    def generate_embedding(self, text, method="cls"):
        inputs = self.tokenizer(text, return_tensors='pt', truncation=True, padding=True).to(self.device)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            hidden_states = outputs.hidden_states
        
        if method == "cls":
            # Use the [CLS] token's embedding as the representation of the entire sentence
            cls_embedding = hidden_states[-1][:, 0, :]
            res = cls_embedding.squeeze()
            return res 
        elif method == "mean":
            # Mean pooling of the last layer hidden states (excluding padding tokens)
            attention_mask = inputs['attention_mask'].unsqueeze(-1).expand(hidden_states[-1].size()).float()
            sum_hidden_states = torch.sum(hidden_states[-1] * attention_mask, dim=1)
            mean_hidden_states = sum_hidden_states / torch.clamp(attention_mask.sum(dim=1), min=1e-9)
            return mean_hidden_states.squeeze()

        else:
            raise ValueError("Unsupported method for embedding generation")
