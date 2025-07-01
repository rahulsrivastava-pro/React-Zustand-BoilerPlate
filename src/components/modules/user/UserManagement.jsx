import { useEffect } from 'react'
import useUserStore from '../../../store/userStore'
import UserList from './UserList'
import UserForm from './UserForm'
import UserDetails from './UserDetails'

function UserManagement() {
  const {
    fetchUsers,
    error,
    clearError,
    selectedUser,
    isEditing,
    resetSelection
  } = useUserStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleBackToList = () => {
    resetSelection()
  }

  return (
    <div className="user-management">
      <header className="user-header">
        <h1>User Management</h1>
        <p>Manage users with full CRUD operations using JSONPlaceholder API</p>
      </header>

      {error && (
        <div className="error">
          {error}
          <button onClick={clearError} style={{ marginLeft: '10px', padding: '4px 8px' }}>
            ✕
          </button>
        </div>
      )}

      <div className="user-content">
        {selectedUser || isEditing ? (
          <div className="user-detail-view">
            <button
              onClick={handleBackToList}
              className="back-button"
            >
              ← Back to Users
            </button>

            {isEditing ? (
              <UserForm />
            ) : (
              <UserDetails />
            )}
          </div>
        ) : (
          <UserList />
        )}
      </div>
    </div>
  )
}

export default UserManagement
