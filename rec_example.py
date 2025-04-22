import pandas as pd

from recommendation import Recommendation

recommender = Recommendation(pd.read_csv("./weather_2022.csv"), None)
rec = recommender.get_recommendation()
print(rec[1].tail(n=3))