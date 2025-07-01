# React Zustand Todo App

A modern todo application built with React 19, Zustand for state management, and the JSONPlaceholder API for backend data.

## Features

- ✅ **React 19**: Built with the latest React features
- 🗃️ **Zustand State Management**: Lightweight and powerful state management
- 🌐 **JSONPlaceholder API**: Real API integration for CRUD operations
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Vite**: Fast development server and build tool
- 🎨 **Modern UI**: Clean and intuitive user interface

## Functionality

- **View Todos**: Displays todos fetched from JSONPlaceholder API
- **Add Todos**: Create new todo items
- **Edit Todos**: Inline editing of todo titles
- **Toggle Completion**: Mark todos as completed/incomplete
- **Delete Todos**: Remove todos with confirmation
- **Real-time Stats**: Shows total, pending, and completed counts
- **Error Handling**: Graceful error handling with user feedback
- **Loading States**: Loading indicators for better UX

## Technology Stack

- **React 19** - UI framework
- **Zustand 5** - State management
- **Vite 6** - Build tool and dev server
- **JSONPlaceholder** - Mock REST API
- **CSS3** - Styling with modern CSS features

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── AddTodo.jsx       # Component for adding new todos
│   ├── TodoList.jsx      # Component for displaying todo list
│   └── TodoItem.jsx      # Individual todo item component
├── services/
│   └── api.js           # API service for JSONPlaceholder
├── store/
│   └── todoStore.js     # Zustand store for state management
├── App.jsx              # Main application component
├── main.jsx             # React entry point
└── index.css            # Global styles
```

## State Management with Zustand

The app uses Zustand for state management with the following features:

- **Simple Store**: Minimal boilerplate compared to Redux
- **TypeScript Ready**: Full TypeScript support
- **Async Actions**: Built-in support for async operations
- **Selectors**: Efficient component re-rendering
- **Middleware**: Using subscribeWithSelector for advanced features

## API Integration

The app integrates with the JSONPlaceholder API:

- **GET /todos** - Fetch todos (limited to first 20)
- **POST /todos** - Create new todo
- **PUT /todos/:id** - Update existing todo
- **DELETE /todos/:id** - Delete todo

Note: JSONPlaceholder is a mock API, so changes aren't persisted on the server.

## Responsive Design

The application is fully responsive and includes:

- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly interaction elements
- Optimized typography for different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the mock API
- [Zustand](https://github.com/pmndrs/zustand) for the excellent state management library
- [Vite](https://vitejs.dev/) for the fast build tool
- [React](https://reactjs.org/) for the amazing UI framework 