import mysql.connector
import pandas as pd

def weather_data_get(name_city):
    '''
    Функция получает название города и возвращает по городу данные из таблицы WeatherData
    '''

    conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="svetlana2003!",
            database= 'WeatherDB'
        )
    cursor = conn.cursor()
    cursor.execute("SELECT city_id FROM City WHERE name_city = %s", (name_city,))
    city_id=cursor.fetchone()
    if city_id:
        cursor.execute("""SELECT * FROM WeatherData WHERE city_id = %s""", (city_id[0],))
        weather_data = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        print(weather_data)
        return pd.DataFrame(weather_data, columns=columns)
    else:
        print(f'Город {name_city} не найден')
    cursor.close()
    conn.close()

def weather_data_get():
    '''
    Функция возвращает  данные из таблицы WeatherData (return pandas table):
     city_id INT, time DATETIME, tavg DOUBLE, tmin DOUBLE, tmax DOUBLE, prcp DOUBLE, snow DOUBLE, wdir DOUBLE,
     wspd DOUBLE, wpgt DOUBLE, pres DOUBLE, tsun DOUBLE,
    '''

    conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="svetlana2003!",
            database= 'WeatherDB'
        )

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM WeatherData ")
        weather_data=cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        print(pd.DataFrame(weather_data, columns=columns))
        print(pd.DataFrame(weather_data, columns=columns))
        return pd.DataFrame(weather_data, columns=columns)

    except mysql.connector.Error as e:
        print(f"Ошибка БД: {e}")
        return pd.DataFrame()
    cursor.close()
    conn.close()

def users_requests_get():
    '''
    Функция получает ... и возвращает  данные из таблицы UsersRequests (предпочтения пользователя)
    '''
    pass

def users_recommendation_get():
    '''
    Функция получает ... и возвращает  данные из таблицы UsersRecommendation
    '''
    pass

weather_data_get()
