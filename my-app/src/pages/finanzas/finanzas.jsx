import { useEffect, useState } from 'react'
import './Finanzas.css'
import Header from '../../components/ui/finanzas/header'
import Tabs from '../../components/ui/finanzas/tabs'
import Resumen from '../../components/ui/finanzas/resumen'
import Historial from '../../components/ui/finanzas/historial'
import Agregar from '../../components/ui/finanzas/agregar'

const api = 'http://127.0.0.1:5000'

const fmt = n => Math.abs(Math.round(n)).toLocaleString('es-AR')

export default function Finanzas() {
  const [gastos, setGastos] = useState([])
  const [form, setForm] = useState({ monto: '', desc: '', cat: 'Comida', mov: 'gasto', tipo: 'efectivo' })
  const [tab, setTab] = useState('resumen')

    useEffect(() => {
      fetch(api + '/finanzas/carga').then(r => r.json())
      .then((gastos) => {
          setGastos(gastos.message)
        })
        .catch(err => console.error(err))
    }, [])

  const agregar = async () => {
  if (!form.monto || !form.desc) return

  const nuevoGasto = {
    id: Date.now(),
    emoji: '💸',
    desc: form.desc,
    cat: form.cat,
    mov: form.mov,
    monto: Number(form.monto),
    tipo: form.tipo,
    fecha: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })
  }

  try {
    const res = await fetch(api + '/finanzas/añadir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoGasto)
    })

    if (!res.ok) throw new Error('Error al registrar')

    setGastos(gs => [...gs, nuevoGasto])
    setForm({ monto: '', desc: '', cat: 'Comida', mov: 'gasto', tipo: 'efectivo' })
    setTab('historial')

  } catch (e) {
    console.error(e)
  }
}

  const totalIngreso = gastos.filter(g => g.mov === 'ingreso').reduce((a, i) => a + i.monto, 0)
  const totalGastado = gastos.filter(g => g.mov === 'gasto').reduce((a, g) => a + g.monto, 0)
  const disponible = totalIngreso - totalGastado
  const presupuesto = totalIngreso - totalGastado
  const pct = Math.min(100, Math.round(totalGastado / presupuesto * 100))

  return (
    <div className="finanzas-page">
      {/* Header */}
      <Header totalGastado={ totalGastado } disponible={ disponible } pct={ pct } fmt={ fmt }/>
      {/* Tabs */}
      <Tabs tab={ tab } setTab={ setTab }/>
      {/* Resumen */}
      {tab === 'resumen'&& <Resumen fmt={ fmt } totalGastado={ totalGastado } disponible={ disponible } gastos={ gastos } presupuesto={ presupuesto }/>}
      {/* Historial */}
      {tab === 'historial' && <Historial fmt={ fmt } gastos={ gastos }/>}
      {/* Gasto */}
      {tab === 'gasto' && <Agregar form={ form } setForm={ setForm } agregar={ agregar }/>}
    </div>
  )
}