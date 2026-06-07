from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies import get_current_user
from app.models import Assignment, Submission, User, UserRole

router = APIRouter(prefix="/statistics", tags=["statistics"])


@router.get("")
def statistics(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if user.role == UserRole.teacher:
        assignments = db.query(Assignment).filter(Assignment.teacher_id == user.id).count()
        submissions = db.query(Submission).join(Assignment).filter(Assignment.teacher_id == user.id).count()
    elif user.role == UserRole.student:
        assignments = 0
        submissions = db.query(Submission).filter(Submission.student_id == user.id).count()
    else:
        assignments = db.query(Assignment).count()
        submissions = db.query(Submission).count()
    checked = db.query(Submission).filter(Submission.ai_score.isnot(None)).count()
    return {
        "tapsirmalar": assignments,
        "juwaplar": submissions,
        "ai_tekserilgen": checked,
    }
