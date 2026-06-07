import { rubric } from "../data/demoData";

export default function Assessment() {
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-2xl font-black text-slate-950 dark:text-white">Rubrika boyınsha bahalaw sisteması</h2>
      <div className="mt-6 space-y-5">
        {rubric.map((item) => (
          <div key={item.name} className="rounded-2xl bg-white/60 p-4 dark:bg-white/5">
            <div className="mb-2 flex justify-between gap-4 text-sm font-black text-slate-700 dark:text-slate-200">
              <span>{item.name}</span><span>{item.value} ball</span>
            </div>
            <div className="h-4 rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600" style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

