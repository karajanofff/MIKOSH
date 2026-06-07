import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies import get_current_user, require_roles
from app.models import Assignment, Submission, SubmissionStatus, User, UserRole
from app.schemas import ConfirmGradeIn, SubmissionIn, SubmissionOut
from app.services.ai_checker import check_submission_with_ai

router = APIRouter(prefix="/submissions", tags=["submissions"])


@router.get("", response_model=list[SubmissionOut])
def list_submissions(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if user.role == UserRole.student:
        return db.query(Submission).filter(Submission.student_id == user.id).all()
    if user.role == UserRole.teacher:
        return db.query(Submission).join(Assignment).filter(Assignment.teacher_id == user.id).all()
    return db.query(Submission).all()


@router.post("", response_model=SubmissionOut)
def create_submission(payload: SubmissionIn, db: Session = Depends(get_db), user: User = Depends(require_roles(UserRole.student))):
    submission = Submission(**payload.model_dump(), student_id=user.id)
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@router.post("/{submission_id}/ai-check", response_model=SubmissionOut)
def ai_check_submission(submission_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    submission = db.get(Submission, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Juwap tabılmadı")
    if user.role == UserRole.student and submission.student_id != user.id:
        raise HTTPException(status_code=403, detail="Tek óz juwabıńızdı kóre alasız")
    result = check_submission_with_ai(submission.assignment, submission)
    submission.ai_score = result["score"]
    submission.final_score = result["score"]
    submission.ai_feedback = json.dumps(result, ensure_ascii=False)
    submission.status = SubmissionStatus.ai_checked
    db.commit()
    db.refresh(submission)
    return submission


@router.post("/{submission_id}/confirm-grade", response_model=SubmissionOut)
def confirm_grade(submission_id: int, payload: ConfirmGradeIn, db: Session = Depends(get_db), user: User = Depends(require_roles(UserRole.teacher))):
    submission = db.get(Submission, submission_id)
    if not submission or submission.assignment.teacher_id != user.id:
        raise HTTPException(status_code=404, detail="Juwap tabılmadı")
    submission.teacher_score = payload.teacher_score
    submission.final_score = payload.teacher_score
    submission.teacher_comment = payload.teacher_comment
    submission.status = SubmissionStatus.teacher_confirmed
    db.commit()
    db.refresh(submission)
    return submission
