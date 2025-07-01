import useTodoStore from '../../../store/todoStore'
import TodoItem from './TodoItem'

function TodoList() {
  const { todos, loading, getCompletedCount, getPendingCount } = useTodoStore()

  if (loading && todos.length === 0) {
    return <div className="loading">Loading todos...</div>
  }

  return (
    <div className="todos-container">
      <div className="todos-header">
        <h2>Your Todos</h2>
        <div className="todos-count">
          {todos.length} total • {getPendingCount()} pending • {getCompletedCount()} completed
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="empty-state">
          <h3>No todos yet!</h3>
          <p>Add your first todo above to get started.</p>
        </div>
      ) : (
        <div className="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList
