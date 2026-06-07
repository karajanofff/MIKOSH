from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.submissions import ai_check_submission
from app.core.database import get_db
from app.dependencies import get_current_user
from app.models import User

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/check-submission/{submission_id}")
def check_submission(submission_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return ai_check_submission(submission_id=submission_id, db=db, user=user)
