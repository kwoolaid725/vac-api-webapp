from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter, Request, Form, Header
from sqlalchemy import desc
from sqlalchemy.orm import Session
from typing import Optional, List

from .. import models, schemas, oauth2
from ..database import  get_db

from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.templating import Jinja2Templates


router = APIRouter(
    prefix="/tests",
    tags=["tests"],
)

templates = Jinja2Templates(directory="app/templates")

@router.get("/", status_code=status.HTTP_201_CREATED, response_model=List[schemas.Test])
def get_tests(db: Session = Depends(get_db)):

    # print(current_user)
    tests = db.query(models.Test).all()
    return tests

# @router.get("/", status_code=status.HTTP_201_CREATED, response_class=HTMLResponse, response_model=schemas.Test)
# def get_tests(request: Request, db: Session = Depends(get_db), hx_request: Optional[str] = Header(None)):
#
#     tests = db.query(models.Test).join(models.test_vacuums).join(models.Vacuum).join(models.User).order_by(desc(models.Test.id))\
#         .filter(models.test_vacuums.c.test_id == models.Test.id,
#                 models.test_vacuums.c.vacuum_inv_no == models.Vacuum.inv_no).all()
#
#     context = {"request": request,
#                "tests": tests}
#
#     return templates.TemplateResponse("tests/tests.html", context)


# @router.get("/create", status_code=status.HTTP_201_CREATED, response_class=HTMLResponse)
# async def create_test(request: Request):
#
#     context = {"request": request}
#
#     return render(request, "tests/partials/add_test_form.html", context)

# @router.post("/create", status_code=status.HTTP_201_CREATED, response_class=HTMLResponse)
# def create_test(test: schemas.TestCreate, db: Session = Depends(get_db)

# @router.post("/create", status_code=status.HTTP_201_CREATED, response_class=HTMLResponse, response_model=schemas.Test)
# def create_test(test: schemas.TestCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
#     new_test = models.Test(owner_id=current_user.id, **test.dict())
#     print(current_user.email)
#     db.add(new_test)
#     db.commit()
#     db.refresh(new_test)
#     return {
#         'message': "New test is created",
#         'data': new_test,
#     }

@router.post("/", status_code=status.HTTP_201_CREATED, response_class=HTMLResponse, response_model=schemas.Test)
def create_test(test: schemas.TestCreate, db: Session = Depends(get_db)):

    data = models.Test(**test.dict())
    # new_test to json
    new_test= jsonable_encoder(data)
    db.add(data)
    db.commit()
    db.refresh(data)

    return JSONResponse(content=new_test)


@router.get("/{id}", status_code=status.HTTP_201_CREATED, response_model=schemas.Test)
def get_test(id: int, db: Session = Depends(get_db)):

    test = db.query(models.Test).filter(models.Test.id == id).first()
    if test is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Test with id number {id} is not found")
    return test



@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_test(id: int, db: Session = Depends(get_db)):

    test_query = db.query(models.Test).filter(models.Test.id == id)
    test = test_query.first()
    if test is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Test with id number {id} is not found")

    # if test.owner_id != current_user.id:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
    #                         detail=f"User with id number {current_user.id} is not authorized to delete this test")

    test_query.delete(synchronize_session=False)
    db.commit()
    return {
        'message': "Test is deleted",
        'data': test_query
    }

@router.put("/{id}", response_model=schemas.Test)
def update_test(id: int, updated_test: schemas.TestCreate, db: Session = Depends(get_db)):

    test_query = db.query(models.Test).filter(models.Test.id == id)
    test = test_query.first()
    if test is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Test with id number {id} is not found")

    # if test.owner_id != current_user.id:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"User with id number {current_user.id} is not authorized to update this test")

    test_query.update(updated_test.dict(), synchronize_session=False)
    updated = jsonable_encoder(models.Test(**updated_test.dict()))
    db.commit()
    return JSONResponse(content=updated)