export type Priority = 'low' | 'medium' | 'high'

export type Subtask = {
  id: number
  text: string
  done: boolean
  taskId: number
  priority: Priority
  duration?: number | null
}

export type Task = {
  id: number
  text: string
  done: boolean
  categoryId: number
  subtask: Subtask[]
  priority: Priority
  duration?: number | null
}

export type Category = {
  id: number
  name: string
  color: string
  task: Task[]
}
