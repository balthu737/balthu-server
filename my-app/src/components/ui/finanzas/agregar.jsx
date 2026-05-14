import { useState } from "react"
import '../../../pages/finanzas/finanzas.css'

export default function Agregar({ form, setForm, agregar}){
    return(
        <div className="card fade-in" style={{ animationDelay: '0.15s', maxWidth: 480 }}>
            <div className="card-label">Nuevo gasto</div>
            <div className="form-group">
            <label className="form-label">Monto</label>
            <input className="form-input" type="number" placeholder="0"
                value={form.monto} onChange={e => setForm(f => ({ ...f, monto: e.target.value }))} />
            </div>
            <div className="form-group">
            <label className="form-label">Descripción</label>
            <input className="form-input" type="text" placeholder="¿En qué gastaste?"
                value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
            </div>
            <div className="form-group">
            <label className="form-label">Categoría</label>
            <select className="form-select"
                value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}>
                <option value="Comida">🍔 Comida</option>
                <option value="Transporte">🚌 Transporte</option>
                <option value="Servicios">📱 Servicios</option>
                <option value="Salud">🏥 Salud</option>
                <option value="Deporte">🏊 Deporte</option>
                <option value="Educacion">📚 Educación</option>
                <option value="Otro">💸 Otro</option>
            </select>
            </div>
            <div className="form-group">
            <label className="form-label">Tipo de pago</label>
            <div style={{ display: 'flex', gap: 8 }}>
                {['efectivo', 'digital'].map(t => (
                <button
                    key={t}
                    onClick={() => setForm(f => ({ ...f, tipo: t }))}
                    className={`btn ${form.tipo === t ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ flex: 1 }}
                >
                    {t === 'efectivo' ? '💵 Efectivo' : '💳 Digital'}
                </button>
                ))}
            </div>
            </div>
            <div className="form-group">
            <label className="form-label">Gasto/Ingreso</label>
            <div style={{ display: 'flex', gap: 8 }}>
                {['gasto', 'ingreso'].map(t => (
                <button
                    key={t}
                    onClick={() => setForm(f => ({ ...f, mov: t }))}
                    className={`btn ${form.mov === t ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ flex: 1 }}
                >
                    {t === 'gasto' ? '📉 gasto' : '📈 ingreso'}
                </button>
                ))}
            </div>
            </div>
            <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 8 }}
            onClick={agregar}
            >
            + REGISTRAR
            </button>
        </div>
    )
}