import torch
import torch.nn as nn
from tqdm import tqdm

import numpy as np
import pandas as pd

# Проверка доступности GPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f'Using device: {device}')


class WeatherLSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size, target_length):
        super(WeatherLSTM, self).__init__()
        self.target_length = target_length
        self.output_size = output_size
        self.lstm = nn.LSTM(input_size=input_size,
                            hidden_size=hidden_size,
                            num_layers=num_layers,
                            batch_first=True)
        self.fc = nn.Linear(hidden_size, target_length * output_size)

    def forward(self, x):
        # x: [batch, seq_len, input_size]
        lstm_out, _ = self.lstm(x)
        last_hidden = lstm_out[:, -1, :]  # [batch, hidden_size]
        out = self.fc(last_hidden)  # [batch, target_length * output_size]
        out = out.view(-1, self.target_length, self.output_size)  # [batch, 30, 5]
        return out


class WeatherPredictModel:
    """
    Модель предсказания погодных условий
    """

    def __init__(self, data):
        self.model = WeatherLSTM(
            input_size=9,
            hidden_size=128,
            num_layers=2,
            output_size=5,
            target_length=30
        ).to(device)

        train_loader, test_loader, self.scalers_dict, self.city_weather = data

        criterion = nn.MSELoss()
        optimizer = torch.optim.Adam(self.model.parameters(), lr=1e-3)
        self.train_model(train_loader, criterion, optimizer, epochs=3)

    def train_model(self, train_loader, criterion, optimizer, epochs=20):
        """
        Метод обучения модели
        """
        print("Обучаем модель прогнозирования погоды ...")
        for epoch in range(epochs):
            self.model.train()
            total_loss = 0
            for batch_x, batch_y in tqdm(train_loader, desc=f"Epoch {epoch + 1}/{epochs}"):
                batch_x, batch_y = batch_x.to(device), batch_y.to(device)
                optimizer.zero_grad()

                preds = self.model(batch_x)
                loss = criterion(preds, batch_y)
                loss.backward()
                optimizer.step()
                total_loss += loss.item()
        print("Модель успешно обучена и сохранена в self.model")

    def predict_future_weather(self, forecast_days=30, sequence_length=90):
        """
        Прогнозирует погоду на forecast_days дней вперёд для каждого города.
        """
        self.model.eval()

        target_columns = ['tavg', 'tmin', 'tmax', 'prcp', 'wspd']
        input_features = ['tavg', 'tmin', 'tmax', 'prcp', 'wspd',
                          'month_sin', 'month_cos', 'doy_sin', 'doy_cos']

        predictions = {}

        with torch.no_grad():
            for city_id, city_df in self.city_weather.items():
                scaler = self.scalers_dict[city_id]

                city_df = city_df.sort_values('time').reset_index(drop=True)
                last_sequence = city_df[-sequence_length:].copy()

                if len(last_sequence) < sequence_length:
                    print(f"Недостаточно данных для города {city_id}, пропускаем.")
                    continue

                # Проверка наличия всех необходимых признаков в последней последовательности
                if not all(feature in last_sequence.columns for feature in input_features):
                    print(f"Для города {city_id} отсутствуют нужные признаки, пропускаем.")
                    continue

                # Выбираем последние 90 дней с нужными фичами
                last_features = last_sequence[input_features].copy()
                scaled = scaler.transform(last_features)

                input_seq = torch.tensor(scaled, dtype=torch.float32).unsqueeze(0).to(device)  # [1, seq_len, features]

                # Прогноз сразу на 30 дней вперёд
                pred = self.model(input_seq)  # [1, 30, 5]
                pred_np = pred.squeeze(0).cpu().numpy()  # [30, 5]

                # Создаём даты прогноза
                last_date = pd.to_datetime(last_sequence['time'].iloc[-1])
                forecast_dates = [last_date + pd.Timedelta(days=i) for i in range(1, forecast_days + 1)]

                # Преобразуем предсказания в оригинальные единицы
                # Создаём dummy массив для обратной трансформации (т.к. scaler ждёт shape [*, 9])
                dummy_input = np.zeros((forecast_days, len(input_features)))
                dummy_input[:, :5] = pred_np  # Только первые 5 фичей — это таргеты
                pred_original = scaler.inverse_transform(dummy_input)[:, :5]

                forecast_df = pd.DataFrame(pred_original, columns=target_columns)
                forecast_df['time'] = forecast_dates
                forecast_df['city_id'] = city_id
                forecast_df = forecast_df[['time', 'city_id'] + target_columns]

                predictions[city_id] = forecast_df

        return predictions

    def update_city_weather_data(self):
        """
        Обновление словаря с погодой в каждом городе
        """
        weather_forecasts = self.predict_future_weather()
        for city_id, forecast_df in weather_forecasts.items():
            # Получаем исходный DataFrame для города
            city_df = self.city_weather[city_id]

            # Убираем сезонные признаки (month_sin, month_cos, doy_sin, doy_cos)
            city_df = city_df.drop(columns=['month_sin', 'month_cos', 'doy_sin', 'doy_cos'], errors='ignore')

            # Округляем прогнозы до 1 знака после запятой
            target_columns = ['tavg', 'tmin', 'tmax', 'prcp', 'wspd']
            forecast_df[target_columns] = forecast_df[target_columns].round(1)

            # Конкатенируем данные погоды с прогнозом
            updated_city_df = pd.concat([city_df, forecast_df], axis=0, ignore_index=True)

            # Обновляем словарь
            self.city_weather[city_id] = updated_city_df

        print("Получен прогноз модели и обновлен словарь с погодой в разных городах на месяц вперед")

    def get_prediction(self):
        """
        Получение итогового словаря с прогнозом
        """
        self.update_city_weather_data()
        return self.city_weather
