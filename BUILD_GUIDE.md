# Production Build Guide

This guide covers everything you need to know about creating production builds for the React Zustand Todo application.

## 🚀 Quick Start

### Basic Production Build
```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

## 📋 Build Commands

### Available Scripts
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type checking (if TypeScript)
npm run type-check
```

## 🏗️ Build Process

### 1. **Pre-build Checks**
Before creating a production build, ensure:

```bash
# Install all dependencies
npm install

# Run linting to catch issues
npm run lint

# Test the application
npm test  # (if tests are configured)

# Check for outdated packages
npm outdated
```

### 2. **Production Build**
```bash
# Clean build (remove previous build)
rm -rf dist  # Linux/Mac
rmdir /s dist  # Windows

# Create production build
npm run build
```

### 3. **Build Output**
The build process creates a `dist/` folder with:
```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-[hash].js  # Bundled JavaScript
│   ├── index-[hash].css # Bundled CSS
│   └── [assets]        # Other static assets
└── vite.svg            # Favicon
```

## ⚡ Build Optimizations

### Vite Configuration
Create or update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate source maps for debugging
    sourcemap: false, // Set to true for debugging
    
    // Minify the output
    minify: 'terser',
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          zustand: ['zustand'],
          axios: ['axios']
        }
      }
    },
    
    // Terser options for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },
  
  // Base URL for production
  base: './', // Use relative paths
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true
  }
})
```

### Package.json Scripts
Update your `package.json` with additional build scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "build:analyze": "vite build --mode analyze",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "clean": "rimraf dist",
    "prebuild": "npm run clean && npm run lint"
  }
}
```

## 🌍 Environment Configuration

### Environment Files
Create environment-specific files:

```bash
# .env.local (local development)
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=local

# .env.staging
VITE_API_URL=https://staging-api.yourapp.com
VITE_APP_ENV=staging

# .env.production
VITE_API_URL=https://api.yourapp.com
VITE_APP_ENV=production
```

### Using Environment Variables
Update your API configuration:

```javascript
// src/services/axiosHelper.js
const baseURL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com'
const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD

export const axiosConfig = {
  baseURL,
  timeout: isProduction ? 10000 : 30000,
  // Add other production-specific configs
}
```

## 📊 Build Analysis

### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ]
})

# Build with analysis
npm run build
```

### Performance Monitoring
Add performance monitoring to your build:

```javascript
// src/utils/performance.js
export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0]
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart)
    })
  }
}
```

## 🚀 Deployment Options

### 1. **Static Hosting (Netlify, Vercel)**
```bash
# Build for static hosting
npm run build

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=dist

# Deploy to Vercel
npx vercel --prod
```

### 2. **Docker Deployment**
Create `Dockerfile`:

```dockerfile
# Multi-stage build
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

Build and run Docker:
```bash
docker build -t react-zustand-app .
docker run -p 80:80 react-zustand-app
```

### 3. **GitHub Pages**
Add to `package.json`:
```json
{
  "homepage": "https://username.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

```bash
npm install --save-dev gh-pages
npm run deploy
```

## 🔧 Build Optimization Checklist

### Performance Optimizations
- [ ] **Code Splitting**: Implement lazy loading for routes
- [ ] **Tree Shaking**: Remove unused code
- [ ] **Minification**: Enable CSS and JS minification
- [ ] **Compression**: Enable Gzip/Brotli compression
- [ ] **Caching**: Set proper cache headers
- [ ] **Bundle Analysis**: Monitor bundle sizes

### Code Splitting Example
```javascript
// src/App.jsx
import { lazy, Suspense } from 'react'
import { LoadingSpinner } from './components/shared'

const TodoApp = lazy(() => import('./components/modules/todo/TodoApp'))
const UserManagement = lazy(() => import('./components/modules/user/UserManagement'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading module..." />}>
      {/* Your app content */}
    </Suspense>
  )
}
```

### Asset Optimization
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const extType = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  }
})
```

## 🧪 Testing Production Build

### Local Testing
```bash
# Build and test locally
npm run build
npm run preview

# Test on different devices
npx serve dist -p 3000
```

### Automated Testing
```bash
# Install testing dependencies
npm install --save-dev @playwright/test

# Create test script
# tests/production.spec.js
import { test, expect } from '@playwright/test'

test('production build loads correctly', async ({ page }) => {
  await page.goto('http://localhost:4173')
  await expect(page.locator('h1')).toContainText('Todo Management')
})
```

## 📈 Performance Monitoring

### Lighthouse CI
```bash
# Install Lighthouse CI
npm install --save-dev @lhci/cli

# Create lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173'],
      startServerCommand: 'npm run preview',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}]
      }
    }
  }
}

# Run Lighthouse CI
npx lhci autorun
```

## 🔒 Security Considerations

### Content Security Policy
Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://jsonplaceholder.typicode.com;">
```

### Environment Security
```bash
# Never commit sensitive data
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore

# Use environment variables for sensitive data
VITE_API_KEY=your-api-key-here
```

## 🚨 Troubleshooting

### Common Build Issues

**1. Memory Issues**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**2. Path Issues**
```javascript
// vite.config.js
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/your-app/' : '/'
})
```

**3. SCSS Issues**
```bash
# Ensure SASS is installed
npm install --save-dev sass
```

### Build Verification
```bash
# Check build output
ls -la dist/
du -sh dist/

# Verify files are minified
head -c 200 dist/assets/*.js
```

## 📝 Build Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] Check bundle sizes are reasonable
- [ ] Verify all routes work correctly
- [ ] Test on different browsers
- [ ] Validate responsive design
- [ ] Check console for errors
- [ ] Verify API endpoints work
- [ ] Test offline functionality (if applicable)
- [ ] Run security checks
- [ ] Update documentation

## 🎯 Next Steps

1. **Set up CI/CD pipeline** for automated builds
2. **Configure monitoring** for production performance
3. **Implement error tracking** (e.g., Sentry)
4. **Set up automated testing** in CI/CD
5. **Configure CDN** for better global performance

This build guide ensures your React Zustand application is production-ready with optimal performance and reliability. 