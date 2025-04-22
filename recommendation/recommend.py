from recommendation import DataPreprocessor, WeatherPredictModel, RecModel

class Recommendation:
    '''
    Класс контейнера Recommendation
    '''
    def __init__(self, weather_dataframe, user_prefs):
        self.data_preprocessor = DataPreprocessor(weather_dataframe)
        self.weather_predict_model = WeatherPredictModel(self.data_preprocessor.prepare_data())
        self.rec_model = RecModel(user_prefs)

    def get_recommendation(self):
        return self.weather_predict_model.get_prediction()