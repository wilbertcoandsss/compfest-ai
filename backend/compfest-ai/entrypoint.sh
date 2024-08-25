#!/usr/bin/env bash

set -e

# COMMENT IN PROD
echo "Activating venv"
source venv/bin/activate

echo "Exporting app.py to env"
export FLASK_APP=${FLASK_APP:-./run.py}

ENV=${FLASK_ENV:-development} 

if [ ! -d "preloaded_model/" ]; then
  echo "Preloading model..."
  flask go preload
else
  echo "Preloaded model exists, skipping preloading model..."
fi


# IMPORTANT: COMMENT OUT IN PROD
flask go test


# AirTunes is using my 5000
if [ "$ENV" == "development" ]; then
    echo "Starting Flask server in development mode..."
    flask run --host=localhost --port=6969 #5000
else
    echo "Starting Flask server in production mode..."
    flask run --host=0.0.0.0 --port=3001
fi
