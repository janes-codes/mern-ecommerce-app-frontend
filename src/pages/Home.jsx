import './Home.css'
import Carousel from '../components/Carousel'
import slides from '../data/images';
import { serviesImg } from '../data/images';
import Footer from '../components/Footer';
 
function Home() {
  return (
    <>
    <div className='overflow'>
      <Carousel data={slides} />
      <>
        <div className='services_container'>
          <div className='service_box'>
            {
              serviesImg.map((curElm) =>{
              return(
                <div className='detail_info' key={curElm.id}>
                  <div className='img-box'>
                    <img src={curElm.src} alt={curElm.alt} className='service_img'/>
                  </div>
                  <div className='service_desc'>
                    <h2 className='service_p1'>{curElm.p1}</h2>
                    <h3 className='service_p2'>{curElm.p2}</h3>
                  </div>
                </div>
              )
              })
            }
            </div>
        </div>
      </>
    </div>
    <Footer />
    </>
  )
}

export default Home
