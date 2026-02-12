// © 2026 Mathew Sekanjako. Psalms23Wave. All Rights Reserved.
import { getDashboard, getChartData, searchEnrollments, prisma } from '@/lib/queries';
import UploadSection from '@/components/UploadSection';
import EnrollmentTable from '@/components/EnrollmentTable';
import ChartComponent from '@/components/ChartComponent';
import SearchTool from '@/components/SearchTool';

// Force dynamic rendering so data refreshes
export const dynamic = 'force-dynamic';

export default async function Home(props: { searchParams: Promise<{ term?: string, program?: string, search?: string }> }) {
  const searchParams = await props.searchParams;
  const stats = await getDashboard();
  const chartData = await getChartData();
  
  // Get filter data for dropdowns
  const programs = await prisma.enrollment.findMany({ select: { program: true }, distinct: ['program'] });
  const terms = await prisma.enrollment.findMany({ select: { term: true }, distinct: ['term'] });

  // If search params exist, use them, otherwise use recent
  let displayData = stats.recent;
  let isFiltered = false;

  if (searchParams.term || searchParams.program || searchParams.search) {
      displayData = await searchEnrollments(searchParams);
      isFiltered = true;
  }

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 min-w-0">
      
      {/* Section 1: Stats */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <StatsCard label="Students" value={stats.students} />
          <StatsCard label="Enrollments" value={stats.enrollments} />
          <StatsCard label="Programs" value={chartData.length} />
        </div>
      </section>

      {/* Section 2: Filters */}
      <section className="mb-8">
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-5">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Filter & Export</h3>
          <SearchTool 
            programs={programs.map(p => p.program).filter(Boolean) as string[]} 
            terms={terms.map(t => t.term).filter(Boolean) as string[]} 
          />
        </div>
      </section>

      {/* Section 3: Main Content — Table + Sidebar */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-w-0">
          
          {/* Enrollments Table */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 overflow-hidden shadow-lg">
              <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/60">
                <h2 className="font-semibold text-white text-xl">{isFiltered ? 'Search Results' : 'Enrollments'}</h2>
                <p className="text-sm text-slate-400 mt-1">
                  {isFiltered ? `${displayData.length} records found` : `Latest ${stats.recent.length} · Total ${stats.enrollments}`}
                </p>
              </div>
              <EnrollmentTable enrollments={displayData} />
            </div>
          </div>

          {/* Sidebar: Upload + Chart */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 overflow-hidden shadow-lg">
              <div className="px-5 py-4 border-b border-slate-700/50 bg-slate-800/60">
                <h3 className="font-semibold text-white text-base">Upload Data</h3>
              </div>
              <div className="p-5">
                <UploadSection />
              </div>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 overflow-hidden shadow-lg">
              <div className="px-5 py-4 border-b border-slate-700/50 bg-slate-800/60">
                <h3 className="font-semibold text-white text-base">Distribution</h3>
              </div>
              <div className="p-5">
                <ChartComponent data={chartData} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


function StatsCard({ label, value }: { label: string, value: number }) {
    return (
        <div className="px-6 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 min-w-[140px]">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-white tabular-nums mt-1">{value.toLocaleString()}</p>
        </div>
    )
}


