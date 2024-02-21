import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './Cart.css'
import Footer from "./Footer";
import { URL } from "../App";

const UserCart = () => {
    const navigate = useNavigate()
    const [deleteData, setDeleteData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const userId = localStorage.getItem('userId')
    const [cartItem, setCartItem] = useState([])

    useEffect(() => {
        const data = { userId: localStorage.getItem('userId') }
        axios.post(`${URL}/get-user-cart`, data)
            .then(res => {
                console.log(res.data, "15")
                setCartItem(res.data.data.cart)
            })
            .catch(err => {
                console.log(err)
            })
    }, [refresh])

    
  const handleDelete = () => {
    const userId = localStorage.getItem('userId')
    console.log(deleteData)
    const data = {deleteData: deleteData, userId}
    axios.post(`${URL}/delete-cart`, data)
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

    const handleOpenRazorpay = (data) => {

        const options = {
            key: 'rzp_test_FvfinjPDgKmlrc',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'Artful',//
            description: 'XYZ',//
            handler: function (response) {
                console.log(response, "34")
                axios.post(`${URL}/verify`, { response: response })
                    .then(res => {
                        console.log(res, "37")
                        // your orders
                    })
                    .catch(err => {
                        console.log(err, "90")
                    })
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()

    }

     const handlePayment = (amount) => {
        const _data = { amount: amount }
        axios.post(`${URL}/orders`, _data)
            .then(res => {
              if(userId == null) {
                navigate('/login')
              }else {
                console.log(res.data, "29")
                handleOpenRazorpay(res.data.data)
              } 
            })
            .catch(err => {
                console.log(err)
            })
     }

     return (
      <>
      {deleteData.length > 0 &&
        <div className="dle-div-cart"> 
          <button className = 'dle-btn' onClick={handleDelete}>Delete Selected</button>
        </div>
      }
      {
        userId == null ?
          <>
          <div className='empty_cart'>
            <h2>Login to access the Cart</h2>
            <Link  to='/login'>
            <button className = 'cart_shop'>Login</button>
            </Link>
          </div>
          </>
        : 
        cartItem.length === 0 &&
          <>
          <div className='empty_cart'>
            <h2>Your cart is empty choose a product</h2>
            <Link  to='/shop'>
            <button className = 'cart_shop'>Shopping</button>
            </Link>
          </div>
          </>
      }
        <div className='shop-container' style={{overflow: 'hidden'}}>
            {
              cartItem.map((item, index) =>
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
                      <input onChange = {(e) => {
                        console.log(e.target.checked, "48")
                        if(e.target.checked === true) {
                          setDeleteData([...deleteData, item._id])
                          console.log(deleteData, "88")
                        } else {
                          setDeleteData(deleteData.filter(s => s !== item._id))
                          console.log(deleteData, '89')
                      }
                      }}type="checkbox"/>
                      <button onClick={() => 
                      handlePayment(item.price)}>Pay Now</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {/* {data.length > 0 &&
          <>
            <p className='cart_total'>Total: 200 &#8377;</p>
          </>
          } */}
          <Footer/>
        </>
    )
}

export default UserCart