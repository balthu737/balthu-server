import { useState } from "react"
import '../../../pages/finanzas/finanzas.css'

export default function Historial({ fmt, gastos }){
    return(
        <div className="card fade-in" style={{ animationDelay: '0.15s'}}>
            <div className="card-label">Todos los gastos</div>
            {gastos.length === 0
                ? <div className="empty"><div className="empty-icon">📋</div><div className="empty-text">Sin gastos registrados.</div></div>
                : gastos.map(g => (
                    <div key={g.id} className="gasto-row">
                        <span className="gasto-emoji">{g.emoji}</span>
                        <div className="gasto-info">
                            <span className="gasto-desc">{g.desc}</span>
                            <span className="gasto-cat">{g.cat} · {g.fecha} · <span className={`badge badge-${g.tipo === 'efectivo' ? 'amber' : 'green'}`}>{g.tipo}</span></span>
                        </div>
                        <span className={`gasto-monto ${g.mov === 'ingreso' ? 'green' : 'red'}`}>
                        {g.mov === 'ingreso' ? '+' : '-'}${fmt(g.monto)}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}