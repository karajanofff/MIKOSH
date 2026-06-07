import { ArrowRight, Bot, CheckCircle2, Play, Sparkles, UploadCloud, UserPlus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AICheck from "./pages/AICheck";
import Assessment from "./pages/Assessment";
import Assignments from "./pages/Assignments";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import Students from "./pages/Students";
import UsersPage from "./pages/Users";
import { authApi, clearToken, mapApiRole, saveToken } from "./services/api";

const accounts = {
  Student: { email: "student@edu.uz", password: "student123", home: "studentPanel" },
  Oqıtıwshı: { email: "teacher@edu.uz", password: "teacher123", home: "teacherPanel" },
  Administrator: { email: "admin@edu.uz", password: "admin123", home: "users" },
};

export default function App() {
  const [active, setActive] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const [currentRole, setCurrentRole] = useState("");
  const [teacherAssignments, setTeacherAssignments] = useState([]);
  const [studentSubmissions, setStudentSubmissions] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const loginAs = (role) => {
    setCurrentRole(role);
    setActive(accounts[role].home);
  };

  const logout = () => {
    clearToken();
    setCurrentRole("");
    setActive("home");
    showToast("Platformadan shıqtıńız");
  };

  const pageTitle = useMemo(() => ({
    home: "Bas bet",
    dashboard: "Dashboard",
    teacherPanel: "Oqıtıwshı paneli",
    studentPanel: "Student paneli",
    courses: "Pánler",
    assignments: "Tapsırmalar",
    ai: "AI tekseriw",
    students: "Studentler",
    users: "Paydalanıwshılar",
    assessment: "Bahalaw",
    statistics: "Statistika",
    settings: "Sazlawlar",
  }[active]), [active]);

  const pages = {
    home: <HomePage openAuth={setAuthModal} setModal={setModal} />,
    dashboard: <Dashboard />,
    teacherPanel: <TeacherPanel submissions={studentSubmissions} setActive={setActive} />,
    studentPanel: <StudentPanel onToast={showToast} assignments={teacherAssignments} setSubmissions={setStudentSubmissions} />,
    courses: <Courses onToast={showToast} role={currentRole} assignments={teacherAssignments} submissions={studentSubmissions} />,
    assignments: <Assignments onToast={showToast} setAssignments={setTeacherAssignments} />,
    ai: <AICheck onToast={showToast} submissions={studentSubmissions} setSubmissions={setStudentSubmissions} />,
    students: <Students submissions={studentSubmissions} />,
    users: <UsersPage />,
    assessment: <Assessment />,
    statistics: <Statistics />,
    settings: <Settings darkMode={darkMode} setDarkMode={setDarkMode} onToast={showToast} />,
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-white">
      <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} role={currentRole} />
      <main className="lg:pl-72">
        <Header search={search} setSearch={setSearch} darkMode={darkMode} setDarkMode={setDarkMode} openAuth={setAuthModal} role={currentRole} onLogout={logout} />
        <div className="px-4 pb-10 lg:px-8">
          {active !== "home" && (
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black text-emerald-700 dark:text-emerald-300">Bólim</p>
                <h2 className="text-3xl font-black text-slate-950 dark:text-white">{pageTitle}</h2>
                {currentRole && <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">Kirgen rol: {currentRole}</p>}
              </div>
              <div className="glass rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                Izlew: {search || "bárshe maǵlıwmat"}
              </div>
            </div>
          )}
          {pages[active]}
        </div>
      </main>
      {toast && <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white shadow-2xl dark:bg-white dark:text-slate-950">{toast}</div>}
      {modal && <InfoModal onClose={() => setModal(false)} />}
      {authModal && <AuthModal mode={authModal} setMode={setAuthModal} onClose={() => setAuthModal(null)} onSuccess={showToast} onLogin={loginAs} />}
    </div>
  );
}

function HomePage({ openAuth, setModal }) {
  return (
    <div className="space-y-10">
      <section className="grid min-h-[calc(100vh-7rem)] items-center gap-8 py-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-white/10 dark:text-emerald-200">
            <Sparkles size={16} /> Kásiplik pánler ushın aqıllı járdemshi
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl dark:text-white">
            Aralıqtan bilim beriwde jasalma intellekt járdemshi platforması
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Bul platforma kásiplik pánlerde studentlerdiń ámeliy jumısların qabıllaw, AI járdeminde talqılaw, bahalaw hám oqıtıwshıǵa metodikalıq járdem beriw ushın mólsherlengen.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => openAuth("login")} className="premium-button inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-7 py-4 font-black text-white shadow-xl">
              Platformaǵa kiriw <ArrowRight size={19} />
            </button>
            <button onClick={() => openAuth("register")} className="premium-button inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-white/85 px-7 py-4 font-black text-emerald-700 shadow-xl dark:border-white/10 dark:bg-white/10 dark:text-emerald-200">
              Dizimnen ótiw <UserPlus size={19} />
            </button>
            <button onClick={() => setModal(true)} className="premium-button inline-flex items-center justify-center gap-2 rounded-2xl bg-white/80 px-7 py-4 font-black text-slate-950 shadow-xl dark:bg-white/10 dark:text-white">
              Múmkinshilikler <Play size={18} />
            </button>
          </div>
        </div>
        <CleanPreview />
      </section>
    </div>
  );
}

function CleanPreview() {
  return (
    <div className="glass rounded-2xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-emerald-700 dark:text-emerald-300">Platforma bólimleri</p>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">AI járdeminde oqıw procesi</h3>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white"><Bot /></div>
      </div>
      <div className="grid gap-4">
        {["Oqıtıwshı tapsırma jaratadı", "Student juwap jiberedi", "AI tekseriw nátiyjesi saqlanadı", "Oqıtıwshı juwmaqlawshı bahasın tastıyıqlaydı"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl bg-emerald-50/80 p-4 font-black text-slate-700 dark:bg-white/5 dark:text-slate-200">
            <CheckCircle2 className="text-emerald-500" size={18} /> {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentPanel({ onToast, assignments, setSubmissions }) {
  const submitAnswer = (assignment, file) => {
    if (!file) return;
    setSubmissions((current) => [
      {
        id: Date.now(),
        assignmentId: assignment.id,
        assignmentTitle: assignment.title,
        subject: assignment.subject,
        maxScore: Number(assignment.maxScore) || 100,
        studentName: "Aysulıw Tóreniyazova",
        fileName: file.name,
        file,
        fileUrl: URL.createObjectURL(file),
        status: "Oqıtıwshı tekseriwdi kútip tur",
        aiFeedback: "",
      },
      ...current,
    ]);
    onToast("Juwap faylı oqıtıwshıǵa jiberildi");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <section className="glass rounded-2xl p-6">
        <h3 className="text-2xl font-black text-slate-950 dark:text-white">Oqıtıwshıdan kelgen tapsırmalar</h3>
        <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">Student tapsırma faylın júklep aladı hám juwap faylın qaytarıp jiberedi.</p>
        <div className="mt-6 space-y-4">
          {!assignments.length && <div className="rounded-2xl bg-white/70 p-5 font-black text-slate-600 dark:bg-white/5 dark:text-slate-300">Ázirge tapsırma jiberilmegen</div>}
          {assignments.map((assignment) => (
            <div key={assignment.id} className="rounded-2xl bg-white/70 p-5 dark:bg-white/5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-lg font-black text-slate-950 dark:text-white">{assignment.title}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{assignment.description}</p>
                  <a className="mt-3 inline-flex rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700" href={assignment.fileUrl} download={assignment.fileName}>
                    Tapsırmanı júklep alıw
                  </a>
                </div>
                <label className="premium-button inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 font-black text-white">
                  <UploadCloud size={18} /> Juwap júklew
                  <input type="file" className="hidden" onChange={(event) => submitAnswer(assignment, event.target.files?.[0])} />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="glass rounded-2xl p-6">
        <h3 className="text-2xl font-black text-slate-950 dark:text-white">Student eslatpası</h3>
        {["Tapsırma faylın júklep alıń", "Juwaptı fayl túrinde tayarlań", "Juwap júklew túymesi arqalı oqıtıwshıǵa jiberiń", "AI tekseriw nátiyjesin oqıtıwshı tastıyıqlaǵannan keyin kóresiz"].map((item) => (
          <div key={item} className="mt-4 flex items-center gap-3 rounded-2xl bg-white/70 p-4 font-bold text-slate-700 dark:bg-white/5 dark:text-slate-200">
            <CheckCircle2 className="text-emerald-500" size={18} /> {item}
          </div>
        ))}
      </section>
    </div>
  );
}

function TeacherPanel({ submissions, setActive }) {
  return (
    <div className="grid gap-6">
      <section className="glass rounded-2xl p-6">
        <h3 className="text-2xl font-black text-slate-950 dark:text-white">Studentlerden kelgen tapsırmalar</h3>
        <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">Bul jerde studentler qaytarıp júklegen juwaplar kórinedi. Tekseriw hám ball qoyıw `AI tekseriw` bóliminde ámelge asırıladı.</p>
        <div className="mt-5 space-y-4">
          {!submissions.length && <div className="rounded-2xl bg-white/70 p-5 font-black text-slate-600 dark:bg-white/5 dark:text-slate-300">Ázirge student juwabı kelmegen</div>}
          {submissions.map((submission) => (
            <div key={submission.id} className="rounded-2xl bg-white/70 p-4 dark:bg-white/5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-black text-slate-950 dark:text-white">{submission.studentName}</p>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{submission.assignmentTitle} · {submission.status}</p>
                  <a className="mt-2 inline-flex text-sm font-black text-emerald-700" href={submission.fileUrl} download={submission.fileName}>Student juwabın júklep alıw</a>
                </div>
                <button onClick={() => setActive("ai")} className="premium-button rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-black text-white">AI tekseriwge ótiw</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4">
      <div className="glass max-w-xl rounded-2xl p-6">
        <h3 className="text-2xl font-black text-slate-950 dark:text-white">Platforma múmkinshilikleri</h3>
        <div className="mt-5 grid gap-3">
          {["Ámeliy jumıslardı qabıllaw", "AI járdeminde talqılaw", "Rubrika boyınsha bahalaw", "Student aktivligin baqlaw", "Metodikalıq járdem hám statistika"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/60 p-3 font-bold text-slate-700 dark:bg-white/5 dark:text-slate-200">
              <CheckCircle2 className="text-emerald-500" size={18} /> {item}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="premium-button mt-6 rounded-2xl bg-slate-950 px-6 py-3 font-black text-white dark:bg-white dark:text-slate-950">Jabıw</button>
      </div>
    </div>
  );
}

function AuthModal({ mode, setMode, onClose, onSuccess, onLogin }) {
  const isLogin = mode === "login";
  const [role, setRole] = useState("Student");
  const [login, setLogin] = useState(accounts.Student.email);
  const [password, setPassword] = useState(accounts.Student.password);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const performLogin = async (email, pass) => {
    const data = await authApi.login(email, pass);
    saveToken(data.access_token);
    const mappedRole = mapApiRole(data.role);
    onLogin(mappedRole);
    onSuccess(`${data.full_name} platformaǵa kirdi`);
    onClose();
  };

  const selectRole = async (nextRole) => {
    const account = accounts[nextRole];
    setRole(nextRole);
    setLogin(account.email);
    setPassword(account.password);
    if (!isLogin) return;

    setLoading(true);
    try {
      await performLogin(account.email, account.password);
    } catch (error) {
      onSuccess(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!isLogin) {
        await authApi.register({
          full_name: fullName,
          email: login,
          password,
          role: role === "Administrator" ? "admin" : role === "Oqıtıwshı" ? "teacher" : "student",
        });
        onSuccess("Dizimnen ótiw maǵlıwmatları saqlandı");
        setMode("login");
        return;
      }
      await performLogin(login, password);
    } catch (error) {
      onSuccess(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4">
      <div className="glass w-full max-w-2xl rounded-2xl p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black text-emerald-700 dark:text-emerald-300">Paydalanıwshı aynası</p>
            <h3 className="text-3xl font-black text-slate-950 dark:text-white">{isLogin ? "Platformaǵa kiriw" : "Dizimnen ótiw"}</h3>
          </div>
          <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-700 shadow-lg dark:bg-white/10 dark:text-white"><X size={20} /></button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl bg-emerald-50 p-2 dark:bg-white/5">
          <button onClick={() => setMode("login")} className={`rounded-2xl px-4 py-3 text-sm font-black transition ${isLogin ? "bg-emerald-600 text-white shadow-lg" : "text-slate-600 dark:text-slate-300"}`}>Kiriw</button>
          <button onClick={() => setMode("register")} className={`rounded-2xl px-4 py-3 text-sm font-black transition ${!isLogin ? "bg-emerald-600 text-white shadow-lg" : "text-slate-600 dark:text-slate-300"}`}>Dizimnen ótiw</button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {!isLogin && (
            <>
              <PlainAuthField label="Atıńız"><input required className="input" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Atıńız" /></PlainAuthField>
              <PlainAuthField label="E-pochtańız"><input required type="email" className="input" value={login} onChange={(event) => setLogin(event.target.value)} placeholder="E-pochtańız" /></PlainAuthField>
              <PlainAuthField label="Parol"><input required type="password" className="input" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Parol" /></PlainAuthField>
            </>
          )}
          {isLogin && (
            <>
              <div>
                <p className="mb-3 text-sm font-black text-slate-700 dark:text-slate-200">Profil tańlań</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {Object.entries(accounts).map(([item, account]) => (
                    <button
                      key={item}
                      type="button"
                      disabled={loading}
                      onClick={() => selectRole(item)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                        role === item ? "border-emerald-600 bg-emerald-600 text-white shadow-lg" : "border-emerald-100 bg-white text-slate-600 hover:border-emerald-300 dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
                      }`}
                    >
                      {item}
                      <span className="mt-1 block text-xs opacity-80">{account.email} / {account.password}</span>
                    </button>
                  ))}
                </div>
              </div>
              <PlainAuthField label="Email"><input required type="email" className="input" value={login} onChange={(event) => setLogin(event.target.value)} placeholder="Email" /></PlainAuthField>
              <PlainAuthField label="Parol"><input required type="password" className="input" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Parol" /></PlainAuthField>
            </>
          )}
          <button className="premium-button flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 font-black text-white shadow-xl">
            {loading ? "Kútiń..." : isLogin ? "Kiriw" : "Dizimnen ótiw"} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

function PlainAuthField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">{label}</span>
      {children}
    </label>
  );
}
