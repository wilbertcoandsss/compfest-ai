from app import create_app
from flask import current_app as app

app = create_app()

port = app.config['PORT']

if __name__ == '__main__':
    app.run(port = port)

