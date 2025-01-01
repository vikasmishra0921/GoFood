import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
export default function Login() {
  const [credential, setcredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending credentials:", {
      email: credential.email,
      password: credential.password,
    });
    const response = await fetch(
      "https://gofood-backend-38s7.onrender.com/api/loginuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      }
    );

    const json = await response.json();
    console.log("Response from server:", json);

    if (!json.success) {
      alert("Enter Valid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
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

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger  ">
            New User
          </Link>
        </form>
      </div>
    </div>
  );
}
