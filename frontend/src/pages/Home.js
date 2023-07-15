import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Home.scss'
const Home = () => {
  const[data, setdata]=useState([])
  const[filterValue, setFilterValue]=useState('ALL')
  const[sortValue, setSortValue]=useState('ASC')
  const navigate = useNavigate()

  const userID = window.localStorage.getItem('userID')
  
  const fetchData =async()=>{
    let response = await axios.get(`https://task-management-rouge.vercel.app/task/${userID}`)
    console.log(response.data)
    setdata(response.data)
  }

  const handleClick = ()=>{
    navigate('/task-create')
  }
  const handleEdit = ()=>{
    navigate('/task-edit')
  }

  let filterTasks = data.filter((task)=>{
    if(filterValue === 'Pending'){
      return task.status === 'Pending'
    }

    if(filterValue=== 'Completed'){
      return task.status === 'Completed'
    }

    else{
      return task
    }
  })

  let sortTasks = filterTasks.sort((a,b)=>{
    if(sortValue === 'ASC'){
      return new Date(a.dueDate) - new Date(b.dueDate)
    }

    else{
     return new Date(b.dueDate) - new Date(a.dueDate)
    }
  })

  useEffect(()=>{
    fetchData()
    console.log(sortTasks)
  },[])
  return (
    userID ?
    <div className='fetchdiv'>
      <div className='header'>
        <h1>List of all the Tasks</h1>
        <div style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
          <button onClick={handleClick}>+ Add Task</button>
          <button onClick={handleEdit}>Edit task</button>
        </div>
      </div>
      <div className='func'>
          <select onChange={e => setFilterValue(e.target.value)}>
            <option>ALL</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>


          <select onChange={e => setSortValue(e.target.value)}>
            <option value='ASC'>ASC</option>
            <option value='DSC'>DSC</option>
          </select>
      </div>
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
        </tr>
        <tbody>
          {
            sortTasks && sortTasks.map((item,key)=>{
              // let date = item.dueDate.split('T')
              let date = new Date(item.dueDate).toLocaleDateString()
              return(
                <tr key={key}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{date}</td>
                  <td>{item.status}</td>
                </tr>
              )
            })
          }
          
        </tbody>
        
        
      </table>
    </div> :   <h1>RestrictedAccesss</h1>
  )
}

export default Home
