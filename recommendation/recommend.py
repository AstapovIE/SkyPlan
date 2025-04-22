from recommendation import DataPreprocessor, WeatherPredictModel, RecModel
from pandas import DataFrame

class Recommendation:
    """
    Класс контейнера Recommendation
    """
    def __init__(self, weather_dataframe: DataFrame, user_prefs: dict):
        self.data_preprocessor = DataPreprocessor(weather_dataframe)
        self.weather_predict_model = WeatherPredictModel(self.data_preprocessor.prepare_data())
        self.rec_model = RecModel(user_prefs)

    def get_weather_prediction(self):
        """
        Метод получения прогноза погоды на месяц вперед
        """
        print("Получаем прогноз модели ...")
        return self.weather_predict_model.get_prediction()

    def get_recommendation(self):
        """
        Финальный метод получения результатов работы Recommendation
        """
        predicted_weather = self.get_weather_prediction()
        print("Получаем рекомендации ...")
        print("Контейнер 'Recommendation', успешно спрогнозировал погоду и вернул список рекомендаций")
        return predicted_weather, self.rec_model.recommend_city_by_weather(predicted_weather)
