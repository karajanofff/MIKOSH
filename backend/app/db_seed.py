from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models import Group, StudentGroup, Subject, User, UserRole

DEFAULT_USERS = [
    ("Admin Paydalanıwshı", "admin@edu.uz", "admin123", UserRole.admin),
    ("Miyassar Rametullaeva", "teacher@edu.uz", "teacher123", UserRole.teacher),
    ("Aysulıw Tóreniyazova", "student@edu.uz", "student123", UserRole.student),
]


def _upsert_user(db, full_name: str, email: str, password: str, role: UserRole) -> User:
    user = db.query(User).filter(User.email == email).first()
    password_hash = hash_password(password)
    if user:
        user.full_name = full_name
        user.password_hash = password_hash
        user.role = role
    else:
        user = User(
            full_name=full_name,
            email=email,
            password_hash=password_hash,
            role=role,
        )
        db.add(user)
    db.flush()
    return user


def seed_database() -> None:
    db = SessionLocal()
    try:
        users = {}
        for full_name, email, password, role in DEFAULT_USERS:
            users[email] = _upsert_user(db, full_name, email, password, role)

        group = db.query(Group).filter(Group.name == "KT-31").first()
        if not group:
            group = Group(name="KT-31", description="Kásiplik pánler toparı")
            db.add(group)
            db.flush()

        student = users["student@edu.uz"]
        link = (
            db.query(StudentGroup)
            .filter(StudentGroup.student_id == student.id, StudentGroup.group_id == group.id)
            .first()
        )
        if not link:
            db.add(StudentGroup(student_id=student.id, group_id=group.id))

        teacher = users["teacher@edu.uz"]
        for subject_name in ("Programmalastırıw tiykarları", "Web texnologiyalar"):
            exists = (
                db.query(Subject)
                .filter(Subject.name == subject_name, Subject.teacher_id == teacher.id)
                .first()
            )
            if not exists:
                db.add(Subject(name=subject_name, teacher_id=teacher.id))

        db.commit()
        print("Seed tayar: admin@edu.uz/admin123, teacher@edu.uz/teacher123, student@edu.uz/student123")
    finally:
        db.close()
