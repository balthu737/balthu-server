import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const NAV = [
  { to: '/',         icon: '⌥', label: 'INICIO'    },
  { to: '/finanzas', icon: '◈', label: 'FINANZAS'  },
  { to: '/server',   icon: '⬡', label: 'SERVER'    },
  { to: '/tareas',   icon: '◻', label: 'TAREAS'    },
  { to: '/habitos',  icon: '◉', label: 'HÁBITOS'   },
  { to: '/rutinas',  icon: '◷', label: 'RUTINAS'   },
  { to: '/estudio',  icon: '◈', label: 'ESTUDIO'   },
  { to: '/empresa',  icon: '◫', label: 'EMPRESA'   },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">BALTHU</span>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
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
      </div>
    </aside>
  )
}