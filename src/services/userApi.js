import { apiHelper } from './axiosHelper'

// Fetch all users
export const fetchUsers = async () => {
  try {
    const users = await apiHelper.get('/users')
    return users
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`)
  }
}

// Fetch single user by ID
export const fetchUser = async (id) => {
  try {
    const user = await apiHelper.get(`/users/${id}`)
    return user
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error.message}`)
  }
}

// Create a new user
export const createUser = async (userData) => {
  try {
    const user = await apiHelper.post('/users', userData)
    // JSONPlaceholder returns id: 11 for new users, so we'll use a timestamp for uniqueness
    return {
      ...user,
      id: Date.now() // Use timestamp as unique ID for new users
    }
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`)
  }
}

// Update an existing user
export const updateUser = async (id, userData) => {
  try {
    const user = await apiHelper.put(`/users/${id}`, userData)
    return user
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`)
  }
}

// Delete a user
export const deleteUser = async (id) => {
  try {
    await apiHelper.delete(`/users/${id}`)
    return true
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`)
  }
}
