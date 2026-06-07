import json
from openai import OpenAI
from app.core.config import get_settings
from app.models import Assignment, Submission


def build_prompt(assignment: Assignment, submission: Submission) -> str:
    student_answer = submission.code_answer or submission.answer_text or ""
    return f"""
Oqıtıwshı tapsırması: {assignment.description}
Bahalaw kriteriyleri: {assignment.rubric}
Maksimal ball: {assignment.max_score}
Student juwabı: {student_answer}

Tek usı maǵlıwmatlarǵa súyenip bahala. Ózińnen jańa fakt qospa. Ball anıq bolıwı kerek. Juwap Qaraqalpaq tilinde bolıwı kerek.
Tek JSON qaytar:
{{
  "score": 0,
  "max_score": {assignment.max_score},
  "summary": "Qısqasha bahalaw",
  "mistakes": ["qáte 1"],
  "recommendations": ["usınıs 1"],
  "teacher_note": "Oqıtıwshı ushın izoh"
}}
"""


def check_submission_with_ai(assignment: Assignment, submission: Submission) -> dict:
    settings = get_settings()
    if not settings.openai_api_key:
        raise RuntimeError("OPENAI_API_KEY .env faylında kórsetilmegen")

    client = OpenAI(api_key=settings.openai_api_key)
    response = client.responses.create(
        model=settings.openai_model,
        input=build_prompt(assignment, submission),
    )
    text = response.output_text.strip()
    if text.startswith("```"):
        text = text.strip("`").replace("json", "", 1).strip()
    return json.loads(text)
