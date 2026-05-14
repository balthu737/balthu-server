import { useState } from 'react'
import '../../../pages/finanzas/finanzas.css'

export default function Header({ totalGastado, disponible, pct, fmt }){
    
    return(
        <div className='page-header fade-in'>
            <div className='page-label'>// finanas personales</div>
            <div className='page-title'>FINANZAS</div>
            <div className='balance-big' style={{ color: disponible < 0 ? 'var(--accent2)' : 'var(..accent)'}}>
                <span className='balance-currency'>$</span>
                {fmt(disponible)}
            </div>
            <div className='page-subtitle'> disponible este mes · {pct}% gastado</div>
            <div className='progress-track' style={{ marginTop: 12 }}>
                <div className='progress- fill' style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}