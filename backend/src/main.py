from fastapi import FastAPI
from .authentication import auth
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.auth)

@app.get('/')
async def root():
    return {"message": "Hello Bigger Applications!"}


class SurveyResponse(BaseModel):
    business: list
    hobbies: list
    color: list
    weather: list
    temperature: int
    animal: str

@app.post("/survey")
async def submit_survey(response: SurveyResponse):
    # Here you can process/store the data, for now, we return it back.
    print(response.model_dump())
    return JSONResponse(content={"message": "Survey received", "data": response.model_dump()})