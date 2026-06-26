import { Priority } from "../types/todo.types";

export async function getTasks() {
  const result = await fetch('/tasks', {
    method: 'GET'
  })
  return result.json()
}

export async function createTasks(payload: { text: string, categoryId: number, priority: string, duration?: number | null }) {
  const result = await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  return result.json()
}

export async function patchTask(id: number, payload: { text?: string; priority?: Priority; duration?: number | null; done?: boolean }) {
  const result = await fetch(`/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  return result.json()
}

export async function deleteTask(id: number) {
  const result = await fetch(`/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return result.json()
}