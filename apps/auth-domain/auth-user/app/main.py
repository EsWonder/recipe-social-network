from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router

app = FastAPI(title="Auth User Microservice")

# Include authentication routes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

@app.get("/")
def root():
    return {"message": "Auth User Microservice is running"}
