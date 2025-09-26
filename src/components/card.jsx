export default function Card({ usuario, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left p-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-lg rounded-xl border border-slate-200/60 dark:border-slate-700 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition"
          src={usuario.foto}
          alt={usuario.nombre}
        />
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">
            {usuario.nombre} {usuario.apellidos}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            {usuario.perfil}
          </p>
          <p className="text-xs mt-1 italic text-slate-500 dark:text-slate-400">
            {usuario.intereses}
          </p>
          <p className="text-xs mt-1 text-blue-600">
            {usuario.correo}
          </p>
        </div>
      </div>
    </button>
  )
}
