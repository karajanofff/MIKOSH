# «INJENERLIK PEDAGOGIKA» KАFEDRАSI Professor-oqıtıwshıları ushın

Qaraqalpaq tilindegi masafalıq tálim platforması. Oqıtıwshı tapsırma/test jaratadı, student juwap jiberedi, AI juwaptı rubrika boyınsha tekseredi, oqıtıwshı juwmaqlawshı bahasın tastıyıqlaydı.

## Texnologiyalar

- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI
- Database: PostgreSQL
- Authentication: JWT
- AI tekseriw: OpenAI API

## Papka strukturası

```txt
backend/
  app/
    api/
    core/
    services/
    main.py
    models.py
    schemas.py
  seed.py
  requirements.txt
src/
  components/
  pages/
  services/api.js
```

## Backend .env

`backend/.env.example` faylın `backend/.env` etip kóshirip, toltırıń:

```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/ai_tapsirma_platformasi
JWT_SECRET_KEY=change-this-secret
OPENAI_API_KEY=sk-your-api-key
OPENAI_MODEL=gpt-4.1-mini
```

API key kod ishinde saqlanbaydı, tek `.env` faylında turadı.

## Database tayarlaw

PostgreSQL-da baza jaratıń:

```bash
createdb ai_tapsirma_platformasi
```

Backend birinshi iske túsirilgende kesteler avtomat jaratıladı.

## Backend iske túsiriw

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Seed maǵlıwmat qosıw:

```bash
python seed.py
```

Seed loginleri:

- Admin: `admin@edu.uz` / `admin123`
- Oqıtıwshı: `teacher@edu.uz` / `teacher123`
- Student: `student@edu.uz` / `student123`

## Frontend .env

Repo túbirindegi `.env.example` faylın `.env` etip kóshirip:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Frontend iske túsiriw

```bash
npm install
npm run dev
```

Frontend: `http://127.0.0.1:5173`

## Tiykarǵı API endpointler

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET/POST /api/groups`
- `GET/POST /api/subjects`
- `GET/POST /api/assignments`
- `POST /api/questions`
- `GET/POST /api/submissions`
- `POST /api/submissions/{id}/ai-check`
- `POST /api/submissions/{id}/confirm-grade`
- `POST /api/ai/check-submission/{id}`
- `POST /api/teacher/confirm-grade/{id}`
- `GET /api/statistics`

## AI tekseriw qaǵıydası

AI tekseriw endpointi tapsırma, rubrika, maksimal ball hám student juwabın bazadan aladı. Prompt qatań túrde:

```txt
Oqıtıwshı tapsırması: ...
Bahalaw kriteriyleri: ...
Maksimal ball: ...
Student juwabı: ...
Tek usı maǵlıwmatlarǵa súyenip bahala. Ózińnen jańa fakt qospa.
```

AI JSON qaytaradı:

```json
{
  "score": 0,
  "max_score": 100,
  "summary": "Qısqasha bahalaw",
  "mistakes": ["qáte 1"],
  "recommendations": ["usınıs 1"],
  "teacher_note": "Oqıtıwshı ushın izoh"
}
```

## Qáwipsizlik

- JWT login qollanıladı.
- Student tek óz juwapların kóredi.
- Oqıtıwshı tek óz tapsırmaları hám student juwapların kóredi.
- Admin ulıwma basqarıw múmkinshiligine iye.
- OpenAI API key frontendke shıqpaydı.
