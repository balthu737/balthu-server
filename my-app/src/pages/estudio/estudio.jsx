import { useState } from 'react'
import './Estudio.css'

// Datos de ejemplo — después vienen de la Obsidian REST API via Flask
const NOTAS_RECIENTES = [
  { path: 'Ingeniería/Álgebra Lineal/Vectores.md',     modified: 'hace 2h',  size: '3.2kb' },
  { path: 'Ingeniería/Análisis/Derivadas.md',           modified: 'ayer',     size: '1.8kb' },
  { path: 'Ingeniería/Sistemas/Arquitectura.md',        modified: 'hace 3d',  size: '5.1kb' },
  { path: 'Personal/Ideas/Proyecto Balthu.md',          modified: 'hace 4d',  size: '2.4kb' },
]

const VAULT_STATS = {
  notas:     142,
  carpetas:   18,
  tags:       34,
  palabras: 48200,
}

export default function Estudio() {
  const [query, setQuery] = useState('')
  const [status]          = useState('disconnected') // 'connected' | 'disconnected'

  // Cuando esté conectado: fetch a Flask → /api/obsidian/search?q=...
  const buscar = () => {
    console.log('TODO: fetch /api/obsidian/search?q=' + query)
  }

  return (
    <div className="estudio-page">

      <div className="page-header fade-in">
        <div className="page-label">// conocimiento</div>
        <div className="page-title">ESTUDIO</div>
        <div className="page-subtitle">
          Integración con Obsidian &nbsp;·&nbsp;
          <span className={`badge badge-${status === 'connected' ? 'green' : 'red'}`}>
            {status === 'connected' ? 'CONECTADO' : 'SIN CONEXIÓN'}
          </span>
        </div>
      </div>

      {/* Conexión aviso */}
      {status === 'disconnected' && (
        <div className="obs-alert fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="obs-alert-icon">⚠</span>
          <div>
            <div className="obs-alert-title">Obsidian no detectado</div>
            <div className="obs-alert-sub">
              Activá el plugin <strong>Local REST API</strong> en Obsidian y asegurate de que Flask esté corriendo.
            </div>
          </div>
        </div>
      )}

      {/* Búsqueda */}
      <div className="obs-search fade-in" style={{ animationDelay: '0.15s' }}>
        <input
          className="form-input"
          placeholder="Buscar en el vault..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && buscar()}
        />
        <button className="btn btn-primary" onClick={buscar}>BUSCAR</button>
      </div>

      {/* Stats del vault */}
      <div className="section-label fade-in" style={{ animationDelay: '0.2s' }}>// vault stats</div>
      <div className="grid-3 fade-in" style={{ animationDelay: '0.25s', marginBottom: 28 }}>
        {Object.entries(VAULT_STATS).map(([k, v]) => (
          <div key={k} className="card">
            <div className="card-label">{k}</div>
            <div className="est-stat">{v.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Notas recientes */}
      <div className="section-label fade-in" style={{ animationDelay: '0.3s' }}>// notas recientes</div>
      <div className="obs-list fade-in" style={{ animationDelay: '0.35s' }}>
        {NOTAS_RECIENTES.map((n, i) => {
          const parts = n.path.split('/')
          const nombre = parts.pop().replace('.md', '')
          const folder = parts.join(' / ')
          return (
            <div key={i} className="obs-note">
              <div className="obs-note-icon">◈</div>
              <div className="obs-note-body">
                <div className="obs-note-name">{nombre}</div>
                <div className="obs-note-path">{folder}</div>
              </div>
              <div className="obs-note-meta">
                <span className="obs-modified">{n.modified}</span>
                <span className="obs-size">{n.size}</span>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}