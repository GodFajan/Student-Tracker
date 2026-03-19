import { useState, useEffect } from 'react';

export function AttendanceViewer() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showLow, setShowLow] = useState(false);
  const [sortOrder, setSortOrder] = useState('none');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => r.json())
      .then(d => {
        setStudents(d.map(u => ({ ...u, att: Math.floor(Math.random() * 60) + 40, status: Math.random() > 0.2 ? 'Present' : 'Absent' })));
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  let displayed = students.filter(s => (filterType === 'All' || s.status === filterType) && (!showLow || s.att < 75));
  if (sortOrder !== 'none') displayed.sort((a, b) => sortOrder === 'asc' ? a.att - b.att : b.att - a.att);

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto p-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-white/90">Student Directory</h2>
      <div className="flex flex-wrap gap-4 mb-6 border-b border-white/10 pb-6 items-center">
        <div className="flex gap-2">
          {['All', 'Present', 'Absent'].map(t => (
            <button key={t} onClick={() => setFilterType(t)} className={`px-4 py-1.5 text-sm rounded-full ${filterType === t ? 'bg-white text-black' : 'bg-black text-gray-400 border border-white/20'}`}>{t}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 bg-black border border-white/10 px-4 py-1.5 rounded-full cursor-pointer">
          <span className="text-sm text-gray-300">Show &lt;75%</span>
          <div className="relative flex items-center">
            <input type="checkbox" checked={showLow} onChange={e => setShowLow(e.target.checked)} className="sr-only" />
            <div className={`w-10 h-5 rounded-full ${showLow ? 'bg-rose-500' : 'bg-gray-800'}`}></div>
            <div className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${showLow ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </div>
        </label>
        <button onClick={() => setSortOrder(p => p === 'none' ? 'desc' : (p === 'desc' ? 'asc' : 'none'))} className="bg-black border border-white/10 text-sm px-4 py-1.5 rounded-full text-gray-300">
          Sort by % ({sortOrder})
        </button>
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {loading && <p className="text-center p-10 animate-pulse text-gray-500 tracking-widest uppercase text-sm">Loading...</p>}
        {!loading && displayed.length === 0 && <p className="text-center p-10 text-gray-500 tracking-widest text-sm">No records found.</p>}
        {!loading && displayed.map(s => (
          <div key={s.id} onClick={() => setSelected(selected?.id === s.id ? null : s)} className={`p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-xl cursor-pointer ${selected?.id === s.id ? 'bg-white/10 border border-white/30' : 'bg-black border border-white/5 hover:bg-white/5'}`}>
            <div>
              <p className="font-semibold text-lg text-white/90">{s.name}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className={`w-2 h-2 rounded-full ${s.status === 'Present' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'}`} />
                  {s.status}
                </span>
                {selected?.id === s.id && <span className="text-xs text-gray-500 font-mono">@{s.username}</span>}
              </div>
            </div>
            <div className={`mt-3 sm:mt-0 font-mono text-xl font-bold tracking-tighter ${s.att >= 75 ? 'text-emerald-400' : 'text-rose-500'}`}>{s.att}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
