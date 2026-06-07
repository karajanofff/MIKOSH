from datetime import datetime
from enum import Enum
from typing import Optional
from sqlalchemy import DateTime, Enum as SqlEnum, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class UserRole(str, Enum):
    admin = "admin"
    teacher = "teacher"
    student = "student"


class AssignmentType(str, Enum):
    test = "test"
    written = "written"
    coding = "coding"


class AssignmentStatus(str, Enum):
    draft = "draft"
    sent = "sent"
    closed = "closed"


class SubmissionStatus(str, Enum):
    submitted = "submitted"
    ai_checked = "ai_checked"
    teacher_confirmed = "teacher_confirmed"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    full_name: Mapped[str] = mapped_column(String(180))
    email: Mapped[str] = mapped_column(String(180), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[UserRole] = mapped_column(SqlEnum(UserRole))
    status: Mapped[str] = mapped_column(String(30), default="active")

    subjects = relationship("Subject", back_populates="teacher")
    submissions = relationship("Submission", back_populates="student")


class Group(Base):
    __tablename__ = "groups"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    students = relationship("StudentGroup", back_populates="group")
    assignments = relationship("Assignment", back_populates="group")


class Subject(Base):
    __tablename__ = "subjects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(180))
    teacher_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    teacher = relationship("User", back_populates="subjects")
    assignments = relationship("Assignment", back_populates="subject")


class StudentGroup(Base):
    __tablename__ = "student_groups"
    __table_args__ = (UniqueConstraint("student_id", "group_id"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"))

    group = relationship("Group", back_populates="students")
    student = relationship("User")


class Assignment(Base):
    __tablename__ = "assignments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(220))
    description: Mapped[str] = mapped_column(Text)
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"))
    teacher_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"))
    assignment_type: Mapped[AssignmentType] = mapped_column(SqlEnum(AssignmentType))
    max_score: Mapped[int] = mapped_column(Integer, default=100)
    rubric: Mapped[str] = mapped_column(Text, default="")
    deadline: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    status: Mapped[AssignmentStatus] = mapped_column(SqlEnum(AssignmentStatus), default=AssignmentStatus.draft)

    subject = relationship("Subject", back_populates="assignments")
    group = relationship("Group", back_populates="assignments")
    teacher = relationship("User")
    questions = relationship("Question", back_populates="assignment", cascade="all, delete-orphan")
    submissions = relationship("Submission", back_populates="assignment")


class Question(Base):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    assignment_id: Mapped[int] = mapped_column(ForeignKey("assignments.id"))
    question_text: Mapped[str] = mapped_column(Text)
    option_a: Mapped[str] = mapped_column(Text)
    option_b: Mapped[str] = mapped_column(Text)
    option_c: Mapped[str] = mapped_column(Text)
    option_d: Mapped[str] = mapped_column(Text)
    correct_answer: Mapped[str] = mapped_column(String(1))
    score: Mapped[int] = mapped_column(Integer, default=1)

    assignment = relationship("Assignment", back_populates="questions")


class Submission(Base):
    __tablename__ = "submissions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    assignment_id: Mapped[int] = mapped_column(ForeignKey("assignments.id"))
    student_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    answer_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    code_answer: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    submitted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    ai_score: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    teacher_score: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    final_score: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    ai_feedback: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    teacher_comment: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[SubmissionStatus] = mapped_column(SqlEnum(SubmissionStatus), default=SubmissionStatus.submitted)

    assignment = relationship("Assignment", back_populates="submissions")
    student = relationship("User", back_populates="submissions")
