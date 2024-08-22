import os
from app import create_app
from dotenv import load_dotenv

env = os.getenv('FLASK_ENV', 'development')
dotenv_path = f'.env.{env}'

load_dotenv(dotenv_path)

from app.config import DevelopmentConfig, ProductionConfig, Config

config_mapping = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
}

AppConfig = config_mapping.get(env, Config)

port = AppConfig.PORT

app = create_app(AppConfig)

if __name__ == '__main__':
    app.run(port = port)
