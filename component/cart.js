import React, { useState } from 'react'
import products from './data'
import Home from './home'

function Cart(){
    const [details,setDetails]=useState(JSON.parse(localStorage.getItem('data')))
    const [user,setUser]=useState(localStorage.getItem('userId'))
    var [displayDate,setDisplayDate]=useState(new Date().toString())
    // var [displaytime,setDisplaytime]=useState(showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds());
    // console.log(displaytime);
    console.log(displayDate)
    function checkout(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            user:user,
            // displaytime:displaytime,
            displayDate:displayDate,
            details:details,

         
        });
        console.log(details)
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:8090/checkout", requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

    }
    return (
        <div className='row'>
            <div className='row'>
                <div className='col-md-12 shopping bg'>
                    <h3>shopping Cart</h3>
                    <a className='Red'>Remove All</a>
                </div>
            </div>
            {details.map((box)=>{
                return(
                    <div>
                    <div className='row'>
                    <div className='col-md-3 mt'>
                    <img className="immgg" src={box.data.prod_image} alt="" />
                    </div>
                    <div className='col-md-3 mt'>
                        <h2>{box.data.category}</h2>
                        <h5>{box.data.name}</h5>
                    </div>
                    <div className='col-md-3 but mt '>
                        <button className='butt'>-</button>
                        <h2>0</h2>
                        <button className='butt'>+</button>
                    </div>
                    <div className='col-md-3 '>
                    <h4>{box.data.price}</h4>
                        <a className='Red'>Remove</a>
                    </div>
                </div>
                
                    </div>
                )
            })}
           
           <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-9'> <hr /></div>
                </div>
                <div className='row'>
                    <div className='col-md-8'></div>
                    <div className='col-md-2 '>
                        <h5>Subtotal</h5>
                        <h6>2 items..</h6>
                    </div>
                    <div className='col-md-2 '>
                        <h4>$64</h4>
                    </div>
                    <div className='row'>
                        <div className='col-md-8'>
    
                        </div>
                        <div className='col-md-4'>
                            <button className='checkout' onClick={checkout}>Checkout</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default (Cart)
