from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import Optional, List

from .. import models, schemas
from ..database import  get_db

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    # hashed_password = utils.hash(user.password)
    # user.password = hashed_password
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        'message': "New data is entered",
        'data': new_user,
        'status': status.HTTP_201_CREATED
    }
@router.get("/", status_code=status.HTTP_201_CREATED, response_model=List[schemas.UserOut])
def get_tests(db: Session = Depends(get_db)):

    # print(current_user)
    users = db.query(models.User).all()
    return users

@router.get('/{id}', response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id number {id} is not found")
    return user