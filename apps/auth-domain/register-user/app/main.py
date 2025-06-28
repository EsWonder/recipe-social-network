from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="register-user service")

app.include_router(router)
