from fastapi import FastAPI
from fastapi.middleware.wsgi import WSGIMiddleware
from .authentication import auth
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from recommendation.recommend import Recommendation
from dashboard.dashboard import app as dashboard

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.auth)

@app.get('/')
async def root():
    return {"message": "Hello Bigger Applications!"}


"""
class SurveyResponse(BaseModel):
    business: list
    hobbies: list
    color: list
    weather: list
    temperature: int
    animal: str

@app.post("/survey")
async def submit_survey(response: SurveyResponse):
    print(response.model_dump())
    return JSONResponse(content={"message": "Survey received", "data": response.model_dump()})
"""

class SurveyResponse(BaseModel):
    tmin: float
    tmax: float
    tavg: float
    prcp: float
    wspd: float

@app.post("/survey")
async def submit_survey(response: SurveyResponse):
    user_prefs = response.model_dump()
    df =  pd.read_csv("./weather_2022.csv")
    recommender = Recommendation(df, user_prefs)
    weather_by_city_dict, rec = recommender.get_recommendation()
    print(rec[:10])
    return JSONResponse(content={
        "message": "Survey received",
        "data": rec[:10]
    })

app.mount("/dashboard", WSGIMiddleware(dashboard.server))