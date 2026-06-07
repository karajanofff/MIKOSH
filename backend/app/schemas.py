from datetime import datetime
from pydantic import BaseModel, EmailStr
from app.models import AssignmentStatus, AssignmentType, SubmissionStatus, UserRole


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole
    full_name: str


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class RegisterIn(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: UserRole


class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: UserRole
    status: str

    class Config:
        from_attributes = True


class GroupIn(BaseModel):
    name: str
    description: str | None = None


class GroupOut(GroupIn):
    id: int

    class Config:
        from_attributes = True


class SubjectIn(BaseModel):
    name: str
    teacher_id: int | None = None


class SubjectOut(BaseModel):
    id: int
    name: str
    teacher_id: int

    class Config:
        from_attributes = True


class AssignmentIn(BaseModel):
    title: str
    description: str
    subject_id: int
    group_id: int
    assignment_type: AssignmentType
    max_score: int = 100
    rubric: str = ""
    deadline: datetime | None = None
    status: AssignmentStatus = AssignmentStatus.sent


class AssignmentOut(BaseModel):
    id: int
    title: str
    description: str
    subject_id: int
    teacher_id: int
    group_id: int
    assignment_type: AssignmentType
    max_score: int
    rubric: str
    deadline: datetime | None
    status: AssignmentStatus

    class Config:
        from_attributes = True


class QuestionIn(BaseModel):
    assignment_id: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str
    score: int = 1


class QuestionOut(QuestionIn):
    id: int

    class Config:
        from_attributes = True


class SubmissionIn(BaseModel):
    assignment_id: int
    answer_text: str | None = None
    code_answer: str | None = None


class SubmissionOut(BaseModel):
    id: int
    assignment_id: int
    student_id: int
    answer_text: str | None
    code_answer: str | None
    ai_score: int | None
    teacher_score: int | None
    final_score: int | None
    ai_feedback: str | None
    teacher_comment: str | None
    status: SubmissionStatus

    class Config:
        from_attributes = True


class ConfirmGradeIn(BaseModel):
    teacher_score: int
    teacher_comment: str | None = None


class AICheckResult(BaseModel):
    score: int
    max_score: int
    summary: str
    mistakes: list[str]
    recommendations: list[str]
    teacher_note: str
