import Card from './components/card'
import SearchInput from './components/searchInput'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Modal from './components/modal'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { user, logout } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detalle, setDetalle] = useState(null)
  const [loadingDetalle, setLoadingDetalle] = useState(false)

  const obtenerUsuarios = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:4000/usuarios')
      setUsuarios(response.data)
      setFiltrados(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar usuarios')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const filtrarUsuarios = useCallback(
    (query) => {
      const q = query.trim().toLowerCase()
      setSearching(true)
      setTimeout(() => {
        const resultados = usuarios.filter((usuario) =>
          [
            usuario.nombre,
            usuario.apellidos,
            usuario.perfil,
            usuario.intereses,
            usuario.correo,
          ].some((campo) => String(campo).toLowerCase().includes(q))
        )
        setFiltrados(resultados)
        setSearching(false)
      }, 2000)
    },
    [usuarios]
  )

  const abrirModal = async (id) => {
    setIsModalOpen(true)
    setLoadingDetalle(true)
    setDetalle(null)
    try {
      const [resp] = await Promise.all([
        axios.get(`http://localhost:4000/usuarios/${id}`),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ])
      setDetalle(resp.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingDetalle(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b border-purple-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-purple-600">
            Buscador de Usuarios
          </h1>
          <div className="flex-1 max-w-xl ml-auto">
            <SearchInput onSearch={filtrarUsuarios} />
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-600 text-sm">
                Bienvenido, {user.username}
              </span>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors duration-200 text-sm font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-3 rounded bg-purple-100 border border-purple-300 text-purple-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {searching && (
              <div className="flex items-center gap-3 text-purple-600 mb-4">
                <svg
                  className="animate-spin h-5 w-5 text-purple-400"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Buscando...</span>
              </div>
            )}

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtrados.map((usuario) => (
                <Card
                  key={usuario.id}
                  usuario={usuario}
                  onClick={() => abrirModal(usuario.id)}
                />
              ))}
            </section>
          </>
        )}
      </main>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {loadingDetalle ? (
          <div className="flex items-center justify-center py-12">
            <div className="spinner"></div>
          </div>
        ) : detalle ? (
          <div className="flex flex-col items-center text-gray-900">
            <img
              src={detalle.foto}
              alt={`${detalle.nombre} ${detalle.apellidos}`}
              className="w-24 h-24 rounded-full ring-4 ring-purple-300"
            />
            <h3 className="mt-4 text-xl font-bold text-purple-700">
              {detalle.nombre} {detalle.apellidos}
            </h3>
            <p className="text-gray-600 mt-1">{detalle.perfil}</p>
            <p className="text-gray-500 text-sm mt-1 italic">
              {detalle.intereses}
            </p>
            <a
              className="text-purple-600 mt-2"
              href={`mailto:${detalle.correo}`}
            >
              {detalle.correo}
            </a>
          </div>
        ) : (
          <p>No se pudo cargar el detalle.</p>
        )}
      </Modal>
    </div>
  )
            }
        
