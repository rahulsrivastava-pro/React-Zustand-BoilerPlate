import { useState } from 'react'
import useTodoStore from '../../../store/todoStore'

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const { toggleTodo, updateTodo, deleteTodo } = useTodoStore()

  const handleToggle = () => {
    toggleTodo(todo.id)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditTitle(todo.title)
  }

  const handleSave = async () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      await updateTodo(todo.id, editTitle)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(todo.id)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="todo-checkbox"
      />

      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="todo-title"
            autoFocus
          />
        ) : (
          <>
            <div className={`todo-title ${todo.completed ? 'completed' : ''}`}>
              {todo.title}
            </div>
            <div className="todo-id">ID: {todo.id}</div>
          </>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="todo-button edit">
              Save
            </button>
            <button onClick={handleCancel} className="todo-button delete">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="todo-button edit">
              Edit
            </button>
            <button onClick={handleDelete} className="todo-button delete">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem
