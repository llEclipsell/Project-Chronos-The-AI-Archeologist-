import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import App from './App'
import './index.css'
import '@mantine/core/styles.css'; // Import Mantine styles

// Define the custom theme
const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  headings: {
    fontFamily: 'Orbitron, sans-serif', // Use Orbitron for headings
  },
  colors: {
    // Define custom color shades if needed, or rely on defaults + CSS variables
    primary: ['#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#004d40'],
    accent: ['#fcf8e8', '#f8efc6', '#f3e5a3', '#eed97f', '#e9cd5a', '#e5c032', '#cca02c', '#bfa05b', '#a5864e', '#8c6e42'], // Gold/Sand shades
  },
  primaryColor: 'primary', // Use our custom teal as primary
  components: {
    Button: {
      defaultProps: {
        radius: 'sm', // Slightly rounded buttons
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm', // Use custom shadow variable or Mantine's 'sm'
        radius: 'md',
        withBorder: true,
        style: { borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)'}
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'sm',
        style: { borderColor: 'var(--color-border)' }
      },
    },
    Title: {
      styles: (theme, props) => ({
         root: {
           color: props.order === 1 || props.order === 2 ? 'var(--color-primary)' : 'var(--color-text-primary)'
         }
      }),
    },
    Anchor: {
      defaultProps: {
        c: 'primary', // Use primary color for links
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
