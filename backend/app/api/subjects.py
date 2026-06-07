from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies import get_current_user, require_roles
from app.models import Subject, User, UserRole
from app.schemas import SubjectIn, SubjectOut

router = APIRouter(prefix="/subjects", tags=["subjects"])


@router.get("", response_model=list[SubjectOut])
def list_subjects(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if user.role == UserRole.teacher:
        return db.query(Subject).filter(Subject.teacher_id == user.id).all()
    return db.query(Subject).all()


@router.post("", response_model=SubjectOut)
def create_subject(payload: SubjectIn, db: Session = Depends(get_db), user: User = Depends(require_roles(UserRole.admin, UserRole.teacher))):
    teacher_id = payload.teacher_id if user.role == UserRole.admin and payload.teacher_id else user.id
    subject = Subject(name=payload.name, teacher_id=teacher_id)
    db.add(subject)
    db.commit()
    db.refresh(subject)
    return subject
