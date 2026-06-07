export default function ChartBox({ title, children }) {
  return (
    <section className="glass rounded-2xl p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-black text-slate-950 dark:text-white">{title}</h3>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
          Talqılaw
        </span>
      </div>
      <div className="h-72">{children}</div>
    </section>
  );
}

