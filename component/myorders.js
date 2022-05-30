import React, { useEffect } from 'react'
import {useState} from 'react'
const axios = require('axios').default;
 function Myorders() {
  const [productitem,setProducti]=useState([])
  // const [user,setUser]=useState(localStorage.getItem('userId'))



useEffect(() => {
  
  axios.get('http://localhost:8090/myorders')
  .then(function (response) {
      const productitemlist=response.data.description[0].obj.productData
      console.log(response.data.description[0].obj.productData)
    setProducti(productitemlist)
    console.log(productitemlist)

  })

  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
},[]);
  return (
    <div>
        <div className='row'>
                          <div className='col-md-2'>
                          <h6>ORDER PLACED</h6>
                        </div>
                        <div className='col-md-6'>
                          <h6>Date</h6>
                        </div>
                        <div className='col-md-4'>
                          order no
                        </div>
       {/* { productitem.map((data) => {
                        return ( */}
                         
                        <div className='row'>
                        <div className='col-md-3'>
                        <img className="immg" src={productitem.prod_image} alt="" />
                        </div>
                        <div className='col-md-6'>
                          <h6>{productitem.category}</h6>
                          <h6>{}</h6>
                        </div>
                        <div className='col-md-3'>
                        <h5>{}</h5>
                        </div>
                        </div>
                       
                            {/* )
                          })} */}
    
       
      
    </div>
    </div>
  )
}
export default Myorders;
