//REACT DEPENDENCIES
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//ROUTER DOM
import { BrowserRouter } from 'react-router-dom'
//REDUX DEPENDENCIES
import { Provider } from 'react-redux'
import store from "./redux/store.js"
//STYLES
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
)
