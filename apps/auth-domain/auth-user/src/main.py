from fastapi import FastAPI, HTTPException, Request
from database import get_connection

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Auth User Service Running"}

@app.post("/login")
async def login(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Missing email or password")

    conn = await get_connection()
    user = await conn.fetchrow("SELECT * FROM users WHERE email = $1", email)
    await conn.close()

    if not user or user["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user": {
            "email": user["email"],
            "name": user["name"]
        },
        "token": "fake-jwt-token"
    }
