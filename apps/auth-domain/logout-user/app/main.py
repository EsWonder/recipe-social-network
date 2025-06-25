from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulación de logout invalidando el token en frontend
@app.post("/logout")
def logout(request: Request):
    return {"message": "Logged out. Please remove token on client side."}