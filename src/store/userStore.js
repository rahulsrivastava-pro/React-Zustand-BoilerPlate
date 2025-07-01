import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import * as userApi from '../services/userApi'

const useUserStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    isEditing: false,

    // Actions
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setSelectedUser: (user) => set({ selectedUser: user }),
    setIsEditing: (isEditing) => set({ isEditing }),

    // Fetch all users
    fetchUsers: async () => {
      set({ loading: true, error: null })
      try {
        const users = await userApi.fetchUsers()
        set({ users, loading: false })
      } catch (error) {
        set({ error: error.message, loading: false })
      }
    },

    // Fetch single user
    fetchUser: async (id) => {
      set({ loading: true, error: null })
      try {
        const user = await userApi.fetchUser(id)
        set({ selectedUser: user, loading: false })
      } catch (error) {
        set({ error: error.message, loading: false })
      }
    },

    // Create a new user
    createUser: async (userData) => {
      set({ loading: true, error: null })
      try {
        const newUser = await userApi.createUser(userData)
        set((state) => ({
          users: [newUser, ...state.users],
          loading: false,
          isEditing: false,
          selectedUser: null
        }))
        return newUser
      } catch (error) {
        set({ error: error.message, loading: false })
        throw error
      }
    },

    // Update an existing user
    updateUser: async (id, userData) => {
      set({ loading: true, error: null })
      try {
        const updatedUser = await userApi.updateUser(id, userData)
        set((state) => ({
          users: state.users.map(user => user.id === id ? updatedUser : user),
          selectedUser: updatedUser,
          loading: false,
          isEditing: false
        }))
        return updatedUser
      } catch (error) {
        set({ error: error.message, loading: false })
        throw error
      }
    },

    // Delete a user
    deleteUser: async (id) => {
      set({ loading: true, error: null })
      try {
        await userApi.deleteUser(id)
        set((state) => ({
          users: state.users.filter(user => user.id !== id),
          selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
          loading: false
        }))
      } catch (error) {
        set({ error: error.message, loading: false })
        throw error
      }
    },

    // Clear error
    clearError: () => set({ error: null }),

    // Reset selected user and editing state
    resetSelection: () => set({ selectedUser: null, isEditing: false }),

    // Getters
    getUserById: (id) => get().users.find(user => user.id === id),
    getTotalUsers: () => get().users.length
  }))
)

export default useUserStore
