
import Login from './components/pages/Login'
import SignUP from './components/pages/SignUP'
import Home from './components/home/Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUP/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App