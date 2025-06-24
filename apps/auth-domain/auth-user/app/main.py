from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes.auth_routes import router as auth_router

app = FastAPI(title="Auth User Microservice")

# 👇 Agrega esta línea para servir archivos desde /frontend/
app.mount("/frontend", StaticFiles(directory="frontend", html=True), name="frontend")

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

@app.get("/")
def root():
    return {"message": "Auth User Microservice is running"}
