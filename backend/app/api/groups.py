from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies import require_roles
from app.models import Group, UserRole
from app.schemas import GroupIn, GroupOut

router = APIRouter(prefix="/groups", tags=["groups"])


@router.get("", response_model=list[GroupOut])
def list_groups(db: Session = Depends(get_db), _=Depends(require_roles(UserRole.admin, UserRole.teacher))):
    return db.query(Group).all()


@router.post("", response_model=GroupOut)
def create_group(payload: GroupIn, db: Session = Depends(get_db), _=Depends(require_roles(UserRole.admin))):
    group = Group(**payload.model_dump())
    db.add(group)
    db.commit()
    db.refresh(group)
    return group
