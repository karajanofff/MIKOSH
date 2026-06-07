import { ArrowUpRight } from "lucide-react";

export default function StatCard({ title, value, change, tone, icon: Icon }) {
  return (
    <div className="glass group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{value}</h3>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br ${tone} p-3 text-white shadow-lg`}>
          {Icon ? <Icon size={22} /> : <ArrowUpRight size={22} />}
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
        <ArrowUpRight size={16} />
        <span>{change}</span>
      </div>
    </div>
  );
}

