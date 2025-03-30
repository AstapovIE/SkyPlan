import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="svetlana2003!", auth_plugin='mysql_native_password'
)

cursor = db.cursor()
cursor.execute("CREATE DATABASE IF NOT EXISTS WeatherDB")
cursor.execute("USE WeatherDB")

cursor.execute("""CREATE TABLE IF NOT EXISTS City (
                    city_id INT AUTO_INCREMENT PRIMARY KEY,
                    name_city VARCHAR(255) NOT NULL,
                    lat DOUBLE,
                    lng DOUBLE) """)

cursor.execute("""CREATE TABLE IF NOT EXISTS UsersProfiles (
                    user_id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL) """)

cursor.execute("""CREATE TABLE IF NOT EXISTS UsersRecommendation (
                    recommendation_id INT AUTO_INCREMENT PRIMARY KEY,
                    recommendation VARCHAR(255) NOT NULL UNIQUE) """)

cursor.execute("""CREATE TABLE IF NOT EXISTS UsersRequests (
                request_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                request_city_id INT,
                recommendation_id INT,
                FOREIGN KEY (user_id) REFERENCES UsersProfiles(user_id),
                FOREIGN KEY (request_city_id) REFERENCES City(city_id),
                FOREIGN KEY (recommendation_id) REFERENCES UsersRecommendation(recommendation_id)) """)

cursor.execute("""CREATE TABLE IF NOT EXISTS WeatherData (
                weather_id INT AUTO_INCREMENT PRIMARY KEY,
                city_id INT,
                time DATETIME,
                tavg DOUBLE,
                tmin DOUBLE,
                tmax DOUBLE,
                prcp DOUBLE,
                snow DOUBLE,
                wdir DOUBLE,
                wspd DOUBLE,
                wpgt DOUBLE,
                pres DOUBLE,
                tsun DOUBLE,
                FOREIGN KEY (city_id) REFERENCES City(city_id)) """)
db.commit()
cursor.close()
db.close()

