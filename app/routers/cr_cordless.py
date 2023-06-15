from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import Optional, List

from .. import models, schemas, oauth2
from ..database import  get_db

router = APIRouter(
    prefix="/CR-Cordless",
    tags=["CR-Cordless"],
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.CRcordless)
def create_cr_cordless(CRcordless: schemas.CRcordlessCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    print(current_user.email)
    testdata = models.CRcordless(tester=current_user.id, owner_id=current_user.id, **CRcordless.dict())
    db.add(testdata)
    db.commit()
    db.refresh(testdata)
    return {
        'message': "New data is entered",
        'data': testdata,
        'status': status.HTTP_201_CREATED
    }
@router.get("/{id}", status_code=status.HTTP_201_CREATED, response_model=schemas.CRcordless)
def get_cr_cordless(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    print(current_user.email)
    testdata = db.query(models.CRcordless).filter(models.CRcordless.id == id).first()
    if testdata is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Test with id number {id} is not found")
    return testdata

@router.get("/", status_code=status.HTTP_201_CREATED, response_model=List[schemas.CRcordless])
def get_cr_cordlesses(db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user),
                      test_parent_id: Optional[int] = None):
    print(current_user.email)
    testdata = db.query(models.CRcordless).filter(models.CRcordless.test_parent_id == test_parent_id).all()
    return testdata

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cr_cordless(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    print(current_user.email)
    testdata_query = db.query(models.CRcordless).filter(models.CRcordless.id == id)
    testdata = testdata_query.first()
    if testdata is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Test with id number {id} is not found")

    if testdata.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"User with id number {current_user.id} is not authorized to delete this data")

    testdata_query.delete(synchronize_session=False)
    db.commit()
    return {
        'message': "Test is deleted",
        'data': testdata_query
    }
@router.put("/{id}", response_model=schemas.CRcordless)
def update_cr_robot(id: int, updated_test: schemas.CRrobotCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    print(current_user.email)
    testdata_query = db.query(models.CRcordless).filter(models.CRcordless.id == id)
    testdata = testdata_query.first()
    if testdata is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Test with id number {id} is not found")

    if testdata.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"User with id number {current_user.id} is not authorized to delete this data")

    testdata_query.update(updated_test.dict(), synchronize_session=False)
    db.commit()
    return {
        'message': "Vacuum is updated",
        'data': testdata_query
    }