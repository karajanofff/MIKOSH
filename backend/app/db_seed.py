from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models import Group, StudentGroup, Subject, User, UserRole


def seed_database() -> None:
    db = SessionLocal()
    try:
        if db.query(User).count():
            return

        admin = User(
            full_name="Admin Paydalanıwshı",
            email="admin@edu.uz",
            password_hash=hash_password("admin123"),
            role=UserRole.admin,
        )
        teacher = User(
            full_name="Miyassar Rametullaeva",
            email="teacher@edu.uz",
            password_hash=hash_password("teacher123"),
            role=UserRole.teacher,
        )
        student = User(
            full_name="Aysulıw Tóreniyazova",
            email="student@edu.uz",
            password_hash=hash_password("student123"),
            role=UserRole.student,
        )
        db.add_all([admin, teacher, student])
        db.flush()

        group = Group(name="KT-31", description="Kásiplik pánler toparı")
        db.add(group)
        db.flush()
        db.add(StudentGroup(student_id=student.id, group_id=group.id))
        db.add_all([
            Subject(name="Programmalastırıw tiykarları", teacher_id=teacher.id),
            Subject(name="Web texnologiyalar", teacher_id=teacher.id),
        ])
        db.commit()
        print("Seed tayar: admin@edu.uz/admin123, teacher@edu.uz/teacher123, student@edu.uz/student123")
    finally:
        db.close()
