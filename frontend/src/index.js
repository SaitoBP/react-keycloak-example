import React from 'react'
import ReactDOM from 'react-dom'

/* Style */
import './style.css'

/* Router */
import Router from './pages/Router'

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
)
