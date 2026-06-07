import "dotenv/config";
import cors from "cors";
import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import multer from "multer";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT || 5050);
const uploadDir = path.join(process.cwd(), "uploads");

await fs.mkdir(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_request, file, callback) => {
    const safeName = file.originalname.replace(/[^\w.\-]+/g, "_");
    callback(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, ai: Boolean(openai) });
});

app.post("/api/analyze", upload.single("file"), async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).json({ ok: false, message: "Fayl júklenbedi" });
    }

    const fileText = await readUploadAsText(request.file.path);
    if (!fileText.trim()) {
      return response.status(400).json({ ok: false, message: "Fayl mazmunın oqıw múmkin bolmadı" });
    }

    if (!openai) {
      return response.status(503).json({
        ok: false,
        message: "OPENAI_API_KEY tabılmadı. .env faylına API giltin qosıń.",
        uploadedFile: request.file.originalname,
      });
    }

    const prompt = `
Sen masafalıq tálim platformasındaǵı qaraqalpaq tilinde juwap beretuǵın AI tekseriwshi járdemshisiń.
Student jumısın akademiyalıq rubrika boyınsha talqıla.

Qaytarıw formati:
1. Jumıs mazmunı
2. Qáteler
3. Kúshli tárepleri
4. Álsiz tárepleri
5. Usınıs etilgen ball
6. Oqıtıwshı ushın qısqa pikir

Fayl atı: ${request.file.originalname}
Student: ${request.body.student || "Aysulıw Tóreniyazova"}
Pán: ${request.body.subject || "Programmalastırıw tiykarları"}

Student jumısı:
${fileText.slice(0, 12000)}
`;

    const result = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: prompt,
    });

    response.json({
      ok: true,
      fileName: request.file.originalname,
      analysis: result.output_text,
    });
  } catch (error) {
    response.status(500).json({ ok: false, message: error.message || "AI tekseriw qátesi" });
  }
});

app.post("/api/teacher/assignments", upload.single("file"), async (request, response) => {
  if (!request.file) {
    return response.status(400).json({ ok: false, message: "Tapsırma faylı júklenbedi" });
  }

  response.json({
    ok: true,
    title: request.body.title || "Jańa tapsırma",
    description: request.body.description || "",
    fileName: request.file.originalname,
    message: "Tapsırma faylı serverge saqlandı hám studentlerge jiberildi",
  });
});

async function readUploadAsText(filePath) {
  const buffer = await fs.readFile(filePath);
  return buffer.toString("utf8").replace(/\0/g, "").trim();
}

app.listen(port, () => {
  console.log(`AI backend http://127.0.0.1:${port} mánzilinde islep tur`);
});
