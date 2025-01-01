import React from 'react'

import Pizza from '../Food-imges/Pizza.jpg'
import LittiChokha from '../Food-imges/Litti-chokha.webp'
import Momos from '../Food-imges/Momos.jpg'

export default function Carousel() {
  return (
    <div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">



        <div className="carousel-inner" id='carosel'>


          <div className="carousel-caption" style={{ zIndex: "10" }}>


            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success " type="submit">Search</button>
            </form>

          </div>


          <div className="carousel-item active">
            <img src={Pizza} className="d-block w-100  light-border" style={{ filter: "brightness(30%)", objectFit: "contain" }} alt="First-slide" />
          </div>
          <div className="carousel-item">
            <img src={LittiChokha} className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "contain" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={Momos} className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "contain" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  )
}
