import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup  from '../pages/Signup';
import AddProduct from './AddProduct';
import GetProducts from './GetProducts';
import GetProduct from './GetProduct';
import UserCart from './UserCart';

export const Rout = () => {
  return (
    <>
       <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/add/products" element={<AddProduct/>}></Route>
        <Route path="/shop" element={<GetProducts/>}></Route>
        <Route path="/get/product/:id" element={<GetProduct/>}></Route>
        <Route path="/cart" element={<UserCart/>}></Route>
      </Routes>
    </>
  )
}

export default Rout