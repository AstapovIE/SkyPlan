from fastapi import FastAPI
from .authentication import auth

app=FastAPI()
app.include_router(auth.auth)

@app.get('/')
async def root():
    return {"message": "Hello Bigger Applications!"}