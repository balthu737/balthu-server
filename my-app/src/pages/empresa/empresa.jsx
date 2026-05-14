import { useState } from 'react'
import './Empresa.css'

// Datos de ejemplo — después vienen de la Notion API via Flask
const PROYECTOS = [
  { id: 1, nombre: 'Landing v2',       estado: 'en curso',  progreso: 65, asignado: 'Balthu', urgente: true  },
  { id: 2, nombre: 'Backend API',       estado: 'en curso',  progreso: 40, asignado: 'Dev1',   urgente: false },
  { id: 3, nombre: 'Diseño UI kit',     estado: 'pendiente', progreso: 10, asignado: 'Balthu', urgente: false },
  { id: 4, nombre: 'Onboarding docs',   estado: 'bloqueado', progreso: 0,  asignado: 'Dev2',   urgente: true  },
]

const KPI = [
  { label: 'Proyectos activos', val: '4',  unit: '' },
  { label: 'Tareas esta semana', val: '12', unit: '' },
  { label: 'Completado',        val: '68', unit: '%' },
]

const ESTADO_BADGE = {
  'en curso':  'badge-green',
  'pendiente': 'badge-dim',
  'bloqueado': 'badge-red',
  'hecho':     'badge-green',
}

export default function Empresa() {
  const [status] = useState('disconnected') // 'connected' | 'disconnected'

  return (
    <div className="empresa-page">

      <div className="page-header fade-in">
        <div className="page-label">// gestión</div>
        <div className="page-title">EMPRESA</div>
        <div className="page-subtitle">
          Integración con Notion &nbsp;·&nbsp;
          <span className={`badge badge-${status === 'connected' ? 'green' : 'red'}`}>
            {status === 'connected' ? 'CONECTADO' : 'SIN CONEXIÓN'}
          </span>
        </div>
      </div>

      {/* Aviso Notion */}
      {status === 'disconnected' && (
        <div className="notion-alert fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="notion-alert-icon">◈</span>
          <div>
            <div className="notion-alert-title">Notion no conectado</div>
            <div className="notion-alert-sub">
              Agregá <strong>NOTION_TOKEN</strong> en el <code>.env</code> del backend y configurá la integración en tu workspace.
            </div>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div className="grid-3 fade-in" style={{ animationDelay: '0.15s', marginBottom: 28 }}>
        {KPI.map((k, i) => (
          <div key={i} className="card">
            <div className="card-label">{k.label}</div>
            <div className="emp-kpi">{k.val}<span className="emp-unit">{k.unit}</span></div>
          </div>
        ))}
      </div>

      {/* Proyectos */}
      <div className="section-label fade-in" style={{ animationDelay: '0.2s' }}>// proyectos</div>
      <div className="proyecto-list fade-in" style={{ animationDelay: '0.25s' }}>
        {PROYECTOS.map((p, i) => (
          <div key={p.id} className={`proyecto-card ${p.urgente ? 'urgente' : ''}`}>
            <div className="proyecto-top">
              <div className="proyecto-nombre">
                {p.urgente && <span className="urgente-dot" title="Urgente" />}
                {p.nombre}
              </div>
              <span className={`badge ${ESTADO_BADGE[p.estado]}`}>{p.estado.toUpperCase()}</span>
            </div>
            <div className="proyecto-meta">
              <span className="proyecto-asignado">→ {p.asignado}</span>
              <span className="proyecto-pct">{p.progreso}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${p.progreso}%` }} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}