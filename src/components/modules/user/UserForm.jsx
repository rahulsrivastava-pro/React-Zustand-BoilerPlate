import { useState, useEffect } from 'react'
import useUserStore from '../../../store/userStore'

function UserForm() {
  const { selectedUser, createUser, updateUser, loading, resetSelection } = useUserStore()

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  })

  const isEditing = !!selectedUser

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || '',
        username: selectedUser.username || '',
        email: selectedUser.email || '',
        phone: selectedUser.phone || '',
        website: selectedUser.website || '',
        address: {
          street: selectedUser.address?.street || '',
          suite: selectedUser.address?.suite || '',
          city: selectedUser.address?.city || '',
          zipcode: selectedUser.address?.zipcode || '',
          geo: {
            lat: selectedUser.address?.geo?.lat || '',
            lng: selectedUser.address?.geo?.lng || ''
          }
        },
        company: {
          name: selectedUser.company?.name || '',
          catchPhrase: selectedUser.company?.catchPhrase || '',
          bs: selectedUser.company?.bs || ''
        }
      })
    }
  }, [selectedUser])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.includes('.')) {
      const [parent, child, grandchild] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: grandchild ? {
            ...prev[parent][child],
            [grandchild]: value
          } : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isEditing) {
        await updateUser(selectedUser.id, formData)
      } else {
        await createUser(formData)
      }
    } catch (error) {
      console.error('Failed to save user:', error)
    }
  }

  const handleCancel = () => {
    resetSelection()
  }

  return (
    <div className="user-form-container">
      <div className="user-form-header">
        <h2>{isEditing ? 'Edit User' : 'Create New User'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Address</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address.street">Street</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address.suite">Suite</label>
              <input
                type="text"
                id="address.suite"
                name="address.suite"
                value={formData.address.suite}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address.city">City</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address.zipcode">Zipcode</label>
              <input
                type="text"
                id="address.zipcode"
                name="address.zipcode"
                value={formData.address.zipcode}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Company</h3>
          <div className="form-group">
            <label htmlFor="company.name">Company Name</label>
            <input
              type="text"
              id="company.name"
              name="company.name"
              value={formData.company.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company.catchPhrase">Catch Phrase</label>
            <input
              type="text"
              id="company.catchPhrase"
              name="company.catchPhrase"
              value={formData.company.catchPhrase}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company.bs">Business</label>
            <input
              type="text"
              id="company.bs"
              name="company.bs"
              value={formData.company.bs}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update User' : 'Create User')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm
