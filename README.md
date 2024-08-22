# Cheatsheet

```
docker build . --tag [image-name]
docker run -d --name [container-name] -p 3001:3000 [image-name]


-- REMOVE
docker stop [container-name]
docker rm [container-name]
docker rmi [image-name]
```

# Quickstart

## Development
**Frontend**
```
cd frontend/compfest-ai/
npm i
npm run dev
```
**Backend**
```
cd backend/compfest-ai/
pip install -r requirements.txt
python preload.py
python run.py
```

## Deployment
**Ensure you have docker installed**

**Frontend**
```
cd frontend/compfest-ai/
docker build . --tag compfest-ai-fe-next
docker run -d --name compfest-ai-fe -p 3001:3000 compfest-ai-fe-next
```
**Backend**
```
cd backend/compfest-ai/
docker build . --tag compfest-ai-be-flask
docker run -d --name compfest-ai-be -p 3002:3000 compfest-ai-be-flask
```

```
curl http://localhost:3002/michi/
```

**Output:**

```
{
    "response":"i love michi"
}
```

### Development

**Frontend**: http://localhost:3000/
<br/>
**Backend**: http://localhost:5000/

### Production

**Frontend**: http://localhost:3001/
<br/>
**Backend**: http://localhost:3002/
