//ROUTER DOM
import { Route, Routes } from 'react-router-dom'
//COMPONENTS
import Home from './components/home'
//STYLES
import './App.css'
import Signin from './components/signin'
import CreateAccount from './components/createAccount'
import Settings from './components/settings'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/create' element={<CreateAccount />} />
      <Route path='/settings' element={<Settings />} />
    </Routes>
  )
}

export default App