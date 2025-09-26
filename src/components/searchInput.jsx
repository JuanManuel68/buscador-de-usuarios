import { useState, useEffect } from 'react'
export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    onSearch(query)
  }, [query, onSearch])

  return (
    <div className="relative">
      <input
        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-300/60 bg-white/90 text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Buscar por nombre, perfil o intereses"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </div>
  )
}
