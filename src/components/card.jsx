export default function Card({ usuario, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left p-5 bg-white shadow-lg rounded-xl border border-purple-300 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full ring-2 ring-purple-300 group-hover:ring-purple-400 transition"
          src={usuario.foto}
          alt={usuario.nombre}
        />
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">
            {usuario.nombre} {usuario.apellidos}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{usuario.perfil}</p>
          <p className="text-xs mt-1 italic text-gray-500">
            {usuario.intereses}
          </p>
          <p className="text-xs mt-1 text-purple-600">{usuario.correo}</p>
        </div>
      </div>
    </button>
  )
}
