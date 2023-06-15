import pathlib
from fastapi import FastAPI, Request, Form
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .routers import vacuum, user, test, cr_robot, cr_cordless, auth
from pydantic import BaseSettings
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

# below created the tables in the database before implementing alembic
models.Base.metadata.create_all(bind=engine)

BASE_DIR = pathlib.Path(__file__).resolve().parent #app/
TEMPLATE_DIR = BASE_DIR / "templates"

app = FastAPI()

templates = Jinja2Templates(directory=str(TEMPLATE_DIR))

origins = ["*"]
# to test, inspect -> console
#fetch('http://localhost:8000/').then(res => res.json()).then(console.log)
#
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vacuum.router)
app.include_router(user.router)
app.include_router(test.router)
app.include_router(cr_robot.router)
app.include_router(cr_cordless.router)
app.include_router(auth.router)


@app.get('/', response_class=HTMLResponse)
def index(request: Request):
    context = {"request": request}
    return templates.TemplateResponse("home.html", context)

@app.get('/login', response_class=HTMLResponse)
def login_get_view(request: Request):
    context = {"request": request}
    return templates.TemplateResponse("auth/login.html", context)

@app.post('/login', response_class=HTMLResponse)
def login_post_view(request: Request,
                    email: str = Form(...),
                    password: str = Form(...)):
    print(email, password)
    context = {"request": request}
    return templates.TemplateResponse("auth/login.html", context)


@app.get('/signup', response_class=HTMLResponse)
def login_get_view(request: Request):
    context = {"request": request}
    return templates.TemplateResponse("auth/signup.html", context)

@app.post('/signup', response_class=HTMLResponse)
def login_post_view(request: Request,
                    email: str = Form(...),
                    password: str = Form(...),
                    password_confirm: str = Form(...)
                    ):
    print(email, password)
    context = {"request": request}
    return templates.TemplateResponse("auth/signup.html", context)

# def root():
#     return {"message": "Hello World"}

# Vacuum Table

