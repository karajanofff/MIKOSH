from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies import require_roles
from app.models import Assignment, Question, User, UserRole
from app.schemas import QuestionIn, QuestionOut

router = APIRouter(prefix="/questions", tags=["questions"])


@router.post("", response_model=QuestionOut)
def create_question(payload: QuestionIn, db: Session = Depends(get_db), user: User = Depends(require_roles(UserRole.teacher))):
    assignment = db.get(Assignment, payload.assignment_id)
    if not assignment or assignment.teacher_id != user.id:
        raise HTTPException(status_code=403, detail="Bul tapsırmaǵa soraw qosıwǵa ruqsat joq")
    question = Question(**payload.model_dump())
    db.add(question)
    db.commit()
    db.refresh(question)
    return question
