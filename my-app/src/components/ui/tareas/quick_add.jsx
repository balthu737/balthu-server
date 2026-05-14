import { useState } from "react"
import '../../../pages/tareas/tareas.css'

export default function QuickAdd({ newTask, setNewTask, add }){
    return(
        <div className="task-add fade-in" style={{ animationDelay: '0.1s'}}>
            <input 
            className="form-input"
            placeholder="Nueva tarea..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            />
            <button className="btn btn-primary" onClick={add}>+ ADD</button>
        </div>
    )
}
