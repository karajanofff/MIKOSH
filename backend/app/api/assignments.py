from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies import get_current_user, require_roles
from app.models import Assignment, StudentGroup, User, UserRole
from app.schemas import AssignmentIn, AssignmentOut

router = APIRouter(prefix="/assignments", tags=["assignments"])


@router.get("", response_model=list[AssignmentOut])
def list_assignments(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if user.role == UserRole.teacher:
        return db.query(Assignment).filter(Assignment.teacher_id == user.id).all()
    if user.role == UserRole.student:
        group_ids = [row.group_id for row in db.query(StudentGroup).filter(StudentGroup.student_id == user.id).all()]
        return db.query(Assignment).filter(Assignment.group_id.in_(group_ids)).all()
    return db.query(Assignment).all()


@router.post("", response_model=AssignmentOut)
def create_assignment(payload: AssignmentIn, db: Session = Depends(get_db), user: User = Depends(require_roles(UserRole.teacher))):
    assignment = Assignment(**payload.model_dump(), teacher_id=user.id)
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment


@router.get("/{assignment_id}", response_model=AssignmentOut)
def get_assignment(assignment_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    assignment = db.get(Assignment, assignment_id)
    if not assignment:
        raise HTTPException(status_code=404, detail="Tapsırma tabılmadı")
    if user.role == UserRole.teacher and assignment.teacher_id != user.id:
        raise HTTPException(status_code=403, detail="Ruqsat joq")
    return assignment
