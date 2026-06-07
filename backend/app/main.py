from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import ai, assignments, auth, groups, questions, statistics, subjects, submissions, teacher
from app.core.config import get_settings
from app.core.database import Base, engine


settings = get_settings()
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI járdeminde tapsırma tekseriwshi platforma")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(groups.router, prefix="/api")
app.include_router(subjects.router, prefix="/api")
app.include_router(assignments.router, prefix="/api")
app.include_router(questions.router, prefix="/api")
app.include_router(submissions.router, prefix="/api")
app.include_router(ai.router, prefix="/api")
app.include_router(teacher.router, prefix="/api")
app.include_router(statistics.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"ok": True, "ai": bool(settings.openai_api_key)}
