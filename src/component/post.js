import React from 'react'

export default function post() {
    {products.map((data) => {
        return (

    <div> <img className="immg" src={data.prod_image} alt="" />
    <h3> {data.category}</h3>
    <h6> {data.name}</h6>
    <h5>{data.price}</h5></div>
  )
        })
    }
}
