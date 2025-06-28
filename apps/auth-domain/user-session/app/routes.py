from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import database, models, schemas

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/session", response_model=schemas.SessionOut)
def create_session(session_data: schemas.SessionCreate, db: Session = Depends(get_db)):
    session = models.Session(**session_data.dict())
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

@router.get("/sessions/{user_id}", response_model=list[schemas.SessionOut])
def get_sessions(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Session).filter(models.Session.user_id == user_id).all()

@router.delete("/session/{session_id}")
def delete_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(models.Session).filter(models.Session.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    db.delete(session)
    db.commit()
    return {"message": "Session deleted"}
