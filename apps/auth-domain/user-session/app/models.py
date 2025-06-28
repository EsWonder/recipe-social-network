from sqlalchemy import Column, Integer, String, DateTime, func
from app.database import Base

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    ip = Column(String)
    user_agent = Column(String)
    login_time = Column(DateTime(timezone=True), server_default=func.now())
