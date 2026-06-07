from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.submissions import confirm_grade
from app.core.database import get_db
from app.dependencies import require_roles
from app.models import User, UserRole
from app.schemas import ConfirmGradeIn

router = APIRouter(prefix="/teacher", tags=["teacher"])


@router.post("/confirm-grade/{submission_id}")
def teacher_confirm_grade(
    submission_id: int,
    payload: ConfirmGradeIn,
    db: Session = Depends(get_db),
    user: User = Depends(require_roles(UserRole.teacher)),
):
    return confirm_grade(submission_id=submission_id, payload=payload, db=db, user=user)
