import { useState } from 'react'
import './Habitos.css'

// Datos de ejemplo — después vienen de Flask/SQLite
const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

const INITIAL_HABITS = [
  { id: 1, nombre: 'Entrenamiento',  emoji: '🏊', streak: 100,  log: [1,1,1,1,1,0,0] },
  { id: 2, nombre: 'Estudio 1h',     emoji: '📚', streak: 3,  log: [0,1,1,1,0,0,0] },
  { id: 3, nombre: 'Sin azúcar',     emoji: '🥗', streak: 12, log: [1,1,1,1,1,1,1] },
  { id: 4, nombre: 'Leer 20 min',    emoji: '📖', streak: 0,  log: [0,0,1,0,0,0,0] },
  { id: 5, nombre: 'Meditar',        emoji: '🧘', streak: 2,  log: [0,0,0,1,1,0,0] },
]

export default function Habitos() {
  const [habits, setHabits] = useState(INITIAL_HABITS)

  const toggleDay = (habitId, dayIdx) => {
    setHabits(hs => hs.map(h => {
      if (h.id !== habitId) return h
      const newLog = [...h.log]
      newLog[dayIdx] = newLog[dayIdx] ? 0 : 1
      return { ...h, log: newLog }
    }))
  }

  const totalHoy    = habits.filter(h => h.log[4]).length  // índice 4 = viernes (ejemplo)
  const mejorStreak = Math.max(...habits.map(h => h.streak))

  return (
    <div className="habitos-page">

      <div className="page-header fade-in">
        <div className="page-label">// seguimiento</div>
        <div className="page-title">HÁBITOS</div>
        <div className="page-subtitle">{totalHoy}/{habits.length} completados hoy · mejor racha {mejorStreak} días</div>
      </div>

      {/* Semana header */}
      <div className="habit-grid fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="habit-header-row">
          <div className="habit-name-col" />
          {DAYS.map(d => (
            <div key={d} className="habit-day-label">{d}</div>
          ))}
          <div className="habit-streak-col">RACHA</div>
        </div>

        {habits.map((h, i) => (
          <div key={h.id} className="habit-row fade-in" style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
            <div className="habit-name">
              <span className="habit-emoji">{h.emoji}</span>
              <span>{h.nombre}</span>
            </div>
            {h.log.map((done, di) => (
              <button
                key={di}
                className={`habit-cell ${done ? 'done' : ''}`}
                onClick={() => toggleDay(h.id, di)}
              >
                {done ? '✓' : ''}
              </button>
            ))}
            <div className="habit-streak">
              <span className="streak-num">{h.streak}</span>
              <span className="streak-unit">d</span>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="grid-3 fade-in" style={{ animationDelay: '0.4s', marginTop: 24 }}>
        <div className="card">
          <div className="card-label">Hábitos activos</div>
          <div className="hab-stat">{habits.length}</div>
        </div>
        <div className="card">
          <div className="card-label">Mejor racha</div>
          <div className="hab-stat">{mejorStreak} <span className="hab-unit">días</span></div>
        </div>
        <div className="card">
          <div className="card-label">Esta semana</div>
          <div className="hab-stat">
            {habits.reduce((a, h) => a + h.log.filter(Boolean).length, 0)}
            <span className="hab-unit">/{habits.length * 7}</span>
          </div>
        </div>
      </div>

    </div>
  )
}