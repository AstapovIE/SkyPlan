from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from  .db_users import crud,models, schemes
from .db_users.database import SessionLocal, engine
from .authdata import create_access_token, get_current_user, user_with_token

models.Base.metadata.create_all(bind=engine)

auth = APIRouter(
    prefix='/auth',
    tags=['auth']
)

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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return db_user

@auth.post("/register")
async def register_user(user:schemes.UserAuth, db:Session=Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='User with such username already exicts'
        )
    new_user = crud.create_user(db=db,user=user)
    # no Js acsess
    return new_user

@auth.post("/login")
async def auth_user(response: Response, user:schemes.UserAuth, db:Session=Depends(get_db)):
    db_user = crud.authenticate_user(db, username=user.username, password=user.password)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Wrong username or password')
    access_token = create_access_token({"sub": str(db_user.username)})
    response.set_cookie(key="users_access_token", value=access_token, httponly=True)# no Js acsess
    return {'access_token': access_token, 'token_type': 'bearer'}

@auth.get("/me/")
async def get_me(user:schemes.User = Depends(get_current_user) , db:Session=Depends(get_db)):
    return user_with_token(db, user)

@auth.post("/logout/")
async def logout_user(response: Response):
    response.delete_cookie(key="users_access_token")
    return {'message': 'Пользователь успешно вышел из системы'}