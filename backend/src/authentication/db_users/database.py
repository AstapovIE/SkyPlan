from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

URL_DATABASE="mysql+pymysql://root:milana@localhost:3306/weather"
#URL_DATABASE = "sqlite+aiosqlite:///WeatherDB.db"

engine = create_engine(URL_DATABASE)
SessionLocal =  sessionmaker(autocommit=False, autoflush=False, bind=engine) #read about this
Base = declarative_base()