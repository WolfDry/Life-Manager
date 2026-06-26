export async function getCategories() {
  const result = await fetch('/categories', {
    method: 'GET'
  })
  return result.json()
}

export async function createCategory(payload: { name: string, color: string }) {
  const result = await fetch('/categories', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  return result.json()
}

export async function patchCategory(id: number, payload: { name?: string, color?: string }) {
  const result = await fetch(`/categories/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  return result.json()
}

export async function deleteCategory(id: number) {
  const result = await fetch(`/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return result.json()
}