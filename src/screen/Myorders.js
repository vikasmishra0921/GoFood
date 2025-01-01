import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

export default function Myorder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const response = await fetch(
        "https://gofood-backend-38s7.onrender.com/api/myorderData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"),
          }),
        }
      );
      const data = await response.json();
      console.log("Fetched Order Data:", data); // Log the fetched data
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  // Ensure orderData is an object and has the 'orderData' property
  const orders = orderData.orderData ? orderData.orderData.order_data : [];

  return (
    <div>

 <Helmet>
        <title>MyOrders</title>
        <link rel="icon" href="/path-to-your-favicon.ico" />
      </Helmet>
    
      <Navbar />
      <div className="container">
        <div className="row">
          {orders.length > 0 ? (
            orders.map((orderGroup, index) => {
              // Check if the orderGroup is valid and contains items
              if (orderGroup && orderGroup.length > 0) {
                return (
                  <React.Fragment key={index}>
                    {/* Display the order date only once per group */}
                    {orderGroup[0]?.Order_date && (
                      <div className="m-auto mt-5">
                        <div>{orderGroup[0].Order_date}</div>
                        <hr />
                      </div>
                    )}

                    {/* Iterate over the items within each order group */}
                    {orderGroup.map((item, itemIndex) => (
                      <div className="col-12 col-md-6 col-lg-3" key={itemIndex}>
                        <div
                          className="card mt-3"
                          style={{ width: "16rem", maxHeight: "360px" }}
                        >
                          <img
                            src={item.img}
                            className="card-img-top"
                            alt={item.name}
                            style={{ height: "120px", objectFit: "fill" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div
                              className="container w-100 p-0"
                              style={{ height: "38px" }}
                            >
                              <span className="m-1">{item.qty}</span>
                              <span className="m-1">{item.size}</span>
                              <div className="d-inline ms-2 h-100 w-20 fs-5">
                                ₹{item.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                );
              } else {
                // Return null if orderGroup is empty or invalid
                return null;
              }
            })
          ) : (
            <p>No orders found</p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
