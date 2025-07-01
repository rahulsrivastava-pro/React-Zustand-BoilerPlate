# Styling Architecture - Pure SCSS

This project uses a **pure SCSS** approach for styling, providing advanced CSS features, maintainable code organization, and responsive design without external utility frameworks.

## 🏗️ Architecture Overview

### Technology Stack
- **SCSS (Sass)**: For advanced CSS features, mixins, variables, and nested selectors
- **Vite**: For fast development and building with native SCSS support
- **Modern CSS**: Flexbox, Grid, CSS Custom Properties, and advanced selectors

## 📁 File Structure

```
src/
├── index.scss                # Main SCSS file with all styles
└── services/
    └── README.md             # API services documentation
```

## 🎨 Styling Approach

### 1. **SCSS Variables**
Centralized color palette and design tokens:
```scss
$primary-color: #2c3e50;
$secondary-color: #34495e;
$accent-color: #3498db;
$success-color: #27ae60;
$warning-color: #f39c12;
$danger-color: #e74c3c;
```

### 2. **Responsive Design with Mixins**
Mobile-first responsive design using SCSS mixins:
```scss
@mixin responsive($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: 479px) { @content; }
  }
  @if $breakpoint == tablet {
    @media (min-width: 768px) { @content; }
  }
  // ... more breakpoints
}
```

### 3. **Component Mixins**
Reusable component patterns:
```scss
@mixin button-variant($bg-color, $text-color: $white, $hover-bg: darken($bg-color, 10%)) {
  @include button-base;
  background-color: $bg-color;
  color: $text-color;
  // ... hover and focus states
}
```

## 🔧 Configuration

### Vite Configuration
Vite automatically handles SCSS compilation with no additional configuration needed. The `sass` package provides the SCSS compiler.

### Package Dependencies
```json
{
  "devDependencies": {
    "sass": "^1.89.2"
  }
}
```

## 🧩 Component Styling System

### Button System
Comprehensive button styling with variants and states:

**Base Button Mixin:**
```scss
@mixin button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
```

**Button Variants:**
- Primary: `@include button-variant($accent-color)`
- Success: `@include button-variant($success-color)`
- Warning: `@include button-variant($warning-color)`
- Danger: `@include button-variant($danger-color)`

### Card System
Flexible card layouts with consistent styling:

```scss
@mixin card-base {
  background-color: $white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}
```

### Input System
Consistent form input styling:

```scss
@mixin input-base {
  padding: 0.75rem 1rem;
  border: 2px solid $border-color;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: $accent-color;
    box-shadow: 0 0 0 3px rgba($accent-color, 0.15);
  }
}
```

## 📱 Responsive Design

### Breakpoint System
```scss
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
$large: 1200px;
```

### Responsive Patterns
```scss
.navigation {
  padding: 1rem 1.25rem;
  
  @include responsive(tablet) {
    padding: 1rem 1.5rem;
  }
}

.user-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
  
  @include responsive(tablet) {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  }
}
```

## 🎯 SCSS Features Used

### 1. **Variables**
```scss
$primary-color: #2c3e50;
$text-dark: #2c3e50;
$text-light: #7f8c8d;
$border-color: #e1e5e9;
```

### 2. **Mixins**
```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### 3. **Nested Selectors**
```scss
.user-card {
  background-color: $white;
  border-radius: 0.75rem;
  
  &-header {
    padding: 1rem;
    background-color: #f8fafc;
    
    .user-name {
      font-size: 1.125rem;
      font-weight: 600;
    }
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}
```

### 4. **Functions**
```scss
// Using Sass built-in functions
background-color: darken($primary-color, 10%);
border-color: lighten($border-color, 5%);
```

## 🎨 Animation System

### Keyframe Animations
```scss
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Usage in Components
```scss
.add-todo {
  animation: fadeIn 0.3s ease-in-out;
}

.todos-container {
  animation: slideUp 0.3s ease-out;
}
```

## 🚀 Development Workflow

### Adding New Styles
1. **Use existing variables**: Leverage the defined color palette and spacing
2. **Create mixins for reusable patterns**: Keep DRY principles
3. **Follow BEM-like naming**: Use nested selectors with `&` for modifiers
4. **Mobile-first approach**: Use responsive mixins for larger screens

### Best Practices
- **Consistent naming**: Use descriptive class names and BEM methodology
- **Component organization**: Group related styles with nested selectors
- **Performance**: Use efficient selectors and avoid deep nesting (max 3-4 levels)
- **Maintainability**: Use variables and mixins to avoid code duplication

## 🔍 Code Organization

### Main Sections in index.scss
1. **Variables**: Colors, breakpoints, spacing
2. **Mixins**: Reusable component patterns
3. **Animations**: Keyframe definitions
4. **Base styles**: Reset and global styles
5. **Navigation**: Header and navigation components
6. **Todo App**: Todo-specific components
7. **User Management**: User-specific components
8. **Common**: Shared utility classes

### Example Component Structure
```scss
.component-name {
  // Base styles
  display: flex;
  padding: 1rem;
  
  // Nested elements
  &-header {
    background-color: $primary-color;
    
    .title {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
  
  // Modifiers
  &.variant-name {
    background-color: $accent-color;
  }
  
  // States
  &:hover {
    transform: translateY(-2px);
  }
  
  // Responsive
  @include responsive(tablet) {
    padding: 1.5rem;
  }
}
```

## 📦 Build Process

The build process automatically:
1. Compiles SCSS to CSS
2. Applies vendor prefixes automatically
3. Minifies CSS in production
4. Provides source maps for debugging

## 🎨 Customization

### Changing Colors
Update variables at the top of `index.scss`:
```scss
$primary-color: #your-color;
$accent-color: #your-accent;
```

### Adding New Components
1. Follow the existing pattern structure
2. Use established mixins and variables
3. Include responsive design considerations
4. Add hover and focus states for interactive elements

### Responsive Customization
Add new breakpoints or modify existing ones:
```scss
$extra-large: 1440px;

@mixin responsive($breakpoint) {
  // ... existing breakpoints
  @if $breakpoint == extra-large {
    @media (min-width: #{$extra-large}) { @content; }
  }
}
```

This pure SCSS architecture provides complete control over styling while maintaining excellent performance, maintainability, and developer experience. The approach leverages modern CSS features and SCSS's powerful capabilities to create a robust styling system without external dependencies. 