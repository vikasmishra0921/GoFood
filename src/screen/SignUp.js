import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [credential, setcredential] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const navigate = useNavigate(); // Initialize navigate function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name: "", email: "", password: "", geolocation: "" });
    const response = await fetch(
      "https://gofood-backend-38s7.onrender.com/api/createuser",
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password,
          location: credential.geolocation,
        }),
      }
    );

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));

      // Navigate to home page if user creation is successful
      alert("User created successfully!");
      navigate("/"); // Replace '/home' with your home route
    }
  };

  const onChange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credential.name}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credential.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credential.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Location
            </label>
            <input
              type="location"
              className="form-control"
              id="geolocation"
              name="geolocation"
              value={credential.geolocation}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger  ">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
