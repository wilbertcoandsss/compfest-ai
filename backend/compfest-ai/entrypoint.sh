#!/bin/bash

set -e

ENV=${FLASK_ENV:-development} 

echo "Preloading models..."
flask go preload

# Optionally run tests
# IMPORTANT: COMMENT OUT IN PROD
echo "Running tests..."
flask go test

if [ "$ENV" == "development" ]; then
    echo "Starting Flask server in development mode..."
    flask run --host=localhost --port=5000
else
    echo "Starting Flask server in production mode..."
    flask run --host=0.0.0.0 --port=3001
fi
