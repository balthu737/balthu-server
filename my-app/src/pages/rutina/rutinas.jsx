import { useState } from 'react'
import './Rutinas.css'

// Datos de ejemplo — después vienen de Flask/SQLite
const BLOQUES = [
  { id: 1, hora: '06:00', duracion: 60,  nombre: 'Entrenamiento',    tipo: 'deporte',  color: 'var(--blue)'  },
  { id: 2, hora: '07:30', duracion: 30,  nombre: 'Desayuno + review', tipo: 'personal', color: 'var(--amber)' },
  { id: 3, hora: '08:00', duracion: 120, nombre: 'Universidad',       tipo: 'estudio',  color: 'var(--teal)'  },
  { id: 4, hora: '10:00', duracion: 90,  nombre: 'Trabajo empresa',   tipo: 'empresa',  color: 'var(--green)' },
  { id: 5, hora: '12:00', duracion: 60,  nombre: 'Almuerzo',          tipo: 'personal', color: 'var(--amber)' },
  { id: 6, hora: '13:00', duracion: 120, nombre: 'Universidad tarde', tipo: 'estudio',  color: 'var(--teal)'  },
  { id: 7, hora: '15:00', duracion: 60,  nombre: 'Estudio personal',  tipo: 'estudio',  color: 'var(--teal)'  },
  { id: 8, hora: '20:00', duracion: 60,  nombre: 'Lectura + cierre',  tipo: 'personal', color: 'var(--amber)' },
]

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export default function Rutinas() {
  const [diaActivo, setDiaActivo] = useState(0)

  const horaToMin = h => {
    const [hh, mm] = h.split(':').map(Number)
    return hh * 60 + mm
  }

  const totalHoras = BLOQUES.reduce((a, b) => a + b.duracion, 0) / 60

  return (
    <div className="rutinas-page">

      <div className="page-header fade-in">
        <div className="page-label">// horarios</div>
        <div className="page-title">RUTINAS</div>
        <div className="page-subtitle">{totalHoras}h planificadas · {BLOQUES.length} bloques</div>
      </div>

      {/* Selector de día */}
      <div className="dia-selector fade-in" style={{ animationDelay: '0.1s' }}>
        {DIAS.map((d, i) => (
          <button
            key={i}
            className={`dia-btn ${diaActivo === i ? 'active' : ''}`}
            onClick={() => setDiaActivo(i)}
          >
            {d.slice(0, 3).toUpperCase()}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="timeline fade-in" style={{ animationDelay: '0.2s' }}>
        {BLOQUES.map((b, i) => (
          <div key={b.id} className="timeline-item" style={{ animationDelay: `${0.2 + i * 0.04}s` }}>
            <div className="tl-hora">
              <span>{b.hora}</span>
            </div>
            <div className="tl-connector">
              <div className="tl-dot" style={{ background: b.color }} />
              <div className="tl-line" />
            </div>
            <div className="tl-bloque" style={{ borderLeftColor: b.color }}>
              <div className="tl-nombre">{b.nombre}</div>
              <div className="tl-meta">
                <span className="tl-tipo">{b.tipo}</span>
                <span className="tl-sep">·</span>
                <span className="tl-dur">{b.duracion} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen por tipo */}
      <div className="section-label fade-in" style={{ animationDelay: '0.5s', marginTop: 8 }}>// distribución</div>
      <div className="tipo-grid fade-in" style={{ animationDelay: '0.55s' }}>
        {['estudio', 'empresa', 'deporte', 'personal'].map(tipo => {
          const mins = BLOQUES.filter(b => b.tipo === tipo).reduce((a, b) => a + b.duracion, 0)
          const color = BLOQUES.find(b => b.tipo === tipo)?.color || 'var(--text-dim)'
          return (
            <div key={tipo} className="tipo-card card">
              <div className="card-label">{tipo}</div>
              <div className="tipo-horas" style={{ color }}>{(mins/60).toFixed(1)}<span className="tipo-unit">h</span></div>
            </div>
          )
        })}
      </div>

    </div>
  )
}