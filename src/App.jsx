//ROUTER DOM
import { Route, Routes } from 'react-router-dom'
//COMPONENTS
import Home from './components/home'
//STYLES
import './App.css'
import Signin from './components/signin'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
  )
}

export default App