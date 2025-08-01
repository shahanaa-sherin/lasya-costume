import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SearchProvider } from './context/SearchContext.jsx';

createRoot(document.getElementById('root')).render(


<React.StrictMode>
  <SearchProvider>
    <App />
  </SearchProvider>
</React.StrictMode>

)
