//ROUTER DOM
import { Route, Routes } from 'react-router-dom'
//COMPONENTS
import Home from './components/home'
//STYLES
import './App.css'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App