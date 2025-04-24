import mysql.connector
import pandas as pd

def weather_data_get(name_city):
    '''
    Функция получает название города и возвращает по городу данные из таблицы WeatherData
    '''

    conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="milana",
            database= 'weather'
        )
    cursor = conn.cursor()
    cursor.execute("SELECT city_id FROM City WHERE name_city = %s", (name_city,))
    city_id=cursor.fetchone()
    if city_id:
        cursor.execute("""SELECT * FROM weatherdata WHERE city_id = %s""", (city_id[0],))
        weather_data = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        print(weather_data)
        return pd.DataFrame(weather_data, columns=columns)
    else:
        print(f'Город {city_name} не найден')
    cursor.close()
    conn.close()

def get_city_coordinates(city_name):
    '''
    Функция получает название города (на английском) и возвращает по городу широту и долготу
    '''
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="milana",
            database='Weather'
        )
        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            query = "SELECT lat, lng FROM City WHERE LOWER(name_city) = LOWER(%s)"
            cursor.execute(query, (city_name,))
            result = cursor.fetchone()
            if result:
                return (result['lat'], result['lng'])
            else:
                print(f"Город '{city_name}' не найден")
                return None
    except Error as e:
        print(f"Ошибка при работе с MySQL: {e}")
        return None
    cursor.close()
    connection.close()

'''
def weather_data_get():
    

    conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="milana",
            database= 'Weather'
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
'''
def weather_data_get():
    '''
    Функция возвращает данные из таблицы WeatherData и сохраняет их в CSV-файл.
    '''
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="milana",
        database='weather'
    )

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM weatherdata")
        weather_data = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]

        df = pd.DataFrame(weather_data, columns=columns)
        df.to_csv("weather_data.csv", index=False, encoding='utf-8')

        cursor.close()
        conn.close()

        return df

    except mysql.connector.Error as e:
        print(f"Ошибка БД: {e}")
        cursor.close()
        conn.close()
        return pd.DataFrame()
    
    



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

#weather_data_get()
'''
city = input("Введите название города: ")
coordinates = get_city_coordinates(city)
if coordinates:
    lat, lng = coordinates
    print(f"Координаты города {city}: широта {lat}, долгота {lng}")
else:
    print("Координаты не найдены")
'''
