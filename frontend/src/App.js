import './App.css';
import {useState} from'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Create from './pages/Create'
import Home from './pages/Home'
import Edit from './pages/Edit'
import { useCookies } from 'react-cookie'


function App() {
  const [cookies, setCookies,removeCookie] = useCookies()
  const [login, setLogin] = useState(false)
  const token= cookies.access_token

  const handleLogin = ()=>{
    removeCookie('access_token', { path: '/', domain: 'localhost' });
    window.localStorage.removeItem('userID')
  }
  return (
    <div className="App">
      <Router>
        <button onClick={handleLogin} style={{position:'absolute', top:'2%', left:'2%'}}><Link to='/login'>{token? 'LOGOUT' : 'LOGIN'}</Link></button>
        <Routes>
          <Route path = '/login' index element={<Login />} />
          <Route path = '/register' element={<Register />} />
          <Route path = '/task-create' element={<Create />} />
          <Route path = '/task-fetch' element={<Home />} />
          <Route path = '/task-edit' element={<Edit />} />
              
        </Routes>
      </Router>
    </div>
  );
}

export default App;
