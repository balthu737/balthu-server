import { useState } from "react"
import '../../../pages/finanzas/finanzas.css'

export default function Resumen({ fmt, totalGastado, disponible, gastos, presupuesto }) {
    return(
        <div className="fade-in" style={{ animationDelay: '0.15s'}}>
            <div className="grid-3" style={{ marginBottom: 20 }}>
                <div className="card">
                    <div className="card-label">Presupuesto</div>
                    <div className="fin-stat">${fmt(presupuesto)}</div>
                </div>
                <div className="card">
                    <div className="card-label">Total gastado</div>
                    <div className="fin-stat red">${fmt(totalGastado)}</div>
                </div>
                <div className="card">
                    <div className="card-label">Cantidad disponible</div>
                    <div className="fin-stat">${fmt(disponible)}</div>
                </div>
            </div>
            <div className="card">
                <div className="card-label">Últimos movimientos</div>
                {gastos.slice(0, 3).map(g => (
                    <div key={g.id} className="gasto-row">
                        <span className="gasto-emoji">{g.emoji}</span>
                        <div className="gasto-info">
                            <span className="gasto-desc">{g.desc}</span>
                            <span className="gasto-cat">{g.cat} · {g.fecha}</span>
                        </div>
                        <span className="gasto-monto">-${fmt(g.monto)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}