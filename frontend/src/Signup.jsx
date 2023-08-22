// import React, { useState } from 'react'
// import axios from 'axios';
// import { Link,useNavigate} from 'react-router-dom';

// function Signup() {
//     const [values, setValues] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });
//     const navigate=useNavigate();
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post('http://localhost:8081/signup', values)
//             .then((res) => {
//                 console.log(res);
//                 navigate('/login');
//             }

//             )
//             .catch(err => console.log(err));
//     };

//   return (
//     <div className='d-flex justify-content-center  bg-light align-items-center vh-100'>
//     <div className='p-3 rounded w-25 border'>
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//             <div className='mb-3'>
//                 <label htmlFor="name"><strong>User Name</strong></label>
//                 <input type="text" placeholder='Enter UserName' name='name'
//                     className='form-control rounded-0' onChange={e => setValues({ ...values, name: e.target.value })} />
//             </div>

//             {/* {error.name && <p style={{color: red}}>{error.email}</p>} */}

//             <div className='mb-3'>

//                 <label htmlFor="email"><strong>Email</strong></label>

//                 <input type="email" placeholder='Enter Email' name='email'

//                     className='form-control rounded-0' autoComplete='off' onChange={e => setValues({ ...values, email: e.target.value })} />

//             </div>

//             <div className='mb-3'>

//                 <label htmlFor="password"><strong>Password</strong></label>

//                 <input type="password" placeholder='Enter Password' name='password'

//                     className='form-control rounded-0' onChange={e => setValues({ ...values, password: e.target.value })} />

//             </div>

//             <button type='submit' className='btn btn-success bg-primary w-100 rounded-0'> Sign Up</button>

//             <div>Already have an account <Link to="/login">Login</Link></div>

//         </form>

//     </div>

// </div>
//   )
// }

// export default Signup

import React, { useState } from 'react'

import axios from 'axios';

import { Link } from 'react-router-dom';

import validations from './validations';

import { useNavigate } from 'react-router-dom';

function Signup() {

    const [values, setValues] = useState({

        name: "",

        email: "",

        password: "",

        confirm_password: "",

    });

 

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
 

 

    const handleSubmit = async (event) => {

        event.preventDefault();

        const validationErrors = validations(values);

        setErrors(validationErrors);

        console.log(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            try {
                const response = await axios.post('http://localhost:8081/signup', values);
                if(response.data.Status === "Success") {
                    navigate('/login');
            }
            } catch (error) {

                console.log("Error:", error);
            }

        }

    };

 

 

 

    return (

        <>

            <div className='d-flex justify-content-center  bg-light align-items-center vh-100'>

                <div className='p-3 rounded w-25 border'>

                    <h2>Sign Up</h2>

                    <form onSubmit={handleSubmit}>

                        <div className='mb-3'>

                            <label htmlFor="name"><strong>User Name</strong></label>

                            <input type="text" placeholder='Enter UserName' name='name'

                                className='form-control rounded-0' onChange={e => setValues({ ...values, name: e.target.value })} />

                        </div>

                        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

 

                        <div className='mb-3'>

                            <label htmlFor="email"><strong>Email</strong></label>

                            <input type="email" placeholder='Enter Email' name='email'

                                className='form-control rounded-0' autoComplete='off' onChange={e => setValues({ ...values, email: e.target.value })} />

                        </div>

                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

 

                        <div className='mb-3'>

                            <label htmlFor="password"><strong>Password</strong></label>

                            <input type="password" placeholder='Enter Password' name='password'

                                className='form-control rounded-0' onChange={e => setValues({ ...values, password: e.target.value })} />

                        </div>

                        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

 

                        <div className='mb-3'>

                            <label htmlFor="confirm_password"><strong>Confirm Password</strong></label>

                            <input type="password" placeholder='Enter Password Again' name='confirm_password'

                                className='form-control rounded-0' onChange={e => setValues({ ...values, confirm_password: e.target.value })} />

                        </div>

                        {errors.confirm_password && <p style={{ color: "red" }}>{errors.confirm_password}</p>}

 

                        <button type='submit' className='btn btn-success bg-primary w-100 rounded-0'> Sign Up</button>

                        <div>Already have an account <Link to="/login">Login</Link></div>

                    </form>

                </div>

            </div>

        </>

    )

}

 

export default Signup
