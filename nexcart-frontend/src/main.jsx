import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/reducers/store.js'
import Theme from './Theme.js'
import { ThemeProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={Theme} >
    <Provider store={store}>
      <App />
    </Provider>,
  </ThemeProvider>
)
