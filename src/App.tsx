import React, { useEffect, useState } from 'react'
import { Task } from './types'
import AddTaskForm from './components/AddTaskForm'
import TaskList from './components/TaskList'

const STORAGE_KEY = 'task_management_app.tasks_v1'

const sampleTasks: Task[] = [
  { id: 't1', title: 'Welcome — try editing me!', completed: false, createdAt: Date.now() }
]

export default function App(){ 
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) as Task[] : sampleTasks
    } catch (e) {
      return sampleTasks
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(title: string){
    const t: Task = { id: cryptoRandomId(), title: title.trim(), completed: false, createdAt: Date.now() }
    setTasks(prev => [t, ...prev])
  }

  function updateTask(id: string, fields: Partial<Task>){
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...fields } : t))
  }

  function deleteTask(id: string){
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const [filter, setFilter] = useState<'all'|'active'|'completed'>('all')

  const visible = tasks.filter(t => 
    filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed
  )

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
        <p className="sub">Simple, focused and built with React + TypeScript</p>
      </header>
      <main className="card">
        <AddTaskForm onAdd={addTask}/>
        <div className="filters">
          <button className={filter==='all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter==='active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
          <button className={filter==='completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <TaskList tasks={visible} onToggle={id => {
          const t = tasks.find(x => x.id === id)
          if (t) updateTask(id, { completed: !t.completed })
        }} onEdit={(id, title) => updateTask(id, { title })} onDelete={deleteTask}/>
        <div className="footer">
          <span>{tasks.length} total</span>
          <button className="clear" onClick={() => setTasks([])}>Clear All</button>
        </div>
      </main>
      <footer className="credits">Figma: Provided design • Persisted in localStorage • Filters & animations added</footer>
    </div>
  )
}

function cryptoRandomId(){
  // small safe id generator
  return 'id-' + Math.random().toString(36).slice(2,9)
}
