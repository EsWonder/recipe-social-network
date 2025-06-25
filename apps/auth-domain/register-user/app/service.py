from app.models import users_db
from app.schemas import UserCreate
from app.utils import hash_password

def register_user(user: UserCreate) -> bool:
    if any(u['email'] == user.email for u in users_db):
        return False
    hashed_pw = hash_password(user.password)
    users_db.append({
        "name": user.name,
        "email": user.email,
        "password": hashed_pw
    })
    return True