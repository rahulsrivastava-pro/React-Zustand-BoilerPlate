import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import * as api from '../services/api'

const useTodoStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    todos: [],
    loading: false,
    error: null,

    // Actions
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // Fetch all todos
    fetchTodos: async () => {
      set({ loading: true, error: null })
      try {
        const todos = await api.fetchTodos()
        set({ todos, loading: false })
      } catch (error) {
        set({ error: error.message, loading: false })
      }
    },

    // Add a new todo
    addTodo: async (title) => {
      if (!title.trim()) return

      set({ loading: true, error: null })
      try {
        const newTodo = await api.createTodo(title)
        set((state) => ({
          todos: [newTodo, ...state.todos],
          loading: false
        }))
      } catch (error) {
        set({ error: error.message, loading: false })
      }
    },

    // Toggle todo completion
    toggleTodo: async (id) => {
      const todo = get().todos.find(t => t.id === id)
      if (!todo) return

      try {
        const updatedTodo = await api.updateTodo(id, { ...todo, completed: !todo.completed })
        set((state) => ({
          todos: state.todos.map(t => t.id === id ? updatedTodo : t)
        }))
      } catch (error) {
        set({ error: error.message })
      }
    },

    // Update todo title
    updateTodo: async (id, title) => {
      if (!title.trim()) return

      const todo = get().todos.find(t => t.id === id)
      if (!todo) return

      try {
        const updatedTodo = await api.updateTodo(id, { ...todo, title })
        set((state) => ({
          todos: state.todos.map(t => t.id === id ? updatedTodo : t)
        }))
      } catch (error) {
        set({ error: error.message })
      }
    },

    // Delete todo
    deleteTodo: async (id) => {
      try {
        await api.deleteTodo(id)
        set((state) => ({
          todos: state.todos.filter(t => t.id !== id)
        }))
      } catch (error) {
        set({ error: error.message })
      }
    },

    // Clear error
    clearError: () => set({ error: null }),

    // Getters
    getCompletedCount: () => get().todos.filter(todo => todo.completed).length,
    getPendingCount: () => get().todos.filter(todo => !todo.completed).length
  }))
)

export default useTodoStore
