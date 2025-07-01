import { apiHelper } from './axiosHelper'

// Fetch todos from JSONPlaceholder (limited to 20 for performance)
export const fetchTodos = async () => {
  try {
    const todos = await apiHelper.get('/todos?_limit=20')
    return todos
  } catch (error) {
    throw new Error(`Failed to fetch todos: ${error.message}`)
  }
}

// Create a new todo
export const createTodo = async (todoData) => {
  try {
    const todo = await apiHelper.post('/todos', todoData)
    // JSONPlaceholder returns id: 201 for new todos, so we'll use a timestamp for uniqueness
    return {
      ...todo,
      id: Date.now() // Use timestamp as unique ID for new todos
    }
  } catch (error) {
    throw new Error(`Failed to create todo: ${error.message}`)
  }
}

// Update an existing todo
export const updateTodo = async (id, todoData) => {
  try {
    const todo = await apiHelper.put(`/todos/${id}`, todoData)
    return todo
  } catch (error) {
    throw new Error(`Failed to update todo: ${error.message}`)
  }
}

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    await apiHelper.delete(`/todos/${id}`)
    return true
  } catch (error) {
    throw new Error(`Failed to delete todo: ${error.message}`)
  }
}
