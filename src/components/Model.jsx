import axios from 'axios'
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { URL } from "../App";
import "./Model.css";

const Model = ({detail, close, setClose, handleAddToCart}) => {
  const navigate = useNavigate()

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
                    console.log(err)
                })
        }
  
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  
  }
  
  const handlePayment = (amount) => {
    const userId = localStorage.getItem('userId')
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
        {
          close ?
          <div className="detail_container">
          <div className='detail_content'>
            <AiFillCloseCircle className='close-btn' onClick={() => setClose(false)} />
            {
              detail.map((item) =>{
              return(
                <div className='detail_info' key={item._id}>
                  <div className='img-box'>
                    <img src={item.image} alt={item.title} className='shop-img-bigger'/>
                  </div>
                  <div className='product_detail'>
                    <div className='media-div'>
                    <h2 className='pd_alter product_detail_h2'>{item.title}</h2>
                    <h3 className='pd_alter product_detail_h3'>{item.price} &#8377;</h3>
                    </div>
                    <p className='pd_alter product_detail_p'>{item.imgDesc}</p>
                    <button className='pd_alter product_detail_btn addtocart' 
                        onClick={() => 
                        handleAddToCart(item)}>Add to Cart</button>
                    <button className='pd_alter product_detail_btn' 
                      onClick={() => 
                        handlePayment(item.price)}>Pay Now</button>

                    {/* <FaCartShopping /> */}
                  </div>
                </div>
              )
              })
            }
          </div>
        </div> : null
        }
    </> 
    )
} 

export default Model







