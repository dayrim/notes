import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CssBaseline } from '@mui/material'

window.addEventListener('DOMContentLoaded', async () => {
  try {



    const container = document.getElementById('root')
    const root = createRoot(container!)
    root.render(
      <React.StrictMode>
        <CssBaseline />
        <App />
      </React.StrictMode>
    )



  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`)
  }
});

