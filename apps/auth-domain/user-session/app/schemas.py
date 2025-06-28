from pydantic import BaseModel
from datetime import datetime

class SessionCreate(BaseModel):
    user_id: int
    ip: str
    user_agent: str

class SessionOut(BaseModel):
    id: int
    user_id: int
    ip: str
    user_agent: str
    login_time: datetime

    class Config:
        orm_mode = True
