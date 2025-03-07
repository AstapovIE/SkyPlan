from sqlalchemy.orm import Session
from . import models,schemes


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user:schemes.User):
    db_user = models.User(username=user.username,
                          password=user.password)
    db.add(db_user)#add that instance object to database session
    db.commit()#commit the changes to the database
    db.refresh(db_user)#refresh your instance, so that it contains any new data from the database
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()