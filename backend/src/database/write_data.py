import mysql.connector

def weather_data_write():
    '''
    Функция получает ... и записывает данные по городу в таблицу WeatherData
    '''
    pass

def users_profilies_write(username,  password):
    conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="milana",
            database= 'Weather'
        )
    cursor = conn.cursor()
    try:
        cursor.execute("""INSERT INTO UsersProfiles (username, password) VALUES (%s, %s)""", (username,  password))
        conn.commit()
    except mysql.connector.IntegrityError:
        print(f"Пользователь с ником {username}  уже существует")
    cursor.close()
    conn.close()

def users_requests_write(request_id, user_id, request_city_id, recommendation_id):
    '''
    Функция получает ... и записывает данные в таблицу UsersRequests
    '''
    pass

def users_recommendation_write(recommendation):
    '''
    Функция записывает recommendation в таблицу UsersRecommendation
    '''
    conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="your password",
            database= 'Weather'
        )
    cursor = conn.cursor()
    try:
        cursor.execute("""INSERT INTO UsersRecommendation (recommendation) VALUES (%s)""", (recommendation))
        conn.commit()
    except mysql.connector.IntegrityError:
        print(f"Рекомендация  {recommendation} уже существует в таблице UsersRecommendation")

users_profilies_write("test_user", "test_password")
'''
conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="your password",
            database= 'Weather'
        )
cursor = conn.cursor()

query = """SELECT * FROM UsersProfiles"""
cursor.execute(query)
rows = cursor.fetchall()
column_names = [description[0] for description in cursor.description]
print("\t".join(column_names))
for row in rows:
    print("\t".join(map(str, row)))
cursor.close()
conn.close()
'''
