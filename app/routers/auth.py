from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import database, models, schemas, utils, oauth2

router = APIRouter(
    tags=["Authentication"],
)
@router.post("/login", response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):

    user = db.query(models.User).filter(models.User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(status_code=403, detail="User not found")

    # use this if using hashed password
    # if not utils.verify(user_credentials.password, user.password):
    #     raise HTTPException(status_code=400, detail="Incorrect password")
    #
    if user_credentials.password != user.password:
        raise HTTPException(status_code=403, detail="Incorrect password")

    access_token = oauth2.create_access_token(data = {"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}
