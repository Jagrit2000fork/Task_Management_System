import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [values,setValues]=useState({
    name:"",
    description:"",
    status:""
  })
  const navigate= useNavigate();
    axios.defaults.withCredentials=true;
    useEffect(()=>{
         axios.get('http://localhost:8081/')
         .then(res => {
            if(res.data.Status=== "Success")
            {

            }
            else
            {
                navigate('/login');
            }
        })
         .catch(err => console.log(err));
    },[])
  const handleSubmit=(e) =>{
    e.preventDefault();
    axios.post('http://localhost:8081/task',values)
    .then(res => {
        console.log(res);
        navigate('/');
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h2>
                Add Task
            </h2>
            <div className='mb-2'>
               <label htmlFor="">Task Name</label>
               <input type='text' placeholder='Enter Name' className='form-control' 
               onChange={e => setValues({...values,name:e.target.value})}
               />
            </div>
            <div className='mb-2'>
               <label htmlFor="">Task Description</label>
               <textarea placeholder='Brief About the Task' className='form-control'
               onChange={e => setValues({...values,description:e.target.value})}
               >
               </textarea>
            </div>
            <div className="mb-2">
            <label htmlFor="">Status</label>
            <select className="form-select" aria-label="Default select example" 
            onChange={e => setValues({...values,status:e.target.value})} defaultValue="Choose">
            <option value="Choose" disabled>Select the Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            </select>
            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default Create
