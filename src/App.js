
import React, { useState } from 'react';
import Home from '../src/component/home'
import Orders from '../src/component/myorders.js'
import Contactus from './component/contactus.js';
import Cart from '../src/component/cart'
import Myaccount from './component/myaccount';
import Bar from '../src/component/navbar';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Hom2 from "./component/hom2"
import Login from "./component/login"
import Signin from "./component/signin"
import Profile from './component/profile'
function App() {
  const [cart, setCount] = useState(0);
  return (

    <div className="App">


      <BrowserRouter>
        <Bar value={cart} />
        <Routes>
          <Route path="/home" element={<Home value={setCount} />} />
          <Route path="/myorders" element={<Orders />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Hom2" element={<Hom2/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
