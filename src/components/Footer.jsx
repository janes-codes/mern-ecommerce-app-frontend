import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdFacebook } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
    const date = new Date()
    const currentYear = date.getFullYear()
  return (
    <>
    <div className='footer-container'>
      <div className='right-side'>
        <ul>
          <h3>Pages</h3> 
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/shop'>Shop</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/cart'>Cart</Link>
          </li>
        </ul>
      </div>
      <div className='left-side'>
        <ul>
          <h3>Follow Us</h3>
          <li>
            <Link to='https://www.instagram.com/'><FaInstagram /> Instagram</Link>
          </li>
          <li>
            <Link to='https://twitter.com/?lang=en'><FaSquareXTwitter /> Twitter</Link>
          </li>
          <li>
            <Link to='https://www.facebook.com/'><MdFacebook /> Facebook</Link>
          </li>
          <li>
            <p><FaPhone /> : 1329066780</p>
          </li>
        </ul>
      </div>
    </div>
    <div className='copyright'>
      <p>Artfull &copy; {currentYear}</p>
    </div>
    </>
  )
}

export default Footer
