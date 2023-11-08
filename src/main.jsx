import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs';
import { Provider } from 'react-redux'
import {store} from "./Redux/store.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StyleProvider hashPriority='high'>
    <Provider store={store} >
    <App />
    </Provider>
  </StyleProvider>
  </BrowserRouter>,
)
