import { createContext, use, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const login = async (username, password) => {
    setIsLoading(true)
    
    // Simular un delay de 2 segundos para mostrar la animación de carga
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Aquí iría la lógica real de autenticación
    if (username === 'admin' && password === 'password') {
      setUser({ username: 'admin' })
      toast.success('Login exitoso!')
      navigate('/usuarios')
    } else {
      toast.error('Credenciales incorrectas')
    }
    
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}