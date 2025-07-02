import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup=()=>{
    const [userInfo,setInfo]=useState({
        userId:"",
        password:"",
        confirmPassword:"",
        email:""
    })
    
    const navigate=useNavigate();

    const handleLogin=()=>{
        navigate('/login')
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const {userId,password,confirmPassword,email}=userInfo;
        if(password!==confirmPassword){
            alert("Passwords do not match");
        }
        const user={
            userId,
            password,
            email,
        }
        console.log(user);
        // Make an API call to register the user
        axios.post('/api/signup',user)
        .then((response)=>{
            alert("Signup Successful");
            navigate('/login')
        }
        )
        .catch((error)=>{
            console.error(error);
            alert("Error in Signup");
        })
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setInfo({
            ...userInfo,
            [name]:value
        })
        
    }

    return(
        <div className="container">
            <h1 className="text-center">Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID</label>
                    <input type="text" className="form-control" id="userId" name="userId" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary me-2">Signup</button>
                Already have an account?<span onClick={handleLogin} className="text-primary" style={{cursor:"pointer"}}> Login</span>
            </form>
        </div>
    )
}

export default Signup;