from fastapi import APIRouter, HTTPException
from app.schemas.auth_dto import LoginRequest, TokenResponse
from app.services.auth_service import validate_user
from app.services.jwt_service import create_token, verify_token

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
def login_user(request: LoginRequest):
    if validate_user(request.email, request.password):
        token = create_token({"email": request.email})
        return {"access_token": token}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/verify-token")
def verify_user_token(token: str):
    try:
        payload = verify_token(token)
        return {"valid": True, "payload": payload}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
