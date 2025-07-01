import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react({
        // Enable React Fast Refresh in development
        fastRefresh: !isProduction,
        // Optimize JSX in production
        jsxRuntime: 'automatic'
      })
    ],
    
    // Build configuration
    build: {
      // Output directory
      outDir: 'dist',
      
      // Generate source maps for debugging (disable in production for security)
      sourcemap: mode === 'development',
      
      // Minify the output
      minify: isProduction ? 'terser' : false,
      
      // Chunk size warning limit (in KB)
      chunkSizeWarningLimit: 1000,
      
      // Target browsers
      target: 'es2015',
      
      // Rollup options for advanced bundling
      rollupOptions: {
        output: {
          // Manual chunks for better caching strategy
          manualChunks: {
            // Vendor chunk for React ecosystem
            'react-vendor': ['react', 'react-dom'],
            // State management
            'zustand': ['zustand'],
            // HTTP client
            'axios': ['axios'],
            // Utilities (if you add more utility libraries)
            // 'utils': ['lodash', 'date-fns'] // Example
          },
          
          // Custom asset file naming
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const extType = info[info.length - 1]
            
            // Organize assets by type
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `assets/images/[name]-[hash][extname]`
            }
            if (/css/i.test(extType)) {
              return `assets/css/[name]-[hash][extname]`
            }
            if (/woff2?|eot|ttf|otf/i.test(extType)) {
              return `assets/fonts/[name]-[hash][extname]`
            }
            return `assets/[name]-[hash][extname]`
          },
          
          // Custom chunk file naming
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      },
      
      // Terser options for production minification
      terserOptions: isProduction ? {
        compress: {
          // Remove console.log in production
          drop_console: true,
          // Remove debugger statements
          drop_debugger: true,
          // Remove unused code
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        },
        mangle: {
          // Mangle function names for smaller bundle
          safari10: true
        },
        format: {
          // Remove comments
          comments: false
        }
      } : {},
      
      // CSS code splitting
      cssCodeSplit: true,
      
      // Inline small assets as base64
      assetsInlineLimit: 4096, // 4KB
      
      // Enable/disable CSS minification
      cssMinify: isProduction,
      
      // Report compressed size
      reportCompressedSize: isProduction,
      
      // Emit manifest for deployment tools
      manifest: isProduction
    },
    
    // Base URL configuration
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    
    // Development server configuration
    server: {
      port: 3000,
      host: true, // Allow external connections
      open: true, // Auto-open browser
      cors: true,
      // Proxy API requests in development
      proxy: {
        '/api': {
          target: 'https://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    
    // Preview server configuration (for production build testing)
    preview: {
      port: 4173,
      host: true,
      cors: true
    },
    
    // CSS configuration
    css: {
      preprocessorOptions: {
        scss: {
          // Add global SCSS variables/mixins if needed
          // additionalData: `@use 'sass:color';` // Removed - already imported in main SCSS
        }
      },
      // PostCSS configuration
      postcss: {
        plugins: isProduction ? [
          // Add autoprefixer and other PostCSS plugins for production
          // require('autoprefixer'),
          // require('cssnano')
        ] : []
      }
    },
    
    // Dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'zustand',
        'axios'
      ],
      // Force optimize these dependencies
      force: false
    },
    
    // Environment variables configuration
    define: {
      // Define global constants
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    },
    
    // ESBuild configuration
    esbuild: {
      // Remove console.log in production via esbuild
      drop: isProduction ? ['console', 'debugger'] : [],
      // Legal comments handling
      legalComments: 'none'
    },
    
    // Worker configuration
    worker: {
      format: 'es'
    }
  }
}) 