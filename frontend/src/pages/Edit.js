import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {BsPencil} from 'react-icons/bs'
import {AiOutlineDelete, AiOutlineClose} from 'react-icons/ai'

import './Home.scss'
const Home = () => {
  const[data, setdata]=useState()
  const [task, setTask] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState()
  const userID = window.localStorage.getItem('userID')
  
  const fetchData =async()=>{
    let response = await axios.get('https://task-management-rouge.vercel.app/task/')
    console.log(response.data)
    setdata(response.data)
  }


  const fetchTask = async(id)=>{
    setId(id)
    let response = await axios.get(`https://task-management-rouge.vercel.app/task/${id}`)
    console.log(response.data) 
    setTask(response.data)
    setShowModal(!showModal)
  }
  
  const editTask = async(e)=>{
    e.preventDefault();
    try {
       await axios.put(`https://task-management-rouge.vercel.app/task/${userID}/${id}`,
        task        
      )
      console.log('task updated')
      fetchData()
      setShowModal(!showModal)
    } catch (err) {
      console.log(err)
    }
  }


  const DeleteTask =async (id)=>{
    try {
      await axios.delete(`https://task-management-rouge.vercel.app/task/${userID}/${id}`)
      fetchData()
      console.log('deleted')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchData()
  },[task])


  return (
    userID ?
    <div>
    <div className='fetchdiv'>
      <div className='header'>
        <h1>Task details page</h1>
        <Link to='/task-fetch' style={{textDecoration:'none'}}> Go To Task Page</Link>
      </div>
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th colspan='2'>Actions</th>
        </tr>
        <tbody>
          {
            data && data.map((item,key)=>{
              return(
                <tr key={key}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.status}</td>
                  <td><BsPencil onClick={()=>fetchTask(item._id)} /></td>
                  <td><AiOutlineDelete onClick={()=>DeleteTask(item._id)} /></td>
                </tr>
              )
            })
          }
          
        </tbody>
        
        
      </table>


      
    </div>

      {
        showModal && 
        (<div className='modal'>
          <div className='overlay'>
            <div className='modal-content'>
              <AiOutlineClose className='closeicon'   onClick={()=>setShowModal(!showModal)} />
            <div className='txtfield'>
                <label>Title</label>
                <input type = 'text'  value={task.title}  onChange ={e=>setTask({...task, title : e.target.value}) } />
            </div>
            <div className='txtfield'>
                <label>Description</label>
                <textarea type = 'text'  value={task.description} onChange={e=>setTask({...task, description : e.target.value})} />
            </div>
            <div className='txtfield'>
                <label>Due date</label>
                <input type = 'date'  value={task.dueDate} onChange={e=>setTask({...task, dueDate : e.target.value})}  />
            </div>

            <div className='txtfield'>
                <label>Status</label>
                <input type = 'text'  value={task.status}  onChange ={e=>setTask({...task, status : e.target.value})} />
            </div>

            <button onClick={editTask}>Edit</button>
            </div>
          </div>
        </div>)
      }
    </div>:
    <h1>Restricted Access</h1>
  )
}

export default Home
