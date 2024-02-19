import React from 'react'
import { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validate =  (e) => {
    e.preventDefault()
    const validationErrors = {}
    const data = {email: email, password: password}
    
    if(!data.email.trim()) {
      validationErrors.email = "email required"
    }
    console.log("After first condition")

    if(!data.password.trim()) {
      validationErrors.password= "password required"
    }
    console.log("After second condition")

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      handleLogin()
    }
  }

  const handleLogin = () => {
    console.log(email, password)

    const data = {email: email, password: password}
    axios.post('http://localhost:3001/login', data)
      .then((res) => {
        console.log(res.data.token, 17)
        if(res.data.token) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          localStorage.setItem('userId', res.data.user._id)
          localStorage.setItem('rights', JSON.stringify(res.data.user.roles))
          toast.success("Login successful")
          navigate('/')
        } 
        else {
          if (res.data.code === 404){
            const validationErrors = {}
            validationErrors.err = res.data.message
            setErrors(validationErrors)
            console.log(validationErrors)
          }
        }
      })
      .catch((err) => {
        console.log(err, 20)
      })
  }
 
  return (
    <>
    <div className='login_container'>
      <form className='' id='form' action='POST'> 
        <h1>Login</h1> 
        <div className='input-group'> 
          <label>Email</label>
          <input 
            type='text'
            id='email'
            value = {email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder='Email'
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div className='input-group'>
          <label>Password</label>
          <input 
            type='password'
            id='password'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder='Password'
          />
          {errors.password && <span>{errors.password}</span>}
          {errors.err && <span>{errors.err}</span>}
        </div>
        <button type='submit' onClick={validate}>Login</button>
        <h4>OR</h4>
        <p>Create a new account</p>
        <Link to="/signup">Signup</Link>
      </form>
    </div>
    </>
  )
}

export default Login
