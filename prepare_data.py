class DataPreprocessor:
    """Подготовка данных для обучения"""
    pass

import pandas as pd

df = pd.read_csv("weather_data.csv")
print(df.info())