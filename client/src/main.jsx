import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { CallContextProvider } from './context/CallContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <SocketContextProvider>
        <CallContextProvider>
      <App/>
        </CallContextProvider>
      </SocketContextProvider>
  </React.StrictMode>,
)