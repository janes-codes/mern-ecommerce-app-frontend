import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Add-Edit.css'
import toast from 'react-hot-toast'

const AddProduct = () => {
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [imgDesc, setImgDesc] = useState('')
  const [seller, setSeller] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({image: image, title, price, imgDesc, seller})

    const data = {image, title, price, imgDesc, seller}
    const headers = {Authorization: localStorage.getItem('token')} 
    axios.post('http://localhost:3001/add-product', data,  {headers})
      .then(res => {
        console.log(res)
        if(res.data === 'saved') {
          toast.success("Product added successfully")
          navigate('/shop')
        }
        if(res.data.code === 403 || res.data.code === 401) {
          toast.error("This route is for authorized personnel only")
        }
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='wrapper'>
          <form className = 'form' onSubmit={handleSubmit}>
            <h1>Add Products</h1>
            <div className='input-group'>
              <label>Image: </label>
              <input 
                className="input" 
                type="text" 
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </div>
            <div className='input-group'>
              <label>Tiltle: </label>
              <input
                className="input" 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title} 
              />
            </div>
            <div className='input-group'>
            <label>Price: </label>
            <input 
              className="input" 
              type="number"
              onChange={(e) => setPrice(e.target.value)} 
              value={price}
            />
            </div>
            <div className='input-group'>
            <label>Image Desc: </label>
            <textarea 
              className='input'
              type="text" 
              onChange={(e) => setImgDesc(e.target.value)} 
              value={imgDesc}
            > Enter the Product description here
            </textarea>
            </div>
            <div className='input-group'>
              <label>Seller: </label>
              <input 
                className="input" 
                type="text" 
                onChange={(e) => setSeller(e.target.value)} 
                value={seller}
              />
            </div>
            <div className='input-btn'>
              <button type="submit">Submit</button>
            </div>
          </form>
      </div>
    </>
  )
}

export default AddProduct
