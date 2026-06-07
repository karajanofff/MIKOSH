import { BookOpen, Eye, FileText, Users } from "lucide-react";

export default function CourseCard({ course, onView }) {
  return (
    <article className="glass group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 p-3 text-white shadow-lg">
          <BookOpen size={24} />
        </div>
        <button onClick={() => onView(course.name)} className="premium-button rounded-2xl bg-slate-950 px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
          <span className="inline-flex items-center gap-2"><Eye size={16} /> Kóriw</span>
        </button>
      </div>
      <h3 className="text-xl font-black text-slate-950 dark:text-white">{course.name}</h3>
      <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600 dark:text-slate-300">{course.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/60 p-3 dark:bg-white/5">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400"><Users size={15} /> Studentler</p>
          <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">{course.students}</p>
        </div>
        <div className="rounded-2xl bg-white/60 p-3 dark:bg-white/5">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400"><FileText size={15} /> Tapsırmalar</p>
          <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">{course.tasks}</p>
        </div>
      </div>
    </article>
  );
}

