# Component Structure Documentation

This document outlines the organized component architecture of the React application, featuring modular organization and reusable shared components.

## 📁 Directory Structure

```
src/
├── components/
│   ├── layout/                 # Layout components
│   │   ├── Navigation.jsx      # Main navigation component
│   │   └── index.js           # Layout exports
│   │
│   ├── modules/               # Feature-based modules
│   │   ├── todo/              # Todo management module
│   │   │   ├── TodoApp.jsx    # Main todo orchestrator
│   │   │   ├── AddTodo.jsx    # Add todo form
│   │   │   ├── TodoList.jsx   # Todo list display
│   │   │   ├── TodoItem.jsx   # Individual todo item
│   │   │   └── index.js       # Todo module exports
│   │   │
│   │   └── user/              # User management module
│   │       ├── UserManagement.jsx  # Main user orchestrator
│   │       ├── UserList.jsx        # User list display
│   │       ├── UserForm.jsx        # User create/edit form
│   │       ├── UserDetails.jsx     # User detail view
│   │       └── index.js           # User module exports
│   │
│   └── shared/                # Reusable components
│       ├── Button.jsx         # Reusable button component
│       ├── Input.jsx          # Reusable input component
│       ├── Card.jsx           # Reusable card component
│       ├── LoadingSpinner.jsx # Loading spinner component
│       ├── Modal.jsx          # Modal dialog component
│       └── index.js           # Shared component exports
│
├── store/                     # Zustand stores
│   ├── todoStore.js          # Todo state management
│   └── userStore.js          # User state management
│
├── services/                  # API services
│   ├── api.js                # Todo API service
│   ├── userApi.js            # User API service
│   └── axiosHelper.js        # Axios configuration
│
└── index.scss                # Main SCSS styles
```

## 🏗️ Architecture Benefits

### 1. **Modular Organization**
- **Feature-based modules**: Each major feature (todo, user) has its own folder
- **Clear separation**: Layout, modules, and shared components are distinctly organized
- **Scalability**: Easy to add new modules without cluttering the structure

### 2. **Reusable Components**
- **Shared components**: Common UI elements that can be used across modules
- **Consistent design**: Standardized components ensure UI consistency
- **DRY principle**: Reduces code duplication and maintenance overhead

### 3. **Clean Imports**
- **Index files**: Simplify imports with barrel exports
- **Relative paths**: Clear, predictable import paths
- **Module boundaries**: Well-defined interfaces between modules

## 🧩 Component Categories

### Layout Components (`src/components/layout/`)
Components that define the overall application structure and navigation.

**Navigation.jsx**
- Main application navigation
- Module switching functionality
- Responsive design

### Module Components (`src/components/modules/`)
Feature-specific components organized by domain.

#### Todo Module (`src/components/modules/todo/`)
- **TodoApp.jsx**: Main orchestrator, handles error display and module initialization
- **AddTodo.jsx**: Form for creating new todos
- **TodoList.jsx**: Displays list of todos with statistics
- **TodoItem.jsx**: Individual todo item with edit/delete functionality

#### User Module (`src/components/modules/user/`)
- **UserManagement.jsx**: Main orchestrator, handles navigation between views
- **UserList.jsx**: Grid display of all users with CRUD actions
- **UserForm.jsx**: Comprehensive form for creating/editing users
- **UserDetails.jsx**: Detailed view of individual user information

### Shared Components (`src/components/shared/`)
Reusable UI components that can be used across different modules.

## 📦 Shared Component Library

### Button Component
```jsx
import { Button } from '../components/shared'

<Button 
  variant="primary" 
  size="md" 
  onClick={handleClick}
  loading={isLoading}
>
  Click Me
</Button>
```

**Props:**
- `variant`: 'primary', 'secondary', 'success', 'warning', 'danger'
- `size`: 'sm', 'md', 'lg'
- `loading`: boolean
- `disabled`: boolean
- `type`: 'button', 'submit', 'reset'

### Input Component
```jsx
import { Input } from '../components/shared'

<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={setEmail}
  required
  error={emailError}
/>
```

**Props:**
- `label`: string
- `type`: HTML input types
- `required`: boolean
- `error`: string (error message)
- `disabled`: boolean

### Card Component
```jsx
import { Card } from '../components/shared'

<Card 
  header={<h3>Card Title</h3>}
  footer={<Button>Action</Button>}
  hover
>
  Card content goes here
</Card>
```

**Props:**
- `header`: ReactNode
- `footer`: ReactNode
- `variant`: 'default', 'elevated', 'bordered', 'flat'
- `hover`: boolean

### LoadingSpinner Component
```jsx
import { LoadingSpinner } from '../components/shared'

<LoadingSpinner 
  size="lg" 
  message="Loading users..." 
/>
```

**Props:**
- `size`: 'sm', 'md', 'lg'
- `message`: string
- `showMessage`: boolean

### Modal Component
```jsx
import { Modal } from '../components/shared'

<Modal
  isOpen={isModalOpen}
  onClose={closeModal}
  title="Confirm Action"
  size="md"
>
  Modal content here
</Modal>
```

**Props:**
- `isOpen`: boolean
- `onClose`: function
- `title`: string
- `size`: 'sm', 'md', 'lg', 'xl'
- `closeOnOverlayClick`: boolean
- `showCloseButton`: boolean

## 🔄 Import Patterns

### Module Imports
```jsx
// Import entire module
import { TodoApp, AddTodo, TodoList } from './components/modules/todo'
import { UserManagement, UserList } from './components/modules/user'

// Import layout components
import { Navigation } from './components/layout'

// Import shared components
import { Button, Card, Modal } from './components/shared'
```

### Store Imports
```jsx
// Stores use absolute paths from src
import useTodoStore from '../../../store/todoStore'
import useUserStore from '../../../store/userStore'
```

## 🎨 Styling Integration

All shared components are styled using the pure SCSS approach defined in `src/index.scss`:

- **Consistent design system**: Colors, typography, and spacing
- **Responsive design**: Mobile-first approach with breakpoint mixins
- **Component-specific styles**: Each shared component has dedicated SCSS rules
- **Hover effects and animations**: Smooth transitions and interactions

## 🔧 Development Workflow

### Adding New Modules
1. Create new folder in `src/components/modules/`
2. Add module components
3. Create `index.js` for exports
4. Update main App.jsx imports
5. Add module-specific styles if needed

### Adding New Shared Components
1. Create component in `src/components/shared/`
2. Add to `src/components/shared/index.js`
3. Add component styles to `src/index.scss`
4. Document props and usage examples

### Best Practices
- **Single responsibility**: Each component should have one clear purpose
- **Prop validation**: Use PropTypes for all components
- **Consistent naming**: Use PascalCase for components, camelCase for props
- **Documentation**: Comment complex logic and provide usage examples

## 🚀 Benefits of This Structure

1. **Maintainability**: Easy to locate and modify components
2. **Reusability**: Shared components reduce code duplication
3. **Scalability**: Simple to add new features and modules
4. **Team collaboration**: Clear boundaries and responsibilities
5. **Testing**: Isolated components are easier to test
6. **Bundle optimization**: Tree-shaking works effectively with this structure

This organized structure promotes clean code, maintainability, and scalability while providing a robust foundation for future development. 