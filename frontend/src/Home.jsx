import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'
const endpoint="http://localhost:5000";
function Home() {
    const [data,setData]= useState([])
    const [auth,setAuth]=useState(false);
    const [name, setName] = useState('');
    const [socket,setSocket]=useState(null);
    const [notification,setNotification]=useState([]);
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
    useEffect( ()=>{
         axios.get('http://localhost:8081/')
         .then(res => {
            if(res.data.Status=== "Success")
            {
                setData(res.data.tasks);
                setAuth(true);
                setName(res.data.name);
                setSocket(io(endpoint));
            }
            else
            {
                setAuth(false);
                navigate('/login');
            }
        })
         .catch(err => console.log(err));
    },[])
    useEffect(()=>{
        if(socket!=null)
        {
           socket.on('Notification',(msg)=>{
            console.log(msg);
           })
        }
    })
    const handleDelete=(id)=>{
         axios.delete('http://localhost:8081/delete/'+id)
         .then(res => {
              location.reload();
         })
         .catch(err => console.log(err))
    }
    const handleLogout=()=>{
        axios.get('http://localhost:8081/logout')
        .then(res => {
             location.reload(true);
        })
        .catch(err => console.log(err))
   }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items center'>
        <div className='w-60 bg-white rounded p-3 text-center'>
            <h2>{name}'s Task List</h2>
            <div className='d-flex justify-content-end'>
                <Link to="/create" className='btn btn-success'>
                 Create+
                </Link>
            </div>

      <table className='table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action </th>
            </tr>
        </thead>
        <tbody>
            {data.map((task,index)=>{
                return <tr key={index}>
                    <td>{task.taskid}</td>
                    <td>{task.task_name}</td>
                    <td>{task.task_description}</td>
                    <td>{task.status}</td>
                    <td> 
                        <Link to={`/edit/${task.taskid}`} className='btn btn-sm btn-primary mx-2'> Edit </Link>
                        <button onClick={()=>handleDelete(task.taskid)} className='btn btn-sm btn-danger'> Delete</button>
                    </td>
                </tr>
            })}
        </tbody>
      </table>
      <Link to="/login" className='btn btn-success' onClick={handleLogout}>
                 Logout
      </Link>
      </div>
    </div>
  )
}

export default Home
