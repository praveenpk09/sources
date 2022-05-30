import React, { useEffect, useState } from "react";
import './style.css'
import products from "./data.js";




const axios = require('axios').default;
// axios.get('/productlists')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });



const Pagination = ({ postsPerPage, totalPosts, page }) => {        //5,50
    const pageNumbers = [];         //page number is empty

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {  //  50/5= 10 pages
        pageNumbers.push(i);  //the value of i is 10 that pushes into pageNumber array
    }

    return (
        <nav>
            <ul className='pagination'>

                {pageNumbers.map(number => (    //10.map(parameter)
                    <li key={number} className='page-item'>
                        <a onClick={() => page(number)}  //the onclick is use to call the pagination and storing the pagenumber to number
                            className='page-link'>
                            {number}
                           
                        </a>
                    </li>
                ))}
            </ul>
        </nav>

    );

};

function Home({ value })
 {
    // const [productitem,setProducti]=useState([]);

    // const productData= async () =>{
    //     try{
    //         const datum=await axios.get('http://localhost:8090/productlists');
    //         console.log(datum.data);
    //         setProducti(datum.data)
    //     }catch(e){
    //         console.log(e);
    //     }
    // };

    
    const [productitem,setProducti]=useState([])
    // async function getProducts() {
    //     try {
    //       const product = await axios.get('http://localhost:8090/productlists');
    //       console.log(product);
    //       setProduct(product)
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    axios.get('http://localhost:8090/productlists')
  .then(function (response) {
      const productitem=response.data.description
    // handle success
    // console.log(productitem);
    setProducti(productitem)
console.log(productitem)
  })

  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
    
    // let localCartCount=localStorage.getItem('Product')
    // if(localCartCount===null || localCartCount===''){
    //     localCartCount=0;
    //}
    const [Filter, setFilter] = useState(products.slice(0, 5)); //slicing the data from products into 5 for front page
    const [cart, setCount] = useState();
//     const [cartdata]=useState([]);
//    const[cart1]=useState([localStorage.getItem('Cart')])
  
    // const[currentPage, setCurrentPage]=useState(1); //the currentpage initial value by assigning 1
    const [postsPerPage] = useState(5);

    function cartitem(data){

        // let carts = cart + 1;
        // setCount(carts)
        // value(carts)
        // localStorage.setItem('Number',carts)
        
         let cartdata = [];
         if(localStorage.getItem('data')){
             cartdata = JSON.parse(localStorage.getItem('data'));
            } cartdata.push({data});
         console.log(cartdata)
        localStorage.setItem('data', JSON.stringify(cartdata));


    //     var myHeaders = new Headers();
    //  myHeaders.append("Content-Type", "application/json");
    //  var raw = JSON.stringify({
    //    data:data,
    //  });
     console.log("sur",data)
    //  var requestOptions = {
    //    method: 'POST',
    //    headers: myHeaders,
    //    body: raw,
    //    redirect: 'follow'
    //  };

    //  fetch("http://localhost:8090/", requestOptions)
    //    .then(response => response.json())
    //    .then(result => {console.log(result)
    //     .catch(error => console.log('error', error));
    //    })

    // function cartdatatem(data) {
    //    let carts = cart + 1;  
                                    
    //     setCount(carts);
    //     value(carts);
    //     localStorage.setItem("Number",cart)
    //     cartdata.push(cart1)
    //     cart1.push(data)
    //     localStorage.setItem('Cart', cart1)
    //     console.log(cartdata);
        
    }

    function productfiltering(catItem) {
        const result = products.filter((resultData) => {
            return resultData.gender === catItem;
        });
        console.log(result)
        setFilter(result);
    }
    function kurtaSets(x) {
        const output = products.filter((resultOutput) => {
            return resultOutput.category === x;
        });


        setFilter(output);
    }


    const page = pageNumber => {
        // setCurrentPage(pageNumber)
        const end = pageNumber * postsPerPage;
        const start = end - postsPerPage;
        const currentPosts = products.slice(start, end);   // current(products)
        // const current=products.slice(start,end)
        alert(end)


        setFilter(currentPosts)
    }

    function sortArray(dataa) {
        if (dataa == 'lowtohigh') {
            const lowtohighdata = products.sort((a, b) => (a.price - b.price))
            setFilter(lowtohighdata)

        }
        else if (dataa == 'hightolow') {
            const hightolowdata = products.sort((a, b) => (b.price - a.price))
            setFilter(hightolowdata)

        }

    }


    return (
        <div className="row ht mt">
            <hr></hr>

            <div className="col-md-3  ">

                <div className="filters">
                    <ul>
                        <li><h5 className="h77">FILTERS</h5></li>
                    </ul>
                    <hr />
                    <ul>

                        <li> <input type={'radio'} value='boys' for='gender' name='gender' onChange={() => productfiltering('boys')} />
                            <label> <h6>Boys</h6></label></li>
                        <li> <input type={'radio'} id="Girls" name="gender" value={"girls"} onChange={() => productfiltering('girls')} />
                            <label><h6>Girls</h6></label></li>
                    </ul>
                    <hr />
                    <ul>
                        <li><h6 className="h7">CATEGORIES</h6></li>
                        <li> <input type={'checkbox'} id="Kurta" value={"kurta"} onChange={() => kurtaSets('Lehanga')} />
                            <label>Kurta Sets</label></li>
                        <li><input type={'checkbox'} id="Lehanga" value={"lehanga"} onChange={() => kurtaSets('Kurta Sets')} />
                            <label>Lehanga</label></li>
                        <li> <input type={'checkbox'} id="Kurtas" value={"kurtas"} onChange={() => kurtaSets('Kurtas')} />
                            <label>Kurtas</label></li>
                        <li> <input type={'checkbox'} id="Clothing" value={"clothing"} onChange={() => kurtaSets('Clothing sets')} />
                            <label>Clothing sets</label></li>
                        <li> <input type={'checkbox'} id="Clothing" value={"clothing"} onChange={() => kurtaSets('Shall')} />
                            <label>Shall</label></li>
                        <li><input type={'checkbox'} id="Sherwani" value={"sherwani"} onChange={() => kurtaSets('Sherwani')} />
                            <label>Sherwani</label></li>
                    </ul>
                    <hr />
                    <ul>
                        <li><h6 className="h7">BRAND</h6></li>
                        <li><input type={'checkbox'} id="Sg" value={"sg"} />
                            <label>SG YUVARAJ</label></li>
                        <li><input type={'checkbox'} id="Bown" value={"bown"} />
                            <label>BownBee</label></li>
                        <li><input type={'checkbox'} id="Akshara" value={"akshara"} />
                            <label>AKSHARA</label></li>
                        <li><input type={'checkbox'} id="Aarika" value={"aarika"} />
                            <label>Aarika</label></li>
                        <li><input type={'checkbox'} id="Thangamagan" value={"thangamagan"} />
                            <label>THANGAMAGAN</label></li>
                    </ul>
                    <hr />
                    <ul>
                        <li><h6 className="h7">PRICE</h6></li>
                        <li> <input type={'checkbox'} id="price" value={"price"} />
                            <label>Rs. 199 to Rs.1899</label> </li>
                        <li><input type={'checkbox'} id="Bown" value={"bown"} />
                            <label>Rs. 1999 to Rs.2899</label></li>
                        <li> <input type={'checkbox'} id="Akshara" value={"akshara"} />
                            <label>Rs. 2199 to Rs.3899</label></li>
                        <li><input type={'checkbox'} id="Aarika" value={"aarika"} />
                            <label>Rs. 3199 to Rs.4989</label></li>
                    </ul>
                    <hr />
                </div>


            </div>
            <div className="col-md-9 ">

                <div className="row">
                    <div className="col-md-9   ">

                    </div>
                    <div className="col-md-3 mt ">
                        <select onChange={(e) => sortArray(e.target.value)}>
                            <option value="hightolow" >High to Low</option>
                            <option value="lowtohigh">Low to High</option>
                        </select>

                    </div>
                </div>
                <div className="row ">
                    { productitem.map((data) => {
                        return (

                            <div className="col-md-2 br">
                                <img className="immg" src={data.prod_image} alt="" />
                              
                                <h3> {data.category}</h3>
                                <h6> {data.name}</h6>
                                <h5>{data.price}</h5>
                                <button className="btn1" onClick={()=> cartitem(data)}>Add to cart</button>
                                {/* <button className="btn1" onClick={() => getProducts()}>Call the Function</button> */}
                                
                            </div>
                            

                        )
                    })}
                    {/* <div className="col-md-2 bg1  margin  "><h4>20% of space in row3</h4></div>
                    <div className="col-md-2 bg1 margin"><h4>20% of space in row3</h4></div>
                    <div className="col-md-2 bg1 margin "><h4>20% of space in row3</h4></div>
                    <div className="col-md-2 bg1 margin "><h4>20% of space in row3</h4></div>
                    <div className="col-md-2 bg1 margin "><h4>20% of space in row3</h4></div> */}
                    {/* <div className="col-md-1"></div> */}


                </div>
                {/* <div className="row margin1 mt">
                    <div className="col-md-1"></div>
                
                    <div className="col-md-2 bg1  margin   "><h4>20% of space in row3</h4></div>
                    <div className="col-md-2 bg1 margin "><h4>20% of space in row3</h4></div>
                    <div className="col-md-2 bg1 margin "><h4>20% of space in row3</h4></div>
                    <div className="col-md-2 bg1 margin "><h4>20% of space in row3</h4></div>
                    <div className="col-md-2 bg1 margin "><h4>20% of space in row3</h4></div>
                    <div className="col-md-1"></div>

            </div> */}
                {/* <div>
                    <h3 className=".h3">
                        <div >
                        <div className="active" >
                            
                        <a href="#" >&laquo;</a>
                        <a href="#"  >1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">6</a>
                        <a href="#">&raquo;</a>
                        </div>
                    </div></h3>
                </div> */}
        
                <Pagination
                    postsPerPage={5}
                    totalPosts={products.length}

                    page={page} />
            </div>
            
        </div>


    );

}
export default Home;