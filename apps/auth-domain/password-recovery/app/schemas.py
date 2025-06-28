from pydantic import BaseModel

class PasswordRecoveryRequest(BaseModel):
    email: str
    new_password: str
