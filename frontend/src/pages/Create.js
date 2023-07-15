import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'


const Create = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDate] = useState('')
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies()

  const config = {
    headers:{
      'x-auth-token':cookies.access_token
    }
  }


  const userID = window.localStorage.getItem('userID')
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
       await axios.post(`https://task-management-rouge.vercel.app/task/${userID}`,{
        title,
        description,
        dueDate
      },config)
      console.log('task createed')
      navigate('/task-fetch')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    userID ?
    <div className='main-div'>
        <h1>Create Task</h1>
        <div className='form'>
            <div className='txtfield'>
                <label>Title</label>
                <input type = 'text' required onChange ={e=>setTitle(e.target.value)} />
            </div>
            <div className='txtfield'>
                <label>Description</label>
                <textarea type = 'text' required onChange={e=>setDescription(e.target.value)} />
            </div>
            <div className='txtfield'>
                <label>Due date</label>
                <input type = 'date' required onChange={e=>setDate(e.target.value)}  />
            </div>

            <button onClick={handleSubmit}>+Add</button>
        </div>
    </div>: <h1>Restricted Access</h1>
  )
}

export default Create
