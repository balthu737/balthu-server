import { useState } from "react"
import '../../../pages/tareas/tareas.css'

export default function Filtros({ filtro, setFiltro }){
    return(
        <div className="task-filters fade-in" style={{ animationDelay: '0.15s'}}>
            {['todas', 'pendientes', 'hechas'].map(f => (
                <button key={f} className={`filter-btn ${filtro === f ? 'active' : ''}`} onClick={() => setFiltro(f)}>
                    {f.toUpperCase()}
                </button>
            ))}
        </div>
    )
}

