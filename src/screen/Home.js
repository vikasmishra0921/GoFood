import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Card from "../component/Card";
import Footer from "../Footer/Footer";

import Pizza from "../Food-imges/Pizza.jpg";
import LittiChokha from "../Food-imges/Litti-chokha.webp";
import Momos from "../Food-imges/Momos.jpg";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch(
      "https://gofood-backend-38s7.onrender.com/api/foodData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();

    setFoodItems(response[0]);
    setFoodCat(response[1]);
    // DisplayData.js mein "res.send([global.food_items, global.food_category])" ye jo bhej rhe hai uska hai [0]- matlab food_items aur [1]- matlab category
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carosel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button className="btn btn-outline-success " type="submit">Search</button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src={Pizza}
                className="d-block w-100  light-border"
                style={{ filter: "brightness(30%)", objectFit: "contain" }}
                alt="First-slide"
              />
            </div>
            <div className="carousel-item">
              <img
                src={LittiChokha}
                className="d-block w-100"
                style={{ filter: "brightness(30%)", objectFit: "contain" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={Momos}
                className="d-block w-100"
                style={{ filter: "brightness(30%)", objectFit: "contain" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />

                {foodItems
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => {
                    return (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3 "
                      >
                        <Card
                          foodItem={filterItems}
                          options={filterItems.options[0]}
                        ></Card>
                      </div>
                    );
                  })}
              </div>
            );
          })
        ) : (
          <div>No Such Data Found</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
