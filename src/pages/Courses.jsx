import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import { subjectApi } from "../services/api";

function toCourse(subject, counts = { students: 0, tasks: 0 }) {
  return {
    name: subject.name,
    description: "Oqıtıwshı tárepinen bazada jaratılǵan real pán.",
    students: counts.students,
    tasks: counts.tasks,
  };
}

export default function Courses({ onToast, role, assignments = [], submissions = [] }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(true);

  const subjectCounts = useMemo(() => {
    const grouped = assignments.reduce((result, assignment) => {
      if (!assignment.subject) return result;
      const submittedStudentNames = new Set(
        submissions
          .filter((submission) => submission.assignmentId === assignment.id)
          .map((submission) => submission.studentName)
      );
      const current = result[assignment.subject] || { tasks: 0, studentNames: new Set() };
      submittedStudentNames.forEach((name) => current.studentNames.add(name));
      current.tasks += 1;
      result[assignment.subject] = current;
      return result;
    }, {});

    return Object.fromEntries(
      Object.entries(grouped).map(([subject, value]) => [
        subject,
        { tasks: value.tasks, students: value.studentNames.size },
      ])
    );
  }, [assignments, submissions]);

  const visibleCourses = useMemo(() => {
    return items.map((item) => toCourse(item, subjectCounts[item.name] || { students: 0, tasks: 0 }));
  }, [items, subjectCounts]);

  const loadSubjects = async () => {
    setLoading(true);
    try {
      const data = await subjectApi.list();
      setItems(data.map((subject) => ({ name: subject.name })));
    } catch (error) {
      onToast(error.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const addCourse = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      onToast("Pán atın kiritiń");
      return;
    }
    try {
      const subject = await subjectApi.create({ name: form.name.trim() });
      setItems((current) => [...current, { name: subject.name }]);
      setForm({ name: "" });
      onToast("Jańa pán bazada jaratıldı");
    } catch (error) {
      onToast(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {role === "Oqıtıwshı" && (
        <form onSubmit={addCourse} className="glass rounded-2xl p-5">
          <h3 className="text-xl font-black text-slate-950 dark:text-white">Qoldan pán jaratıw</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto]">
            <input className="input" value={form.name} onChange={(event) => setForm({ name: event.target.value })} placeholder="Pán atı" />
            <button className="premium-button inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-black text-white">
              <Plus size={18} /> Qosıw
            </button>
          </div>
        </form>
      )}
      {loading && <div className="glass rounded-2xl p-6 font-black text-slate-700 dark:text-slate-200">Pánler júklenip atır...</div>}
      {!loading && !items.length && <div className="glass rounded-2xl p-6 font-black text-slate-700 dark:text-slate-200">Ázirge pán joq</div>}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleCourses.map((course) => <CourseCard key={course.name} course={course} onView={(name) => onToast(`${name} ashıldı`)} />)}
      </div>
    </div>
  );
}
