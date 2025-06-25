from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import psycopg2
from psycopg2.extras import RealDictCursor
import bcrypt
import os

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "auth_db")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "postgres")

def get_db():
    conn = psycopg2.connect(
        host=DB_HOST, port=DB_PORT, dbname=DB_NAME,
        user=DB_USER, password=DB_PASS,
        cursor_factory=RealDictCursor
    )
    return conn

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

@app.post("/register")
def register_user(user: UserCreate):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    existing = cur.fetchone()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_pw = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                (user.name, user.email, hashed_pw))
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "User registered successfully"}