import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'

import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './redux/store'
import { router } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
