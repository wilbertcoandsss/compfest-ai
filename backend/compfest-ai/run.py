import os
from app import create_app
from dotenv import load_dotenv

env_file = '.env.development' if os.getenv('FLASK_ENV') == 'development' else '.env.production'
load_dotenv(env_file)

app = create_app()

if __name__ == '__main__':
    app.run()
