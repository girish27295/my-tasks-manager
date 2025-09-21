import React from 'react'
import { Task } from '../types'
import TaskItem from './TaskItem'

type Props = {
  tasks: Task[]
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onToggle, onEdit, onDelete }: Props){
  if(tasks.length === 0) return <div className="empty">No tasks to show</div>
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </ul>
  )
}
