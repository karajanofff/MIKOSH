import { Bell, Lock, Palette } from "lucide-react";

export default function Settings({ darkMode, setDarkMode, onToast }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Setting icon={Palette} title="Kórinis rejimi" text="Platformanıń jarıq hám qara rejimin basqarıw.">
        <button onClick={() => setDarkMode(!darkMode)} className="premium-button mt-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 font-black text-white">
          {darkMode ? "Jarıq rejim" : "Qara rejim"}
        </button>
      </Setting>
      <Setting icon={Bell} title="Bildiriwler" text="Tapsırma, baha hám AI analiz boyınsha bildiriwler.">
        <button onClick={() => onToast("Bildiriw sazlawı jańalandı")} className="premium-button mt-4 rounded-2xl bg-white px-5 py-3 font-black text-slate-950 dark:bg-white/10 dark:text-white">
          Jańalaw
        </button>
      </Setting>
      <Setting icon={Lock} title="Qáwipsizlik" text="Paydalanıwshı húqıqı hám kiriw baqlaw sazlawları.">
        <button onClick={() => onToast("Qáwipsizlik sazlawı saqlandı")} className="premium-button mt-4 rounded-2xl bg-white px-5 py-3 font-black text-slate-950 dark:bg-white/10 dark:text-white">
          Saqlaw
        </button>
      </Setting>
    </div>
  );
}

function Setting({ icon: Icon, title, text, children }) {
  return (
    <section className="glass rounded-2xl p-6">
      <div className="mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-3 text-white w-fit"><Icon size={24} /></div>
      <h3 className="text-xl font-black text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
      {children}
    </section>
  );
}

