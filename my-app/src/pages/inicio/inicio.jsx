import { useState } from 'react'
import './inicio.css'

const getSaludo = () => {
  const hora = new Date().getHours()
  if (hora < 12) return 'Buenos días'
  if (hora < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

const getFecha = () => {
  return new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function Inicio() {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const fetchDatos = () => {
    setCargando(true)
    setError(null)

    fetch('http://127.0.0.1:5000')
      .then(res => {
        if (!res.ok) throw new Error('Error ' + res.status)
        return res.json()
      })
      .then(data => {
        setDatos(data)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }

  return (
    <div className="page-header fade-in">

      <div className="page-header">
        <p className="page-label">{getFecha()}</p>
        <h1 className="page-title">{getSaludo()}</h1>
        <p className="page-subtitle">
          <span className="dot dot-green" />
          sistema operativo
        </p>
      </div>

      <p className="section-label">api de prueba</p>
      <div className="card">
        <p className="card-label">conexión local — 127.0.0.1:5000</p>

        <button
          className="btn btn-primary"
          onClick={fetchDatos}
          disabled={cargando}
        >
          {cargando ? 'conectando...' : 'consumir api'}
        </button>

        {error && (
          <p style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent2)' }}>
            ✗ {error}
          </p>
        )}

        {datos && !error && (
          <pre style={{
            marginTop: '14px',
            padding: '12px',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--accent)',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {JSON.stringify(datos, null, 2)}
          </pre>
        )}
      </div>

    </div>
  )
}