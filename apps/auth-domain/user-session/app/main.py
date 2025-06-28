from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="user-session service")
app.include_router(router)
