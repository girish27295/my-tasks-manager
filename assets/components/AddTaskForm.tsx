import React, { useState } from 'react'

type Props = { onAdd: (title: string) => void }

export default function AddTaskForm({ onAdd }: Props){
  const [title, setTitle] = useState('')

  function submit(e: React.FormEvent){
    e.preventDefault()
    const t = title.trim()
    if(!t) return
    onAdd(t)
    setTitle('')
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a new task..." />
      <button type="submit" aria-label="Add task">Add</button>
    </form>
  )
}
