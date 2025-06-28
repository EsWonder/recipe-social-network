from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="auth-user service")

app.include_router(router)
