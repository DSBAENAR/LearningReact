
import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'
 
//renderizar: .render()
createRoot(document.getElementById('root')).render(
  <App/>
)
