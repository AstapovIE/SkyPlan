from sqlalchemy import Column,Integer, String

from .database import Base

class User(Base):
    __tablename__ = "UsersProfiles"
    id = Column(Integer,primary_key=True,index=True)
    username = Column(String(30),unique=True,index=True)
    password = Column(String(30),index=True)