import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import './Register.scss'


const Register = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [_, setCookies] = useCookies(['access_token'])

    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
    try {
        const response = await axios.post('https://task-management-rouge.vercel.app/auth/register',{
            name,
            email,
            password
        })

        setCookies("access_token", response.data[0])
        window.localStorage.setItem('userID', response.data[1])
        navigate('/task-fetch')
    } catch (err) {
        console.error(err)
    }
    }
  return (
    <div className='main-div'>
        <h1>Register</h1>
        <div className='form'>
            <div className='txtfield'>
                <label>Name</label>
                <input type = 'text' required onChange={e => setName(e.target.value)} />
            </div>
            <div className='txtfield'>
                <label>email</label>
                <input type = 'email' required onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='txtfield'>
                <label>Password</label>
                <input type = 'password' required onChange={e => setPassword(e.target.value)} />
            </div>

            <button onClick={handleSubmit}>Sign-up</button>
            <div className='signinLink'><Link style={{textDecoration:'none'}} to='/Login'> Sign-in. </Link></div>
        </div>
    </div>
  )
}

export default Register
