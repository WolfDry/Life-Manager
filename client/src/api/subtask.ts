import { Priority } from "../types/todo.types";

export async function getSubTasks() {
  const result = await fetch('/sub-tasks', {
    method: 'GET'
  })
  return result.json()
}

export async function createSubTasks(payload: { text: string, taskId: number, priority: string, duration?: number | null }) {
  const result = await fetch('/sub-tasks', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  return result.json()
}

export async function patchSubTask(id: number, payload: { text?: string; priority?: Priority; duration?: number | null; done?: boolean }) {
  const result = await fetch(`/sub-tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  return result.json()
}

export async function deleteSubTask(id: number) {
  const result = await fetch(`/sub-tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return result.json()
}