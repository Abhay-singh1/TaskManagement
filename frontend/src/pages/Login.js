import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import './Login.scss'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [_, setCookies] = useCookies(['access_token'])

    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
    try {
        const response = await axios.post('https://task-management-rouge.vercel.app/auth/login',{
            email,
            password
        })
        console.log(response)
        setCookies("access_token", response.data[0])
        window.localStorage.setItem('userID', response.data[1])
        navigate('/task-fetch')
    } catch (err) {
        console.error(err)
    }
    }


  return (
    <div className='main-div'>
        <h1>Login</h1>
        <div className='form'>
            <div className='txtfield'>
                <label>email</label>
                <input type = 'email' required onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className='txtfield'>
                <label>Password</label>
                <input type = 'password' required onChange={e=>setPassword(e.target.value)} />
            </div>

            <button onClick={handleSubmit}>Sign-in</button>
            <div className='signupLink'><Link style={{textDecoration:'none'}} to='/register'> Create an Account. </Link></div>
        </div>
    </div>
  )
}

export default Login
