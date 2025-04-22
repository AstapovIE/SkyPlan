import pandas as pd
import numpy as np

from sklearn.preprocessing import StandardScaler
from collections import defaultdict

class DataPreprocessor:
    """Подготовка данных для обучения"""
    def __init__(self, weather_dataframe, user_prefs):
        self.df = weather_dataframe
        self.user_prefs = user_prefs

    def clean_data(self):
        # Удаление ненужных колонок
        df = self.df.drop(columns=['Unnamed: 0', 'weather_id'], errors='ignore')
        df['time'] = pd.to_datetime(df['time'])

        # Объединение результатов
        df['month'] = df['time'].dt.month.astype('int8')
        df['day_of_year'] = df['time'].dt.dayofyear.astype('int16')

        # Оптимизация типов
        float_cols = ['tavg', 'tmin', 'tmax', 'prcp', 'wspd']
        df[float_cols] = df[float_cols].astype('float32')
        df['city_id'] = df['city_id'].astype('int32')

        print("Обработка завершена. Статистика:")
        print(f"Всего строк: {len(df)}")

        return df.reset_index(drop=True)

    def prepare_data(self, sequence_length=90, target_length=30, step=7):
        """
        Подготавливает данные для обучения модели LSTM
        Возвращает данные, нормализованные отдельно по каждому городу
        """
        # Добавляем синусоиды для сезонных признаков
        df = self.clean_data()
        df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
        df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)
        df['doy_sin'] = np.sin(2 * np.pi * df['day_of_year'] / 365)
        df['doy_cos'] = np.cos(2 * np.pi * df['day_of_year'] / 365)
        df.drop(columns=['day_of_year', 'month'], inplace=True)

        # Группировка данных по городам
        city_weather = defaultdict(list)
        grouped = df.groupby('city_id')
        for city_id, group in grouped:
            city_weather[city_id] = group.sort_values('time').reset_index(drop=True)

        # Признаки для обучения и предсказания
        input_features = ['tavg', 'tmin', 'tmax', 'prcp', 'wspd', 'month_sin', 'month_cos', 'doy_sin', 'doy_cos']
        target_features = ['tavg', 'tmin', 'tmax', 'prcp', 'wspd']

        all_X_train, all_y_train = [], []
        all_X_test, all_y_test = [], []
        scalers = {}

        for city_id, city_df in city_weather.items():
            train_size = int(0.8 * len(city_df))
            train_data = city_df.iloc[:train_size]
            test_data = city_df.iloc[train_size:]

            # Масштабируем только нужные признаки
            scaler = StandardScaler()
            train_scaled = scaler.fit_transform(train_data[input_features])
            test_scaled = scaler.transform(test_data[input_features])
            scalers[city_id] = scaler

            # После масштабирования: train_scaled и test_scaled уже NumPy
            # Важно — определить индексы таргет-признаков
            target_indices = [input_features.index(f) for f in target_features]

            def create_sequences(data, seq_len, tgt_len, step):
                X, y = [], []
                for i in range(0, len(data) - seq_len - tgt_len + 1, step):
                    x_seq = data[i:i + seq_len]
                    y_seq = data[i + seq_len:i + seq_len + tgt_len, target_indices]  # ТОЛЬКО таргеты
                    X.append(x_seq)
                    y.append(y_seq)
                return np.array(X), np.array(y)

            X_train_city, y_train_city = create_sequences(train_scaled, sequence_length, target_length, step)
            X_test_city, y_test_city = create_sequences(test_scaled, sequence_length, target_length, step)

            # print(f"[DEBUG] Город {city_id}: Train: {len(X_train_city)}, Test: {len(X_test_city)}")

            if len(X_train_city) > 0:
                all_X_train.append(X_train_city)
                all_y_train.append(y_train_city)
            if len(X_test_city) > 0:
                all_X_test.append(X_test_city)
                all_y_test.append(y_test_city)

        # Объединяем всё в массивы
        X_train = np.concatenate(all_X_train, axis=0) if all_X_train else np.array([])
        y_train = np.concatenate(all_y_train, axis=0) if all_y_train else np.array([])
        X_test = np.concatenate(all_X_test, axis=0) if all_X_test else np.array([])
        y_test = np.concatenate(all_y_test, axis=0) if all_y_test else np.array([])

        return X_train, y_train, X_test, y_test, scalers, city_weather


