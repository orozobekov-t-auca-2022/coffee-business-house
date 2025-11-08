import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import ThemeProvider from './provider/ThemeProvider'
import { CartProvider } from './context/CartContext'
import { SideBarProvider } from './context/SideBarProvider.tsx'

const basename = import.meta.env.BASE_URL || '/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <CartProvider>
          <SideBarProvider>
            <App />
          </SideBarProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  // </React.StrictMode>,
)