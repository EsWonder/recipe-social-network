from sqlalchemy import Column, Integer, String
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String)
    phone = Column(String)
    city = Column(String)
    address = Column(String)
    birthdate = Column(String)
    gender = Column(String)
