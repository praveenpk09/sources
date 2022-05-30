import React from 'react'

import 'responsive-navbar-react/dist/index.css'
import  logo1 from '../images/sun.png'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import { CarouselItem } from 'react-bootstrap'



function Home(){

        
         
  return (
    <div className="Home">
    
      <header>
        <a href='/home'><img src={logo1} className='imgg' width="60px" height="40px"/></a>
          <input type={'search'} name="searchbox" placeholder='Search...' className='input'/>
          <a href='/login'><button>Login</button></a>
          <a href='/myorders'><button>Orders</button></a>
         <p><a href='/cart'> <i class="fa-solid fa-cart-shopping ic"></i></a><span>{localStorage.getItem('carts')}</span> <a href='/profile'><i class="fa-solid fa-user"></i></a></p>
       
        </header>
        
        
        
        
       
      
    	
    
        
    </div>
  )
}
export default Home;