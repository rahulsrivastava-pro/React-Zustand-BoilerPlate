import useUserStore from '../../../store/userStore'

function UserDetails() {
  const { selectedUser, setIsEditing, deleteUser } = useUserStore()

  if (!selectedUser) {
    return <div className="error">No user selected</div>
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete user "${selectedUser.name}"?`)) {
      try {
        await deleteUser(selectedUser.id)
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }

  return (
    <div className="user-details-container">
      <div className="user-details-header">
        <div className="user-title">
          <h2>{selectedUser.name}</h2>
          <div className="user-id">ID: {selectedUser.id}</div>
        </div>
        <div className="user-details-actions">
          <button onClick={handleEdit} className="edit-user-button">
            Edit User
          </button>
          <button onClick={handleDelete} className="delete-user-button">
            Delete User
          </button>
        </div>
      </div>

      <div className="user-details-content">
        <div className="details-section">
          <h3>Basic Information</h3>
          <div className="details-grid">
            <div className="detail-item">
              <label>Full Name:</label>
              <span>{selectedUser.name}</span>
            </div>
            <div className="detail-item">
              <label>Username:</label>
              <span>{selectedUser.username}</span>
            </div>
            <div className="detail-item">
              <label>Email:</label>
              <span>
                <a href={`mailto:${selectedUser.email}`}>{selectedUser.email}</a>
              </span>
            </div>
            <div className="detail-item">
              <label>Phone:</label>
              <span>
                <a href={`tel:${selectedUser.phone}`}>{selectedUser.phone}</a>
              </span>
            </div>
            <div className="detail-item">
              <label>Website:</label>
              <span>
                <a
                  href={`https://${selectedUser.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedUser.website}
                </a>
              </span>
            </div>
          </div>
        </div>

        {selectedUser.address && (
          <div className="details-section">
            <h3>Address</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Street:</label>
                <span>{selectedUser.address.street}</span>
              </div>
              <div className="detail-item">
                <label>Suite:</label>
                <span>{selectedUser.address.suite}</span>
              </div>
              <div className="detail-item">
                <label>City:</label>
                <span>{selectedUser.address.city}</span>
              </div>
              <div className="detail-item">
                <label>Zipcode:</label>
                <span>{selectedUser.address.zipcode}</span>
              </div>
              {selectedUser.address.geo && (
                <>
                  <div className="detail-item">
                    <label>Latitude:</label>
                    <span>{selectedUser.address.geo.lat}</span>
                  </div>
                  <div className="detail-item">
                    <label>Longitude:</label>
                    <span>{selectedUser.address.geo.lng}</span>
                  </div>
                </>
              )}
            </div>

            <div className="address-summary">
              <label>Full Address:</label>
              <p>
                {selectedUser.address.street} {selectedUser.address.suite}<br />
                {selectedUser.address.city}, {selectedUser.address.zipcode}
              </p>
            </div>
          </div>
        )}

        {selectedUser.company && (
          <div className="details-section">
            <h3>Company Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Company Name:</label>
                <span>{selectedUser.company.name}</span>
              </div>
              <div className="detail-item">
                <label>Catch Phrase:</label>
                <span>"{selectedUser.company.catchPhrase}"</span>
              </div>
              <div className="detail-item">
                <label>Business:</label>
                <span>{selectedUser.company.bs}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDetails
