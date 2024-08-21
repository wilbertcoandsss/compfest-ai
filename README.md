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

**Ensure you have docker installed**

```
cd frontend/compfest-ai/
docker build . --tag compfest-ai-fe-next
docker run -d --name compfest-ai-fe -p 3001:3000 compfest-ai-fe-next


cd ../../
cd backend/compfest-ai/
docker build . --tag compfest-ai-be-flask
docker run -d --name compfest-ai-be -p 3002:3000 compfest-ai-be-flask
```

### Then see all processes

```
docker ps
```

### To confirm running

```
curl http://localhost:3002/michi
```

**output:**

```
{
    "response":"i love michi"
}
```

**Frontend**: http://localhost:3001/
**Backend**: http://localhost:3002/
