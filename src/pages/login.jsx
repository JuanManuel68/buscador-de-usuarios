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
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center">LOGIN PAGE</h2>
        <label className="font-semibold" htmlFor="username">Username:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} className="border border-gray-300 rounded p-2" type="text" id="username" />
        <label className="font-semibold" htmlFor="password">Password:</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded p-2" type="password" id="password" />
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 transition-colors duration-200" 
          type="submit"
          disabled={isLoading}
        >
          Login
        </button>
      </form>
      
      {/* Modal de carga */}
      <LoadingModal isOpen={isLoading} message="Iniciando sesión..." />
    </div>
  )
}
