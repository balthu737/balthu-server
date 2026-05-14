import { useState } from 'react'
import './inicio.css'

export default function Inicio() {
  const [datos, setDatos] = useState(null)

  const api = () => {
    fetch('http://127.0.0.1:5000')
    .then(response => {
      if (!response.ok) {
        throw new Error('error en la red: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos recibidos: ', data);
      setDatos(data)
    })
  }

  return (
    <div>
      <div>Hola</div>
      <button onClick={ api }>
        consumir api
      </button>
      <div>
        Datos de la API: {datos ? JSON.stringify(datos) : 'Sin datos'}
      </div>
    </div>
  )
}