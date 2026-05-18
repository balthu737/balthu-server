import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { APP_VERSION } from '../../version'
import './Sidebar.css'

const NAV = [
  { to: '/',         icon: '⌥', label: 'INICIO',   enabled: true  },
  { to: '/finanzas', icon: '◈', label: 'FINANZAS', enabled: true  },
  { to: '/server',   icon: '⬡', label: 'SERVER',   enabled: true  },
  { to: '/tareas',   icon: '◻', label: 'TAREAS',   enabled: true  },
  { to: '/habitos',  icon: '◉', label: 'HÁBITOS',  enabled: false },
  { to: '/rutinas',  icon: '◷', label: 'RUTINAS',  enabled: false },
  { to: '/estudio',  icon: '◈', label: 'ESTUDIO',  enabled: false },
  { to: '/empresa',  icon: '◫', label: 'EMPRESA',  enabled: false },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  // Cierra el drawer si la pantalla vuelve a desktop (ej: rotar dispositivo)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e) => { if (!e.matches) setOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      {/* Topbar fijo — solo visible en móvil */}
      <div className="sidebar-topbar">
        <span className="topbar-logo">BALTHU</span>
        <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Overlay — toca fuera para cerrar */}
      <div
        className={`sidebar-overlay ${open ? 'open' : ''}`}
        onClick={close}
      />

      {/* Sidebar / drawer */}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <span className="logo-mark">BALTHU</span>
        </div>

        <nav className="sidebar-nav">
          {NAV.filter(item => item.enabled).map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={close}
            >
              <span className="nav-icon">{icon}</span>
              <span className="nav-label">{label}</span>
              <span className="nav-indicator" />
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="dot dot-green" />
          <span>ONLINE</span>
          <span className="sidebar-version">v{APP_VERSION}</span>
        </div>
      </aside>
    </>
  )
}