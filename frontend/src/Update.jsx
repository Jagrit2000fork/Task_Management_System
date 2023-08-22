import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
function Update() {
    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:8081/read/'+id)
    .then(res => {
        console.log(res);
        setValues({...values,name:res.data[0].task_name,description:res.data[0].task_description,status:res.data[0].status});
    })
    .catch(err => console.log(err))
    },[])
    const [values,setValues]=useState({
        name:'',
        description:'',
        status:''
      })
    const handleUpdate=(e)=>{
        e.preventDefault();
        axios.put('http://localhost:8081/update/'+id,values)
        .then(res=>{
            console.log(res);
            navigate('/');
        })
        .catch(err=> console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
            <h2>
                Update Task
            </h2>
            <div className='mb-2'>
               <label htmlFor="">Task Name</label>
               <input type='text' placeholder='Enter Name' className='form-control' value={values.name} 
               onChange={e => setValues({...values,name:e.target.value})}
               />
            </div>
            <div className='mb-2'>
               <label htmlFor="">Task Description</label>
               <textarea placeholder='Brief About the Task' className='form-control' value={values.description}
               onChange={e => setValues({...values,description:e.target.value})}
               >
               </textarea>
            </div>
            <div className="mb-2">
            <label htmlFor="">Status</label>
            <select className="form-select" aria-label="Default select example" 
            onChange={e => setValues({...values,status:e.target.value})} value={values.status}>
            <option value="Choose" disabled>Select the Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            </select>
            </div>
            <button className='btn btn-success'>Update</button>
        </form>
    </div>
    </div>
  )
}

export default Update
