import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Inicio   from './pages/inicio/inicio'
import Server   from './pages/server/server'
import Finanzas from './pages/finanzas/finanzas'
import Tareas   from './pages/tareas/tareas'
import Habitos  from './pages/habitos/habitos'
import Rutinas  from './pages/rutina/rutinas'
import Estudio  from './pages/estudio/estudio'
import Empresa  from './pages/empresa/empresa'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="page-content">
          <Routes>
            <Route path='/'         element={<Inicio />}   />
            <Route path="/finanzas" element={<Finanzas />} />
            <Route path="/server"   element={<Server />}   />
            <Route path="/tareas"   element={<Tareas />}   />
            <Route path="/habitos"  element={<Habitos />}  />
            <Route path="/rutinas"  element={<Rutinas />}  />
            <Route path="/estudio"  element={<Estudio />}  />
            <Route path="/empresa"  element={<Empresa />}  />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}