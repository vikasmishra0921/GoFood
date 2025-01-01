import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  let data = useCart();
  let priceRef = useRef();
  let priceOptions = Object.keys(options);

  const [qty, setqty] = useState(1);
  const [size, setsize] = useState();

  const handleAddToCart = async () => {
    let food = data.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );

    if (food) {
      // Update the existing item with new quantity and price
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        size: size,
        price: finalPrice,
        qty: qty, // Increment the quantity
      });
    } else {
      // Add a new item to the cart
      await dispatch({
        type: "ADD",
        name: props.foodItem.name,
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodItem.img,
      });
    }
  };

  let finalPrice = qty * parseInt(options[size] || 0);

  useEffect(() => {
    if (priceRef.current) {
      setsize(priceRef.current.value);
    }
  }, []);

  return (
    <div>
      <div className="card m-3" style={{ width: "15rem", maxHeight: "360px" }}>
        <img
          className="card-img-top"
          src={props.foodItem.img}
          alt="Card-img-capcap"
          style={{ height: "160px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>

          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success"
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(9), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2  h-100  bg-success rounded"
              ref={priceRef}
              onChange={(e) => setsize(e.target.value)}
            >
              {priceOptions.map((optionData) => {
                return (
                  <option key={optionData} value={optionData}>
                    {optionData}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-199 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className={"btn btn-success justify-center ms-2"}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
