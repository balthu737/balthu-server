import { useEffect, useState } from 'react'
import './tareas.css'
import QuickAdd from '../../components/ui/tareas/quick_add'
import Filtros from '../../components/ui/tareas/filtros'
import Listas from '../../components/ui/tareas/lista'

const api = import.meta.env.VITE_API_URL

const PRIORIDAD_COLOR = {
  alta:  'var(--red)',
  media: 'var(--amber)',
  baja:  'var(--text-dim)',
}

export default function Tareas() {
  const [tasks, setTasks]       = useState([])
  const [filtro, setFiltro]     = useState('todas')
  const [newTask, setNewTask]   = useState('')

  useEffect(() => {
    fetch(api + '/tarea/carga')
      .then(res => res.json())
      .then(data => setTasks(data.message))
  }, [])

    const add = () => {
    if (!newTask.trim()) return
    fetch(api + '/tarea/añadir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: newTask, prioridad: 'media' }),
    })
      .then(() => fetch(`${api}/tarea/carga`))
      .then(res => res.json())
      .then(data => {
        setTasks(data.message)
        setNewTask('')
      })
  }

    const toggle = (id) => {
    fetch(`${api}/tarea/${id}`, { method: 'PATCH' })
      .then(() => fetch(`${api}/tarea/carga`))
      .then(res => res.json())
      .then(data => setTasks(data.message))
  }

    const eliminar = (id) => {
    fetch(`${api}/tarea/${id}`, { method: 'DELETE' })
      .then(() => fetch(`${api}/tarea/carga`))
      .then(res => res.json())
      .then(data => setTasks(data.message))
  }

  const filtered = tasks.filter(t => {
    if (filtro === 'pendientes') return t.estado !== 'hecho'
    if (filtro === 'hechas')     return t.estado === 'hecho'
    return true
  })

  const pendientes = tasks.filter(t => t.estado !== 'hecho').length

  return (
    <div className="tareas-page">
      <div className="page-header fade-in">
        <div className="page-label">// productividad</div>
        <div className="page-title">TAREAS</div>
        <div className="page-subtitle">{pendientes} pendientes · {tasks.length} total</div>
      </div>
      {/* Quick add */}
      <QuickAdd newTask={ newTask } setNewTask={ setNewTask } add={ add } />
      {/* Filtros */}
      <Filtros filtro={ filtro } setFiltro={ setFiltro } />
      {/* Lista */}
      <Listas filtered={ filtered } toggle={ toggle } prioridad={ PRIORIDAD_COLOR } eliminar={ eliminar } />
    </div>
  )
}