from scipy.spatial.distance import euclidean

class RecModel:
    """
    Класс формирования рекомендаций
    """
    def __init__(self, user_prefs):
        self.user_prefs = user_prefs

    def recommend_city_by_weather(self, forecast_dict):
        """
        forecast_dict: словарь {city_id: DataFrame с колонками [tavg, tmin, tmax, prcp, wspd]}.
        Возвращает список (city_id), отсортированный по убыванию схожести с предпочтением self.user_prefs.
        (то есть наиболее подходящий город — первым)
        """
        recommendations = []

        for city_id, forecast_df in forecast_dict.items():
            # Вычисляем средние значения признаков за период
            avg_weather = forecast_df[['tavg', 'tmin', 'tmax', 'prcp', 'wspd']].mean().to_dict()

            # Преобразуем в векторы
            vec_forecast = [avg_weather[k] for k in self.user_prefs]
            vec_user = [self.user_prefs[k] for k in self.user_prefs]

            # Считаем евклидово расстояние
            dist = euclidean(vec_forecast, vec_user)

            recommendations.append((city_id, dist))

        # Сортировка по расстоянию (чем меньше, тем ближе к предпочтениям)
        recommendations.sort(key=lambda x: x[1])

        return [city_id for city_id, _ in recommendations]
