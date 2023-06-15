from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings
# from fastapi_utils.guid_type import setup_guids_postgresql
import psycopg2
from psycopg2.extras import RealDictCursor
import time


# SQLALCHEMY_DATABASE_URL = 'postgresql+psycopg2://postgres:password@localhost:5432/vacuums'
SQLALCHEMY_DATABASE_URL = f'postgresql+psycopg2://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# if want to use SQL method instead of ORM

# while True:
#
#     try:
#         conn = psycopg2.connect(host='localhost', database='fastapi', user='postgres'
#                                 , password='sozjavbxj', cursor_factory=RealDictCursor)
#         cursor = conn.cursor()
#         print("Connected to database")
#         break
#     except Exception as error:
#         print("Connecting to database failed")
#         print("Error: ", error)
#         time.sleep(5)