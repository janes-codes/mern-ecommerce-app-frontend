import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { FaRegUser } from "react-icons/fa";
import './Navbar.css'
import toast from 'react-hot-toast'
// import axios from 'axios'


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')

    return (
        <nav>
            <Link to="/" className="title">Artfull</Link>
            <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen? "open": ""}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/shop">Shop</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                {
                userId == null ?
                <li>
                    <Link to="/login">Login</Link>
                </li>
                : 
                userId === userId &&
                <li>
                    <button 
                        className = "logout" 
                        onClick={() => {
                        localStorage.clear()
                        toast.success('logged out successfully')
                        navigate('/login')
                    }}>Logout</button>
                </li>
                }
            </ul>

        </nav>
    )
    }
 
export default Navbar