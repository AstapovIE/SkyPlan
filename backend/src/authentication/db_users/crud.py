from sqlalchemy.orm import Session
from . import models,schemes
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user:schemes.User):
    db_user = models.User(username=user.username,
                          password=get_password_hash(user.password))
    db.add(db_user)#add that instance object to database session
    db.commit()#commit the changes to the database
    db.refresh(db_user)#refresh your instance, so that it contains any new data from the database
    return {'User added'}

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or verify_password(plain_password=password, hashed_password=user.password) is False:
        return None
    return user