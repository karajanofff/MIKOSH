import { Bot, CheckCircle2, FileSearch, Save } from "lucide-react";
import { useState } from "react";

const result =
  "Student jumısında tapsırma mazmunı tiykarınan ashılǵan. Algoritm logikası durıs qurılǵan, biraq nátiyjeni shıǵarıw bóliminde ayırım qáteler bar. Kodtıń oqılıwı jaqsı, biraq túsindirme pikirler az. Usınıs etiletuǵın baha: 82 ball.";

export default function AIChecker({ onToast }) {
  const [checked, setChecked] = useState(false);
  const [grade, setGrade] = useState(82);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="glass rounded-2xl p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-3 text-white"><FileSearch size={24} /></div>
          <div>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">Student jumısın tekseriw</h3>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">AI analiz ushın demo forma</p>
          </div>
        </div>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">Jumıs mazmunı</span>
          <textarea className="input min-h-44 resize-none" defaultValue="Student algoritm boyınsha ámeliy jumıs orınladı, kod bólimin hám qısqa túsindirme jazdı." />
        </label>
        <label className="mt-4 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 text-center dark:border-emerald-500/40 dark:bg-emerald-500/10">
          <Bot className="mb-2 text-emerald-600 dark:text-emerald-300" size={32} />
          <span className="font-black text-slate-950 dark:text-white">Student faylın júklew</span>
          <input type="file" className="hidden" />
        </label>
        <button onClick={() => { setChecked(true); onToast("AI tekseriw nátiyjesi tayarlandı"); }} className="premium-button mt-5 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-black text-white shadow-lg">
          AI menen tekseriw
        </button>
      </section>

      <section className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-black text-slate-950 dark:text-white">AI tekseriw nátiyjesi</h3>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">Úlgi</span>
        </div>
        <div className={`mt-5 space-y-4 transition ${checked ? "opacity-100" : "opacity-70"}`}>
          <ResultBlock title="Jumıs mazmunı" text={result} />
          <div className="grid gap-4 md:grid-cols-2">
            <ResultBlock title="Qáteler" text="Nátiyjeni shıǵarıw bóliminde ayırım sintaksis hám logikalıq kemshilikler bar." />
            <ResultBlock title="Kúshli tárepleri" text="Algoritm izbe-izligi durıs, kod oqılıwı jaqsı, tiykarǵı másele ashılǵan." />
            <ResultBlock title="Álsiz tárepleri" text="Túsindirme pikirler az, tekseriw mısalları tolıq kórsetilmegen." />
            <ResultBlock title="Usınıs etilgen ball" text="82 ball" />
          </div>
          <label className="block rounded-2xl bg-white/60 p-4 dark:bg-white/5">
            <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">Oqıtıwshı tastıyıqlaytuǵın sońǵı baha</span>
            <input type="number" value={grade} onChange={(e) => setGrade(e.target.value)} className="input" />
          </label>
          <button onClick={() => onToast("Nátiyje saqlandı")} className="premium-button inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 font-black text-white dark:bg-white dark:text-slate-950">
            <Save size={18} /> Nátiyjeni saqlaw
          </button>
        </div>
      </section>
    </div>
  );
}

function ResultBlock({ title, text }) {
  return (
    <div className="rounded-2xl bg-white/60 p-4 dark:bg-white/5">
      <p className="mb-2 flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white"><CheckCircle2 size={16} className="text-emerald-500" /> {title}</p>
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

