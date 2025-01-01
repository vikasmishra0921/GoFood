

import './App.css';

import Home from './screen/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screen/Login';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';



import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import SignUp from './screen/SignUp.js';
import { CartProvider } from './component/ContextReducer.js';
import Myorder from './screen/Myorders.js';


function App() {
  return (



    <CartProvider>



      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<SignUp />} />
            <Route exact path='/myOrder' element={<Myorder />} />
          </Routes>

        </div>
      </Router>

    </CartProvider>
  );
}

export default App;
