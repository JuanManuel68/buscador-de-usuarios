import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import LoadingModal from "../components/loadingModal.jsx"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-purple-200"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600">
          Iniciar Sesión
        </h2>

        <label className="font-semibold text-gray-700" htmlFor="username">
          Usuario
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          id="username"
        />

        <label className="font-semibold text-gray-700" htmlFor="password">
          Contraseña
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="password"
          id="password"
        />

        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium rounded p-2 transition-colors duration-200 disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Entrar"}
        </button>
      </form>

      {/* Modal de carga */}
      <LoadingModal isOpen={isLoading} message="Iniciando sesión..." />
    </div>
  )
}
