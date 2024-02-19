import React from 'react'
import { useState } from 'react';
import "./Carousel.css"
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

const Carousel = ({data}) => {
  const [slide, setSlide] = useState(0)
  
  const nextSlide = () => {
    setSlide(slide === 0? data.length - 1: slide - 1)
  }

  const prevSlide = () => {
    setSlide(slide === data.length - 1? 0 : slide + 1)
  }

  return (
    <div className='carousel'>
      <MdArrowBackIos className="arrow arrow-left" onClick={nextSlide}/> 
      {data.map((item, idx) => {
      return <img src={item.src} alt={item.alt} key={idx} className={slide === idx ? "slide": "slide slide-hidden"} />
      })}
      <MdArrowForwardIos className="arrow arrow-right" onClick={prevSlide}/>
      
      <div className="slide-text">
        <h1 className= "slide-heading">Where Creativity Meets Canvas
        </h1>
        <p  className="slide-para">Step into a world where creativity knows no bounds and imagination takes center stage.
        </p>
      </div>

      <span className="indicators">  
        {data.map((_, idx) => {
          return <button key={idx} onClick={() => setSlide(idx)} className={slide === idx ? "indicator": "indicator indicator-inactive"}></button>
        })}
      </span>
    </div>
  )
}

export default Carousel