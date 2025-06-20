// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './state/store'
import KeplerConfirmedApp from './KeplerConfirmedApp'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <KeplerConfirmedApp />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
)

reportWebVitals()


