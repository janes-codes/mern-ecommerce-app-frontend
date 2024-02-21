import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Shop.css"
import { useNavigate } from 'react-router-dom'
import Model from './Model';
import Footer from './Footer';
import toast from 'react-hot-toast';
import { URL } from '../App';

const GetProducts = () => {

  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [deleteData, setDeleteData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [detail, setDetail] = useState([])
  const [close,setClose] = useState(false)

  useEffect(() =>{
    axios.get(`${URL}/get-products`)
    .then(res => {
      setData(res.data.data)
      console.log("44")
    })
    .catch(err => {
      console.log(err)
    })
  }, [refresh])

  const rightsOfUser = () => {
    try {
      const userId = localStorage.getItem('userId')
      if(userId) {
        const rights = JSON.parse(localStorage.getItem('rights'))[0]?.permissions
        return rights;
      } else if (!userId){
        const empty = []
        return empty
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleDelete = () => {
    const data = deleteData
    const headers = {Authorization: localStorage.getItem('token')} 
    axios.post(`${URL}/delete-products`, data, {headers})
        .then(res => {
            console.log(res.data, "27")
            if (res.data.code === 200) {
              setDeleteData([])
              setRefresh(!refresh)
            }
        })
        .catch(err => {
            console.log(err, "30")
        })
  }

  const handleAddToCart = (product) => {
    const _productId = product._id
    const userId = localStorage.getItem('userId')
  
    console.log(userId, "88")
    const _data = { productId: _productId, userId }
    const headers = { Authorization: localStorage.getItem('token')}
    axios.post(`${URL}/add-to-cart`, _data, {headers})
        .then(res => {
            console.log(res.data, "49")
            if (userId !== null && res.data.code === 200) {
              toast.success("Product added to cart")
              setRefresh(!refresh)
            }else {
              if(userId !== null && res.data.code === 201) {
                toast.error("Product is already added to cart")
              }else {
                toast.error("Login to access cart")
              }
            }
        })
        .catch(err => { 
            console.log(err, "30")
        }) 
    }
  
  const detailPage = (product) => {
    setDetail([{...product}])
    setClose(true)
  } 

  return (
    <>
    <Model
      detail = {detail}
      setDetail = {setDetail}
      detailPage = {detailPage}
      setClose = {setClose}
      close = {close}
      handleAddToCart = {handleAddToCart}
    />

    <div>
      <div className='flex-it'> 
      {rightsOfUser().indexOf('add-products') !== -1 &&
        <div className="dle-div"> 
          <button className = 'dle-btn' onClick={handleDelete}>Delete Selected</button>
        </div>
      }
      </div>
      {
        <div className='shop-container' >
          {
            data.map((item, index) =>
            {
              return( 
                <div className='box' key={item._id}>
                  <div className='content'>
                    <div className='img-box'>
                      <img src={item.image} alt={item.title} className='shop-img'/>
                    </div> 
                    <div className='detail'>
                      <div className='info'>
                        <h4>{item.title}</h4>
                        <p>{item.price} &#8377;</p>
                    </div>
                    {
                      rightsOfUser().indexOf('edit-product') !== -1 && 
                      <button 
                        className='edit-btn'
                        onClick={() =>{
                        console.log(item._id, "40")
                        navigate(`/get/product/${item._id}`)
                      }}>Edit</button>
                    }
                    {
                      rightsOfUser().indexOf('delete-products') !== -1 &&
                      <input 
                        className='delete-input'
                        onChange = {(e) => {
                        console.log(e.target.checked, "48")
                        if(e.target.checked === true) {
                          setDeleteData([...deleteData, item._id])
                        } else {
                          setDeleteData(deleteData.filter(s => s !== item._id))
                      }
                    }}type="checkbox"/>
                    }
                    <button onClick={() => detailPage(item)}>View</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
      <Footer />
    </div>
    </>
  )
}

export default GetProducts