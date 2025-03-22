import mysql.connector
import pandas as pd
from meteostat import Point, Daily
from datetime import datetime, timedelta
def clean_row(row):
   for col in ['tavg', 'tmin', 'tmax', 'prcp', 'snow', 'wdir', 'wspd', 'wpgt', 'pres', 'tsun']:
        if pd.isna(row[col]) :
            row[col] = None
   return row

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your password",
    database= 'Weather'
)
cursor = conn.cursor()

csv_file = 'C:/Users/User/Desktop/skyplan/данные по городам(Россия)/ru.csv'
cities_df = pd.read_csv(csv_file)

for index, row in cities_df.iterrows():
    city_name=row["city"]
    lat=row["lat"]
    lng=row["lng"]
    try:
        cursor.execute("INSERT INTO City (name_city, lat, lng) VALUES (%s, %s, %s)", (city_name, lat, lng))
    except mysql.connector.Error as err:
        print(f"Ошибка при вставке данных: {err}")
conn.commit()

cursor.execute("SELECT city_id, name_city, lat, lng FROM City")
cities = cursor.fetchall()


for city_id, city_name, lat, lng in cities:
    #объект Point для города
    point = Point(lat, lng)
   
    #данные за 2005-2025 по России
    end = datetime.now()
    start = datetime.now()-timedelta(days=365*1)


    data = Daily(point, start, end)
    weather_data = data.fetch()

    for date, row in weather_data.iterrows():
        cursor.execute("""
                INSERT INTO WeatherData (city_id, time, tavg, tmin, tmax, prcp, snow, wdir, wspd, wpgt, pres, tsun)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (city_id, date.to_pydatetime(),
                  row['tavg'] if pd.notnull(row['tavg']) else None,
                  row['tmin'] if pd.notnull(row['tmin']) else None,
                  row['tmax'] if pd.notnull(row['tmax']) else None,
                  row['prcp'] if pd.notnull(row['prcp']) else None,
                  row['snow'] if pd.notnull(row['snow']) else None,
                  row['wdir'] if pd.notnull(row['wdir']) else None,
                  row['wspd'] if pd.notnull(row['wspd']) else None,
                  row['wpgt'] if pd.notnull(row['wpgt']) else None,
                  row['pres'] if pd.notnull(row['pres']) else None,
                  row['tsun'] if pd.notnull(row['tsun']) else None))

    conn.commit()

cursor.close()
conn.close()
'''

query = "SELECT name FROM sqlite_master WHERE type='table';"
cursor.execute(query)
tables = cursor.fetchall()

query = """SELECT * FROM City"""
cursor.execute(query)
rows = cursor.fetchall()
column_names = [description[0] for description in cursor.description]
print("\t".join(column_names))
for row in rows:
    print("\t".join(map(str, row)))
'''

print("Данные загружены")
