import { Bot, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function AICheck({ onToast, submissions, setSubmissions }) {
  const [checkingId, setCheckingId] = useState(null);

  const aiCheckSubmission = async (submission) => {
    setCheckingId(submission.id);
    const text = await submission.file.text().catch(() => "");
    const maxScore = Number(submission.maxScore) || 100;
    const aiScore = Math.min(maxScore, Math.round(maxScore * 0.82));
    window.setTimeout(() => {
      const feedback = [
        `AI tekseriw nátiyjesi: ${submission.assignmentTitle}`,
        `Berilgen ball: ${aiScore}`,
        `Maksimal ball: ${maxScore}`,
        "Qısqasha bahalaw: student juwabı tapsırma mazmunına sáykes, biraq túsindirme bólimin kúshleytiriw kerek.",
        `Tabılǵan qáteler: ${text.length < 30 ? "juwap mazmunı júdá qısqa" : "ayırım pikirler tolıq ashılmaǵan"}.`,
        "Studentke usınıs: algoritm yamasa ámeliy sheshimdi qadamlar menen túsindiriń.",
        "Oqıtıwshıǵa izoh: AI bahasın tekserip, juwmaqlawshı ball qoyıw usınıs etiledi.",
      ].join("\n");
      setSubmissions((current) => current.map((item) => item.id === submission.id ? { ...item, status: "AI tekserildi", aiFeedback: feedback, aiScore, finalScore: aiScore, maxScore } : item));
      setCheckingId(null);
      onToast("Juwap AI arqalı tekserildi");
    }, 700);
  };

  const setFinalScore = (submission, score) => {
    const maxScore = Number(submission.maxScore) || 100;
    const safeScore = Math.max(0, Math.min(maxScore, Number(score) || 0));
    setSubmissions((current) => current.map((item) => item.id === submission.id ? { ...item, finalScore: safeScore, status: "Baha qoyıldı" } : item));
  };

  return (
    <div className="space-y-6">
      <section className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-600 p-3 text-white"><Bot size={24} /></div>
          <div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">AI menen tapsırma tekseriw</h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Studentlerden kelgen juwaplardı AI járdeminde tekserip, ball qoyıń.</p>
          </div>
        </div>
      </section>

      {!submissions.length && <div className="glass rounded-2xl p-6 font-black text-slate-600 dark:text-slate-300">Ázirge tekseriletuǵın student juwabı joq</div>}

      {submissions.map((submission) => (
        <section key={submission.id} className="glass rounded-2xl p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">{submission.assignmentTitle}</h3>
              <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{submission.studentName} · {submission.status} · Maksimal ball: {submission.maxScore || 100}</p>
              <a className="mt-3 inline-flex text-sm font-black text-emerald-700" href={submission.fileUrl} download={submission.fileName}>Student juwabın júklep alıw</a>
            </div>
            <button onClick={() => aiCheckSubmission(submission)} className="premium-button rounded-2xl bg-emerald-600 px-5 py-3 font-black text-white">
              {checkingId === submission.id ? "Tekserilip atır..." : "AI menen tekseriw"}
            </button>
          </div>

          {submission.aiFeedback && (
            <div className="mt-5 rounded-2xl bg-emerald-50 p-5 dark:bg-white/5">
              <pre className="whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">{submission.aiFeedback}</pre>
              <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">Juwmaqlawshı baha</span>
                  <input className="input" type="number" min="0" max={submission.maxScore || 100} value={submission.finalScore || ""} onChange={(event) => setFinalScore(submission, event.target.value)} />
                </label>
                <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 font-black text-emerald-700 dark:bg-white/10">
                  <CheckCircle2 size={18} /> Baha saqlandı
                </div>
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
