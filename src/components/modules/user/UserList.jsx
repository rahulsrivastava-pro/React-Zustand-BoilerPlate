import useUserStore from '../../../store/userStore'

function UserList() {
  const {
    users,
    loading,
    setSelectedUser,
    setIsEditing,
    deleteUser,
    getTotalUsers
  } = useUserStore()

  const handleViewUser = (user) => {
    setSelectedUser(user)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsEditing(true)
  }

  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      try {
        await deleteUser(user.id)
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }

  const handleCreateUser = () => {
    setSelectedUser(null)
    setIsEditing(true)
  }

  if (loading && users.length === 0) {
    return <div className="loading">Loading users...</div>
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <div className="user-list-title">
          <h2>All Users</h2>
          <div className="user-count">
            {getTotalUsers()} users total
          </div>
        </div>
        <button
          onClick={handleCreateUser}
          className="create-user-button"
        >
          + Add New User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <h3>No users found!</h3>
          <p>Click "Add New User" to create your first user.</p>
        </div>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-card-header">
                <h3 className="user-name">{user.name}</h3>
                <div className="user-id">ID: {user.id}</div>
              </div>

              <div className="user-card-body">
                <div className="user-info">
                  <div className="user-detail">
                    <strong>Username:</strong> {user.username}
                  </div>
                  <div className="user-detail">
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div className="user-detail">
                    <strong>Phone:</strong> {user.phone}
                  </div>
                  <div className="user-detail">
                    <strong>Website:</strong> {user.website}
                  </div>
                  <div className="user-detail">
                    <strong>Company:</strong> {user.company?.name || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="user-card-actions">
                <button
                  onClick={() => handleViewUser(user)}
                  className="user-action-button view"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleEditUser(user)}
                  className="user-action-button edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="user-action-button delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserList
