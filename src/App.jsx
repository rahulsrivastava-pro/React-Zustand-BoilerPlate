import { useState } from 'react'
import { Navigation } from './components/layout'
import { TodoApp } from './components/modules/todo'
import { UserManagement } from './components/modules/user'

function App() {
  const [currentView, setCurrentView] = useState('todos')

  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  return (
    <div className="app">
      <Navigation currentView={currentView} onViewChange={handleViewChange} />

      <main className="main-content">
        {currentView === 'todos' ? <TodoApp /> : <UserManagement />}
      </main>
    </div>
  )
}

export default App
