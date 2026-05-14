import { useState } from "react"
import '../../../pages/finanzas/finanzas.css'

export default function Tabs({ tab, setTab}){
  return(
    <div className="fin-tabs fade-in" style={{ animationDelay: '0.1s'}}>
      {['resumen', 'historial', 'gasto'].map(t => (
        <button key={ t } className={`fin-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
          {t.toUpperCase()}
        </button>
      ))}
    </div>
  )
}