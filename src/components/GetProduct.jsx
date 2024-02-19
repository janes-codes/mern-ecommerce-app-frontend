import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import './Add-Edit.css'
import toast from "react-hot-toast"

const GetProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [imgDesc, setImgDesc] = useState('')
    const [seller, setSeller] = useState('')

    useEffect(() => { 
        const id = params.id
        axios.get(`http://localhost:3001/get-product/${id}`)
            .then(res => {
                console.log(res.data.data, "13")
                setImage(res.data.data.image)
                setTitle(res.data.data.title)
                setImgDesc(res.data.data.imgDesc)
                setSeller(res.data.data.seller)
                setPrice(res.data.data.price)   
            })
            .catch(err => {
                console.log(err, "err")
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ id: params.id, image: image, title, imgDesc, seller, price: Number(price) })

        const data = { id: params.id, image: image, title, imgDesc, seller, price: Number(price) }
        const headers = { Authorization: localStorage.getItem('token')}
        axios.post('http://localhost:3001/edit-products', data,  {headers})
            .then(res => {
                console.log(res.data, "res")
                if (res.data.code === 200) {
                    navigate('/shop')
                }
                if(res.data.code === 403 || res.data.code === 401) {
                    toast.error("This route is for authorized personnel only")
                }
            })
            .catch(err => {
                console.log(err, "err")
            })
    }

    return (
        <div className="wrapper">
            <form className = 'form' onSubmit={handleSubmit}>
                <h1>Edit products</h1>
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
                <label>Image Description: </label>
                <input 
                    className="input" 
                    type="text" 
                    onChange={(e) => setImgDesc(e.target.value)} 
                    value={imgDesc}
                />
                </div>
                <div className='input-group'>
                <label>Seller: </label>
                <textarea
                    className="input" 
                    type="text" 
                    onChange={(e) => setSeller(e.target.value)} 
                    value={seller}
                > Enter the Product description here
                </textarea> 
                </div>
                <div className='input-btn'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default GetProduct
