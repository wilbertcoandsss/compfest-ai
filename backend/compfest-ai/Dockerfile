# syntax=docker/dockerfile:1

# Use the Python 3.11.4 base image
FROM python:3.11.4

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app directory into the container
COPY . .

# Expose port 3000 from the container
EXPOSE 3000

# Set the FLASK_APP environment variable to point to your entry point
ENV FLASK_APP=run.py

# Set the command to run the Flask application on port 3000
CMD ["flask", "run", "--host=0.0.0.0", "--port=3000"]
