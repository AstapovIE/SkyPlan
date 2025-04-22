import pandas as pd

from recommendation import Recommendation

user_prefs_example = {
    'tavg': 20.0,
    'tmin': 15.0,
    'tmax': 25.0,
    'prcp': 0.0,
    'wspd': 3.0
}

recommender = Recommendation(pd.read_csv("./weather_2022.csv"), user_prefs_example)
weather_by_city_dict, rec = recommender.get_recommendation()
print(rec[:10])