
from enum import Enum
from typing import Optional
from datetime import datetime
import pytz

from pydantic import BaseModel, EmailStr, SecretStr, validator
from app.models import User

tz = pytz.timezone('America/Chicago')

class UserCreate(BaseModel):
    id: int
    email: EmailStr
    password: str
    full_name: str
    role: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    created_at: datetime

    class Config:
            orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: SecretStr
    password_confirm: SecretStr

class UserSignup(BaseModel):
    email: EmailStr
    password: SecretStr
    password_confirm: SecretStr
    full_name: str
    role: str

    @validator('email')
    def email_is_valid(cls, v):
        q = User.objects.filter(email=v)
        if q.count() != 0:
            raise ValueError('Email already registered')
        return v

    @validator('password_confirm')
    def passwords_match(cls, v, values, **kwargs):
        password = values.get('password')
        password_confirm = v
        if password != password_confirm:
            raise ValueError('passwords do not match')
        return v

class Token(BaseModel):
    access_token: str
    token_type: str


class VacuumBase(BaseModel):
    inv_no: int
    type: str
    brand: str
    model_name: str
    product_stage: str
    color: str
    dual_nozzle: bool
    fluffy_nozzle: bool
    self_empty: bool
    self_clean: bool
    release_date: datetime
    image: Optional[str] = None

class VacuumCreate(VacuumBase):
    pass


# REF 1 - To query details of vacuum that are associated with the test
class VacuumTest(BaseModel):
    inv_no: int
    type: str
    brand: str
    model_name: str

    class Config:
            orm_mode = True

class TestBase(BaseModel):
    category: str
    vac_type: str
    test_status: str = "NEW"
    assigned1: int
    assigned2: Optional[int] = None
    due_date: Optional[datetime] = None
    completion_date: Optional[datetime] = None
    notes: Optional[str] = None


class TestCreate(TestBase):
    last_modified: datetime = datetime.now(tz)
    pass


# REF 1 - TEST Class
class Test(TestBase):
    id: int
    created_at: datetime
    last_modified: datetime
    owner_id: int
    tested_vacs: list[VacuumTest] = []

    class Config:
            orm_mode = True


# REF 2 - To query details of tests that are associated with the vacuum
class TestVacuum(BaseModel):
    id: int
    category: str
    vac_type: str
    test_status: str
    assigned1: int
    assigned2: Optional[int] = None
    create_date: datetime
    complete_date: Optional[datetime] = None
    notes: Optional[str] = None
    owner_id: int
    class Config:
            orm_mode = True


# REF 2 - Placed "GET" Vacuum Class here to avoid circular dependency
class Vacuum(VacuumBase):
    created_at: datetime
    owner_id: int
    # tests: list[TestVacuum] = []
    class Config:
        orm_mode = True


class CRcordlessBase(BaseModel):
    test_parent_id: int
    test_target: str
    test_group: str
    test_case: Optional[str] = None
    inv_no: int
    brush_type: str
    power_setting: Optional[str] = None
    test_measure: str
    value: str
    units: Optional[str] = None
    run: int
    room_temp: Optional[float] = None
    relative_humidity: Optional[float] = None
    notes: Optional[str] = None
    image: Optional[str] = None

class CRcordlessCreate(CRcordlessBase):
    pass

class CRcordless(CRcordlessBase):
    id: int
    tester: int
    created_at: datetime
    owner_id: int
    vacuum_details: Vacuum
    test_details: Test
    class Config:
            orm_mode = True


class CRrobotBase(BaseModel):
    test_parent_id: int
    test_target: str
    test_case: Optional[str] = None
    inv_no: int
    power_setting: Optional[str] = None
    test_measure: str
    value: str
    units: Optional[str] = None
    run: int
    notes: Optional[str] = None
    image: Optional[str] = None

class CRrobotCreate(CRrobotBase):
    pass

class CRrobot(CRrobotBase):
    id: int
    tester: int
    owner_id: int
    created_at: datetime
    vacuum_details: Vacuum
    test_details: Test
    class Config:
            orm_mode = True


class TokenData(BaseModel):
    id: Optional[str] = None