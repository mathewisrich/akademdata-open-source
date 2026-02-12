// © 2026 Mathew Sekanjako. Psalms23Wave. All Rights Reserved.
export default function EnrollmentTable({ enrollments }: { enrollments: any[] }) {
  return (
    <div className="overflow-x-auto max-h-[360px] sm:max-h-[420px]">
      <table className="w-full">
        <thead className="bg-slate-700/30 sticky top-0 z-10">
          <tr>
            <th className="px-5 py-4 text-left font-semibold text-slate-300 text-sm uppercase tracking-wider">Name</th>
            <th className="px-5 py-4 text-left font-semibold text-slate-300 text-sm uppercase tracking-wider">Program</th>
            <th className="px-5 py-4 text-left font-semibold text-slate-300 text-sm uppercase tracking-wider">Term</th>
            <th className="px-5 py-4 text-left font-semibold text-slate-300 text-sm uppercase tracking-wider">Status</th>
            <th className="px-5 py-4 text-right font-semibold text-slate-300 text-sm uppercase tracking-wider">Credits</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/40">
          {enrollments.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-16 text-center text-slate-400 text-base">
                No records yet. Upload an Excel file to see data here.
              </td>
            </tr>
          ) : (
            enrollments.map((e) => (
              <tr key={e.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-5 py-4 font-medium text-white text-base">{e.student?.name || e.studentId}</td>
                <td className="px-5 py-4 text-slate-400 text-base">{e.program}</td>
                <td className="px-5 py-4 text-slate-400 text-base">{e.term}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-sm font-medium ${
                    e.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 
                    e.status === 'Probation' ? 'bg-amber-500/20 text-amber-400' : 
                    e.status === 'Graduated' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-500/20 text-slate-400'
                  }`}>{e.status}</span>
                </td>
                <td className="px-5 py-4 text-slate-400 text-right font-mono tabular-nums text-base">{e.credits}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

