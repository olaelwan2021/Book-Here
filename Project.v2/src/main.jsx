import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import "@popperjs/core/dist/umd/popper.min.js"
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./responsive.css"

import '@fortawesome/fontawesome-free/css/all.min.css'

import "@fontsource/poppins"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
