# API Services Documentation

This directory contains all the API service files for the React Zustand application.

## Files Overview

### `axiosHelper.js`
A centralized Axios configuration and helper utility that provides:

- **Configured Axios Instance**: Pre-configured with JSONPlaceholder base URL and common settings
- **Request/Response Interceptors**: Automatic logging and error handling
- **Helper Methods**: Simplified API methods for GET, POST, PUT, PATCH, and DELETE operations
- **Error Handling**: Consistent error handling across all API calls

#### Usage Example:
```javascript
import { apiHelper } from './axiosHelper'

// GET request
const data = await apiHelper.get('/users')

// POST request
const newUser = await apiHelper.post('/users', userData)

// PUT request
const updatedUser = await apiHelper.put('/users/1', userData)

// DELETE request
await apiHelper.delete('/users/1')
```

### `api.js`
Todo-related API operations using the Axios helper:
- `fetchTodos()` - Get all todos (limited to 20)
- `createTodo(todoData)` - Create a new todo
- `updateTodo(id, todoData)` - Update an existing todo
- `deleteTodo(id)` - Delete a todo

### `userApi.js`
User-related API operations using the Axios helper:
- `fetchUsers()` - Get all users
- `fetchUser(id)` - Get a single user by ID
- `createUser(userData)` - Create a new user
- `updateUser(id, userData)` - Update an existing user
- `deleteUser(id)` - Delete a user

## Features

### Automatic Request Logging
All requests are automatically logged to the console with method and URL information.

### Centralized Error Handling
- Network errors are handled consistently
- Server errors include status codes and messages
- Request timeouts are set to 10 seconds

### Request/Response Interceptors
- Request interceptor: Logs outgoing requests
- Response interceptor: Logs successful responses and handles errors

### TypeScript-Ready
The helper is designed to work well with TypeScript projects.

## Configuration

The Axios instance is configured with:
- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Timeout**: 10 seconds
- **Headers**: `Content-Type: application/json`

You can modify these settings in `axiosHelper.js` as needed for your project. 