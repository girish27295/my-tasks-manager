import React, { useState, useRef, useEffect } from 'react'
import { Task } from '../types'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props){
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(task.title)
  const inputRef = useRef<HTMLInputElement|null>(null)

  useEffect(() => { if(editing) inputRef.current?.focus() }, [editing])

  function save(){
    const v = text.trim()
    if(!v){ setText(task.title); setEditing(false); return }
    if(v !== task.title) onEdit(task.id, v)
    setEditing(false)
  }

  return (
    <li className={'task-item ' + (task.completed ? 'completed' : '')} >
      <label className="left">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)}/>
        {!editing ? (
          <span className="title" onDoubleClick={() => setEditing(true)}>{task.title}</span>
        ) : (
          <input ref={inputRef} className="edit" value={text} onChange={e => setText(e.target.value)} onBlur={save} onKeyDown={e => { if(e.key === 'Enter') save(); if(e.key === 'Escape'){ setText(task.title); setEditing(false) } }} />
        )}
      </label>
      <div className="actions">
        <button onClick={() => setEditing(true)} title="Edit">Edit</button>
        <button onClick={() => onDelete(task.id)} className="delete" title="Delete">Delete</button>
      </div>
    </li>
  )
}
