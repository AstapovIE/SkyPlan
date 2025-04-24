from pydantic import BaseModel

class User(BaseModel):
    id : int
    username : str
    password: str

class UserAuth(BaseModel):
    username : str 
    password : str