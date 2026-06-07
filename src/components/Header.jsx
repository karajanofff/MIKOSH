import { Bell, LogIn, LogOut, Moon, Search, Sun, UserPlus } from "lucide-react";

const platformTitle = "«INJENERLIK PEDAGOGIKA» KАFEDRАSI Professor-oqıtıwshıları ushın";

export default function Header({ search, setSearch, darkMode, setDarkMode, openAuth, role, onLogout }) {
  return (
    <header className="sticky top-0 z-20 mb-6 border-b border-emerald-100 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-2xl lg:px-8 dark:border-white/10 dark:bg-emerald-950/70">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{platformTitle}</p>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">Oqıw basqarıw ortalıǵı</h2>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <label className="relative hidden flex-1 md:block md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Izlew..."
              className="h-12 w-full rounded-2xl border border-emerald-100 bg-white pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition focus:ring-4 focus:ring-emerald-200 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus:ring-emerald-500/20"
            />
          </label>
          {role ? (
            <button onClick={onLogout} className="premium-button inline-flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-emerald-700 shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-emerald-200">
              <LogOut size={17} /> Shıǵıw
            </button>
          ) : (
            <>
              <button onClick={() => openAuth("login")} className="premium-button inline-flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-emerald-700 shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-emerald-200">
                <LogIn size={17} /> Kiriw
              </button>
              <button onClick={() => openAuth("register")} className="premium-button inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-black text-white shadow-lg">
                <UserPlus size={17} /> Dizimnen ótiw
              </button>
            </>
          )}
          <button onClick={() => setDarkMode(!darkMode)} className="grid h-12 w-12 place-items-center rounded-2xl bg-white/75 text-slate-700 shadow-lg transition hover:-translate-y-0.5 dark:bg-white/10 dark:text-white">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white/75 text-slate-700 shadow-lg transition hover:-translate-y-0.5 dark:bg-white/10 dark:text-white">
            <Bell size={20} />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-rose-500" />
          </button>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 font-black text-white shadow-lg">
            {role ? role.slice(0, 2).toUpperCase() : "MR"}
          </div>
        </div>
      </div>
    </header>
  );
}
