import React from 'react'
import { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../App';
import toast from 'react-hot-toast'
 
const Signup = () => {
  const navigate = useNavigate() 
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const validate =  (e) => {
    e.preventDefault()
    const validationErrors = {}
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const data = { name: name, email: email,password: password}
    
    if(!data.name.trim()) {
      validationErrors.name = "username is required"
    }
    console.log("After first condition")
    
    if(!data.email.trim() ) {
      validationErrors.email = "email is required"
    }else if (!emailRegex.test(data.email)) {
      validationErrors.email = "email is not valid"
    }
    console.log("After second condition")
    
    if(!data.password.trim()) {
      validationErrors.password = "password is required"
    }else if (data.password.length < 6) {
      validationErrors.password = "password should have atleast 6 characters"
    }
    console.log("After second condition")

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      handleSignup()
    }
  }

  const handleSignup = () => {
    // e.preventDefault()
    console.log(name, email, password)
    const data = { name: name, email: email,password: password}
    axios.post(`${URL}/signup`, data)
        .then((res) => {
            console.log(res.data, 17)
            if(res.data.code === 401){
              toast.error("Email already exist")
            } else if(res.data.code === 200) {
              toast.success("Thank you for signing in")
              navigate('/login')
            }
        })
        .catch((err) => {
            console.log(err, 20)
        })
  }
  
   return (
    <div className='sign_container'>
      <form className='' id='form'> 
        <h1>Register</h1>
        <div className='input-group'>
          <label>Username</label>
          <input 
            type='text' 
            placeholder='Name' 
            onChange={(e)=>{setName(e.target.value)}}
            value={name}
            id='username' 
            required
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div className='input-group'> 
          <label>Email</label>
          <input 
            type='email'
            id='email'
            required
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
            placeholder='Email'
            />
            {errors.email && <span>{errors.email}</span>}
        </div>
        <div className='input-group'>
          <label>Password</label>
          <input 
            type='password' 
            placeholder= "Password" 
            id='password' 
            required
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        {/* <div className='input-group'>
          <label>User Type</label>
          <select 
            onChange={(e) => {setType(e.target.value)}}
            value={type}
            id='type'>
            <option 
              value= "USER"
            >USER</option>
            <option 
              value= "SELLER"
            >SELLER</option>
          </select>
        </div> */}
        <button type='submit' onClick={validate}>Register</button>
        <h4>OR</h4>
        <p>Already have an account</p>
        <Link to="/login">Login</Link>
      </form>
    </div>
   )
 }
  
export default Signup