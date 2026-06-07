import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { courses } from "../data/demoData";

export default function AssignmentForm({ onToast, onCreate }) {
  const [form, setForm] = useState({ title: "", subject: courses[0].name, description: "", deadline: "", max: "100" });
  const [file, setFile] = useState(null);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!file) {
          onToast("Tapsırma faylın tańlań");
          return;
        }
        const assignment = {
          id: Date.now(),
          title: form.title || "Jańa tapsırma",
          description: form.description || "Tapsırma faylı menen tanısıń.",
          subject: form.subject,
          maxScore: form.max,
          file,
          fileName: file.name,
          fileUrl: URL.createObjectURL(file),
        };
        onCreate(assignment);
        onToast("Tapsırma studentlerge jiberildi");
        setForm({ title: "", subject: courses[0].name, description: "", deadline: "", max: "100" });
        setFile(null);
      }}
      className="glass rounded-2xl p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Tapsırma atı">
          <input value={form.title} onChange={(e) => update("title", e.target.value)} className="input" placeholder="Ámeliy jumıs atı" />
        </Field>
        <Field label="Pán tańlaw">
          <select value={form.subject} onChange={(e) => update("subject", e.target.value)} className="input">
            {courses.map((course) => <option key={course.name}>{course.name}</option>)}
          </select>
        </Field>
        <Field label="Muddet">
          <input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} className="input" />
        </Field>
        <Field label="Maksimal ball">
          <input type="number" value={form.max} onChange={(e) => update("max", e.target.value)} className="input" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Tapsırma túsindirmesi">
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="input min-h-32 resize-none" placeholder="Tapsırma mazmunın kiritiń" />
          </Field>
        </div>
        <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 text-center transition hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 md:col-span-2">
          <UploadCloud className="mb-3 text-emerald-600 dark:text-emerald-300" size={34} />
          <span className="font-black text-slate-950 dark:text-white">{file ? file.name : "Fayl júklew maydanı"}</span>
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Qosımsha materiallardı tańlań</span>
          <input type="file" className="hidden" onChange={(event) => setFile(event.target.files?.[0] || null)} />
        </label>
      </div>
      <button className="premium-button mt-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-black text-white shadow-lg">
        Studentlerge jiberiw
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">{label}</span>
      {children}
    </label>
  );
}

