#!/usr/bin/env bash

set -e

if [ -f ".env" ]; then
  echo "Loading .env file..."
  export $(cat .env | xargs)
fi

if [ ! -f "venv/bin/activate" ]; then
  echo "Virtual environment not found! Exiting..."
  exit 1
fi

echo "Activating virtual environment..."
source venv/bin/activate

# export FLASK_APP=${FLASK_APP:-./run.py}
# export FLASK_ENV=${FLASK_ENV:-development}

echo "Running in environment: $FLASK_ENV"

if [ ! -d "preloaded_model/" ]; then
  echo "Preloading model..."
  flask go preload
else
  echo "Preloaded model exists, skipping preloading model..."
fi

if [ "$FLASK_ENV" == "development" ]; then
  echo "Running tests (development mode)..."
  flask go test
fi

if [ "$FLASK_ENV" == "development" ]; then
  echo "Starting Flask server in development mode on localhost:6969..."
  flask run --host=localhost --port=6969
else
  echo "Starting Flask server in production mode on 0.0.0.0:3001..."
  flask run --host=0.0.0.0 --port=3001
fi
