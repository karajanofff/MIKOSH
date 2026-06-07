import { useMemo, useState } from "react";
import { students } from "../data/demoData";

export default function Students({ submissions = [] }) {
  const [filter, setFilter] = useState("Bárshe");

  const rows = useMemo(() => {
    const grouped = submissions.reduce((result, submission) => {
      const name = submission.studentName;
      const current = result[name] || {
        name,
        group: "KT-31",
        subject: submission.subject || "-",
        works: 0,
        grade: "-",
        aiGrade: "Tekserilmegen",
        status: "Aktiv",
        totalScore: 0,
        checkedCount: 0,
      };

      current.works += 1;
      current.subject = submission.subject || current.subject;

      if (submission.finalScore !== undefined && submission.finalScore !== null) {
        const score = Number(submission.finalScore) || 0;
        const maxScore = Number(submission.maxScore) || 100;
        current.totalScore += score;
        current.checkedCount += 1;
        current.grade = Math.round(current.totalScore / current.checkedCount);
        current.aiGrade = `${score}/${maxScore}`;
      }

      result[name] = current;
      return result;
    }, {});

    const mergedDemo = students.map((student) => {
      const real = grouped[student.name];
      if (!real) return { ...student, aiGrade: "Ázirge joq" };
      return {
        ...student,
        subject: real.subject,
        works: real.works,
        grade: real.grade,
        aiGrade: real.aiGrade,
      };
    });

    const demoNames = new Set(students.map((student) => student.name));
    const realOnly = Object.values(grouped)
      .filter((student) => !demoNames.has(student.name))
      .map(({ totalScore, checkedCount, ...student }) => student);

    return [...realOnly, ...mergedDemo];
  }, [submissions]);

  const filtered = useMemo(() => filter === "Bárshe" ? rows : rows.filter((item) => item.status === filter), [filter, rows]);

  return (
    <div className="space-y-5">
      <section className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">Studentler dizimi</h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Topar, pán, tapsırǵan jumıs hám AI bahası boyınsha baqlaw</p>
        </div>
        <div className="flex gap-3">
          {["Bárshe", "Aktiv", "Qadaǵalawda"].map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`rounded-2xl px-4 py-2 text-sm font-black transition ${filter === item ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "bg-white/60 text-slate-600 dark:bg-white/10 dark:text-slate-300"}`}>
              {item}
            </button>
          ))}
        </div>
      </section>
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-white/60 text-sm text-slate-500 dark:bg-white/5 dark:text-slate-300">
              <tr>
                {["Atı-jóni", "Toparı", "Pán", "Tapsırǵan jumısları", "Orta bahası", "AI bahası", "Status"].map((head) => <th key={head} className="px-5 py-4 font-black">{head}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.name} className="border-t border-slate-200/70 dark:border-white/10">
                  <td className="px-5 py-4 font-black text-slate-950 dark:text-white">{student.name}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">{student.group}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">{student.subject}</td>
                  <td className="px-5 py-4 text-sm font-black text-slate-950 dark:text-white">{student.works}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">{student.grade}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-black text-sky-700 dark:bg-sky-500/15 dark:text-sky-200">{student.aiGrade}</span>
                  </td>
                  <td className="px-5 py-4"><Status value={student.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Status({ value }) {
  const active = value === "Aktiv";
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200" : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200"}`}>{value}</span>;
}
