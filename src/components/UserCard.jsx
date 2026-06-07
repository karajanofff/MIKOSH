import { Award, Clock, Mail, ShieldCheck } from "lucide-react";

export default function UserCard({ user }) {
  return (
    <article className="glass overflow-hidden rounded-2xl">
      <div className="h-24 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />
      <div className="-mt-10 p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-slate-950 text-3xl font-black text-white shadow-xl dark:border-slate-900">
              {user.avatar}
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
                <ShieldCheck size={14} /> {user.status}
              </span>
              <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{user.name}</h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{user.role}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Info icon={Award} label="Pán" value={user.subject} />
          <Info icon={Clock} label="Sońǵı kiriw waqtı" value={user.lastSeen} />
          <Info icon={Mail} label="Baylanıs mánzili" value={user.contact} />
        </div>
      </div>
    </article>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/60 p-4 dark:bg-white/5">
      <p className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
        <Icon size={15} /> {label}
      </p>
      <p className="mt-2 break-words text-sm font-black text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}

