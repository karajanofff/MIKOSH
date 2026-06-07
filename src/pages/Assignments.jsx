import AssignmentForm from "../components/AssignmentForm";

export default function Assignments({ onToast, setAssignments }) {
  return (
    <div className="space-y-6">
      <section className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">Tapsırma jaratıw</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Oqıtıwshı pán boyınsha ámeliy tapsırma dúzip, muddet, maksimal ball hám fayl materialların belgiley aladı.
        </p>
      </section>
      <AssignmentForm onToast={onToast} onCreate={(assignment) => setAssignments((current) => [assignment, ...current])} />
    </div>
  );
}

