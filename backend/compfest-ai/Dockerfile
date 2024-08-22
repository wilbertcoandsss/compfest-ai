FROM python:3.11.4

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python preload.py

EXPOSE 3000

ENV FLASK_APP=run.py

CMD ["flask", "run", "--host=0.0.0.0", "--port=3000"]
