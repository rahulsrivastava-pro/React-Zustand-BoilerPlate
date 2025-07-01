function Navigation({ currentView, onViewChange }) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>React Zustand App</h1>
        </div>

        <div className="nav-menu">
          <button
            className={`nav-button ${currentView === 'todos' ? 'active' : ''}`}
            onClick={() => onViewChange('todos')}
          >
            📋 Todo Management
          </button>
          <button
            className={`nav-button ${currentView === 'users' ? 'active' : ''}`}
            onClick={() => onViewChange('users')}
          >
            👥 User Management
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
