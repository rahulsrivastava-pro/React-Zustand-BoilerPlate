import { useEffect } from 'react'
import useTodoStore from '../../../store/todoStore'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

function TodoApp() {
  const { fetchTodos, error, clearError } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <div className="todo-app">
      <header className="header">
        <h1>Todo Management</h1>
        <p>A simple todo application built with React 19, Zustand, and JSONPlaceholder API</p>
      </header>

      {error && (
        <div className="error">
          {error}
          <button onClick={clearError} style={{ marginLeft: '10px', padding: '4px 8px' }}>
            ✕
          </button>
        </div>
      )}

      <AddTodo />
      <TodoList />
    </div>
  )
}

export default TodoApp
