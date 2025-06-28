from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="password-recovery service")
app.include_router(router)
