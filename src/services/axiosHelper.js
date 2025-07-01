import axios from 'axios'

// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens, logging, etc. here
    console.warn(`Making ${config.method?.toUpperCase()} request to: ${config.url}`)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    console.warn(`Response received from: ${response.config.url}`)
    return response
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx causes this function to trigger
    console.error('Response error:', error)

    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, statusText, data } = error.response
      throw new Error(`API Error: ${status} ${statusText} - ${data?.message || 'Unknown error'}`)
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network Error: No response received from server')
    } else {
      // Something else happened
      throw new Error(`Request Error: ${error.message}`)
    }
  }
)

// Helper functions for different HTTP methods
export const apiHelper = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await axiosInstance.get(url, config)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`)
    }
  },

  // POST request
  post: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config)
      return response.data
    } catch (error) {
      throw new Error(`Failed to create data: ${error.message}`)
    }
  },

  // PUT request
  put: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.put(url, data, config)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update data: ${error.message}`)
    }
  },

  // PATCH request
  patch: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.patch(url, data, config)
      return response.data
    } catch (error) {
      throw new Error(`Failed to patch data: ${error.message}`)
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await axiosInstance.delete(url, config)
      return response.data
    } catch (error) {
      throw new Error(`Failed to delete data: ${error.message}`)
    }
  }
}

export default axiosInstance
