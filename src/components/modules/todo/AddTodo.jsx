import { useState } from 'react'
import useTodoStore from '../../../store/todoStore'

function AddTodo() {
  const [title, setTitle] = useState('')
  const { addTodo, loading } = useTodoStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title.trim()) {
      await addTodo(title)
      setTitle('')
    }
  }

  return (
    <div className="add-todo">
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit} className="add-todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new todo..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !title.trim()}>
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  )
}

export default AddTodo
