// © 2026 Matthew Ssekandjako, Psalms23Wave.com - UNREMOVABLE
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState } from 'react';

export default function SearchTool({ 
    programs, 
    terms 
}: { 
    programs: string[], 
    terms: string[] 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Initial state from URL
  const [term, setTerm] = useState(searchParams.get('term') || 'all');
  const [program, setProgram] = useState(searchParams.get('program') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleSearch = () => {
    startTransition(() => {
        const params = new URLSearchParams();
        if (term && term !== 'all') params.set('term', term);
        if (program && program !== 'all') params.set('program', program);
        if (search) params.set('search', search);
        
        router.push(`/?${params.toString()}`);
    });
  };

  const handleExport = (type: 'csv' | 'excel') => {
    const params = new URLSearchParams();
    if (term && term !== 'all') params.set('term', term);
    if (program && program !== 'all') params.set('program', program);
    if (search) params.set('search', search);
    params.set('type', type);
    
    window.location.href = `/api/export?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <input
        type="text"
        placeholder="Search by name or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="h-11 w-44 sm:w-52 px-4 rounded-lg bg-slate-700/50 border border-slate-600 text-white text-base placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <select value={program} onChange={(e) => setProgram(e.target.value)} className="h-11 px-4 rounded-lg bg-slate-700/50 border border-slate-600 text-white text-base focus:border-purple-500 focus:outline-none">
        <option value="all">All programs</option>
        {programs.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <select value={term} onChange={(e) => setTerm(e.target.value)} className="h-11 px-4 rounded-lg bg-slate-700/50 border border-slate-600 text-white text-base focus:border-purple-500 focus:outline-none">
        <option value="all">All terms</option>
        {terms.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <button onClick={handleSearch} disabled={isPending} className="h-11 px-5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-base font-medium disabled:opacity-50">
        {isPending ? '...' : 'Filter'}
      </button>
      <div className="flex gap-2">
        <button onClick={() => handleExport('csv')} className="h-11 px-4 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm font-medium" title="Export CSV">CSV</button>
        <button onClick={() => handleExport('excel')} className="h-11 px-4 rounded-lg border border-emerald-600/50 text-emerald-400 hover:bg-emerald-500/10 text-sm font-medium" title="Export Excel">Excel</button>
      </div>
    </div>
  );
}
