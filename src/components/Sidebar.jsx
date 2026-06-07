import { BarChart3, BookOpen, Bot, CheckSquare, ClipboardList, GraduationCap, Home, Menu, Settings, SlidersHorizontal, UserCog, Users, X } from "lucide-react";

const platformTitle = "«INJENERLIK PEDAGOGIKA» KАFEDRАSI Professor-oqıtıwshıları ushın";

const baseItems = [
  { key: "home", label: "Bas bet", icon: Home },
  { key: "dashboard", label: "Dashboard", icon: BarChart3 },
  { key: "teacherPanel", label: "Oqıtıwshı paneli", icon: UserCog },
  { key: "studentPanel", label: "Student paneli", icon: GraduationCap },
  { key: "courses", label: "Pánler", icon: BookOpen },
  { key: "assignments", label: "Tapsırmalar", icon: ClipboardList },
  { key: "ai", label: "AI tekseriw", icon: Bot },
  { key: "students", label: "Studentler", icon: GraduationCap },
  { key: "users", label: "Paydalanıwshılar", icon: Users },
  { key: "assessment", label: "Bahalaw", icon: CheckSquare },
  { key: "statistics", label: "Statistika", icon: SlidersHorizontal },
  { key: "settings", label: "Sazlawlar", icon: Settings },
];

const roleMenus = {
  Student: ["home", "studentPanel", "courses", "assessment", "settings"],
  Oqıtıwshı: ["home", "teacherPanel", "courses", "assignments", "ai", "students", "assessment", "statistics", "settings"],
  Administrator: ["home", "dashboard", "users", "statistics", "settings"],
};

export default function Sidebar({ active, setActive, open, setOpen, role }) {
  const allowed = role ? roleMenus[role] : ["home"];
  const items = baseItems.filter((item) => allowed.includes(item.key));

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed left-4 top-4 z-50 rounded-2xl bg-emerald-700 p-3 text-white shadow-xl lg:hidden">
        <Menu size={20} />
      </button>
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-emerald-100 bg-white/90 p-4 shadow-2xl backdrop-blur-2xl transition lg:translate-x-0 dark:border-white/10 dark:bg-emerald-950/75 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-lg font-black text-white shadow-lg">AI</div>
            <div>
              <h1 className="text-sm font-black leading-5 text-slate-950 dark:text-white">{platformTitle}</h1>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{role || "Kiriw kerek"}</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-xl p-2 text-slate-500 lg:hidden"><X size={20} /></button>
        </div>
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20"
                    : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
      {open && <button aria-label="Jabıw" onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" />}
    </>
  );
}
