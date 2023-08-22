import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Login from './Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Update from './Update'
import Signup from './SignUp'
function App() {
 // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}   />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/create' element={<Create/>}   />
      <Route path='/edit/:id' element={<Update/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
