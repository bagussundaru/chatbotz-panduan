import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../Layout.jsx' // Importing Layout to ensure global styles (if any) are loaded, though properly we should move css.
// Assuming global styles are in index.css which we need to check, or defined in Layout.js styled components?
// Layout.js viewed earlier had `import { Link } from 'react-router-dom'` etc.
// Let's create a basic index.css too just in case.

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
