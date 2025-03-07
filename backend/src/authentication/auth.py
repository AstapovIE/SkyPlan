from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from  .db_users import crud,models, schemes
from .db_users.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

auth = APIRouter()

#Dependency
def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally:
        db.close()

@auth.post("/users/",response_model=schemes.User)
def post_user(user:schemes.User, db:Session=Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username is already used")
    return crud.create_user(db=db,user=user)

@auth.get("/users/{username}/",response_model=schemes.User)
def get_user(username:str, db:Session=Depends(get_db)):
    db_user = crud.get_user_by_username(db,username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@auth.post("/users/")
async def test():
    return {"message": "Hi!"}