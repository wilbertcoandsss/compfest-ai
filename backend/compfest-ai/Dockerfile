FROM python:3.11.4

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 3000

ENV FLASK_APP=run.py

ENTRYPOINT ["bash", "entrypoint.sh"]
