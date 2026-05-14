import '../../../pages/tareas/tareas.css'

export default function Listas({ filtered, toggle, prioridad, eliminar }) {
    return (
        <div className="task-list fade-in" style={{ animationDelay: '0.2s' }}>
        {filtered.length === 0
            ? <div className="empty"><div className="empty-icon">✓</div><div className="empty-text">Todo listo por acá.</div></div>
            : filtered.map(t => {
                const hecho = t.estado === 'hecho'
                return (
                    <div key={t.id} className={`task-item ${hecho ? 'done' : ''}`} onClick={() => toggle(t.id)}>
                    <div className="task-check">{hecho ? '✓' : ''}</div>
                    <div className="task-body">
                    <span className="task-titulo">{t.nombre}</span>
                    <span className="task-meta">
                        <span className="task-prioridad" style={{ color: prioridad[t.prioridad] }}>
                        {t.prioridad}
                        </span>
                    </span>
                    </div>
                        <button className="task-delete" onClick={e => { e.stopPropagation(); eliminar(t.id) }}>
                        🗑️
                        </button>
                </div>
            )
            })
        }
    </div>
)
}