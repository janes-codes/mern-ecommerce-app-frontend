import React from 'react'
import "./About.css"
import Footer from '../components/Footer'

function About() {
  return (
    <>
    <div className='about_container'>
      <div className='content'>
        {/* <img className='img' src='./assets/aboutimg.jpg' alt=''></img> */}
        <div className='about_text'>
        <h2>ABOUT Artfull</h2>
        <h3>Give Life to Your Walls</h3>
        <p className='content'>Our mission is to provide the best quality wall art and best in class online buying experience. Some of our unmatched offerings are, India's largest & licensed collection, customize each art print to suit your decor, before you buy, see our artworks on your own wall, instant previews as you customize. We have the largest collection of designer curated, well styled gallery walls, sets. We are confident of our quality and offer 100% satisfaction and free returns.</p>
        </div>
      </div>
      <div className='model-container'>
        <div className='model'>
          <img src='https://artevenue.com/static/img/why_artevenue/guarantee.png' alt=''/>
          <p className='model-para'>Returns</p>
          <p className='model-para'>Don't like it? Inform us in 5 days and send it to us to get full refund</p>
        </div>
        <div className='model'>
          <img src='https://artevenue.com/static/img/why_artevenue/truck.png' alt=''/>
          <p className='model-para'>Free Shipping</p>
          <p className='model-para'>Ships in 1-3 days by courier</p>
        </div>
        <div className='model'>
          <img src='https://artevenue.com/static/img/why_artevenue/quality.png' alt=''/>
          <p className='model-para'>Affordable Quality</p>
          <p className='model-para'>We promise top quality at afforable prices</p>
        </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default About




