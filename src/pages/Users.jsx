import UserCard from "../components/UserCard";
import { users } from "../data/demoData";

export default function Users() {
  return (
    <div className="space-y-6">
      <UserCard user={users[0]} />
      <div className="grid gap-5 lg:grid-cols-2">
        {users.map((user) => (
          <div key={user.name} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-xl font-black text-white">{user.avatar}</div>
              <div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">{user.name}</h3>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{user.role} · {user.subject}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-white/60 text-sm text-slate-500 dark:bg-white/5 dark:text-slate-300">
              <tr>{["Atı-jóni", "Roli", "Pán", "Status", "Baylanıs mánzili", "Sońǵı kiriw"].map((head) => <th key={head} className="px-5 py-4 font-black">{head}</th>)}</tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.name} className="border-t border-slate-200/70 dark:border-white/10">
                  <td className="px-5 py-4 font-black text-slate-950 dark:text-white">{user.name}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">{user.role}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">{user.subject}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">{user.status}</span></td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">{user.contact}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">{user.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

