import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screen/Cart';
import { useCart } from './ContextReducer';





export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")

  }


  return (
    <div>



      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
          >


            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item active">
                <NavLink className="nav-link active fs-5" to="/">Home</NavLink>
              </li>


              {(localStorage.getItem("authToken")) ?

                <li className="nav-item active">
                  <NavLink className="nav-link active fs-5" to="/myOrder">My Orders</NavLink>
                </li>
                : ""}

            </ul>


            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <NavLink className="btn bg-white text-success mx-1" to="/login">Login</NavLink>


                <NavLink className="btn bg-white text-success mx-1" to="/createuser">SignUp</NavLink>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2'>
                  My Cart {"  "}
                  <Badge pill bg="danger" onClick={() => { setCartView(true) }}>
                    {data.length > 0 ? data.length : ""}


                  </Badge>

                </div>

                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}


                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout

                </div>





              </div>




            }
          </div>
        </div>
      </nav>



    </div>
  )
}
