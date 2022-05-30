import React from 'react'
import { useState,useEffect} from 'react';
import logo1 from '../images/1.jpg'
import { ToastContainer, toast, Zoom, Slide, Bounce, Flip,} from 'react-toastify';
import './profile.css'
const axios = require('axios').default;
function Profile() {
    const [productitem,setProducti]=useState([])
    const[user,setuser]=useState(localStorage.getItem('userId'))
    const[profileDetails,setprofileDetails] =useState("");
    const[picture,SetPicture]=useState('')
    console.log("user",user)
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
         user:user,
        });
       
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch("http://localhost:8090/profile", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                       
                        setprofileDetails(result.description[0])
                        console.log('Prodet',profileDetails)
                    })
                    .catch(error => console.log('error', error));

    },[])
   function changePicture(event){
    const data =new FormData();
    data.append('image',picture);
    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow'
    };

    fetch("http://localhost:8090/single", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
       SetPicture(event.target.files[0])
           if(picture.size > 1024){
            alert('Your image size is too large')
               return false;
           }
   }
   function toChange(){
   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   var raw = JSON.stringify({
       user:user,
       firstname:profileDetails.firstname,
   });
   alert('get',user)
   var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow'
   };

   fetch("http://localhost:8090/update", requestOptions)
     .then(response => response.JSON())
     .then(result => console.log(result))
     .catch(error => console.log('error', error));

}
    return (
        <div>
            {/* { profileDetails.map((data) => { 
                 return( */}
            <div className='row'>
                <div className='col-md-12 top'></div>
                <div className='col-md-6 left'>
                {picture && <ImageThumb image={picture} className="width"/>}
                <input type={'file'}  onChange={changePicture}/>
                <button onClick={toChange}>Edit</button>
                    
                </div>
                <div className='row'>
                    <div className='col-md-12 top'></div>
                    <div className='col-md-6'>
                        <a>About</a>
                    </div>
                    <div className='col-md-6 '></div>
                    <div className='col-md-3 '>
                        <h6>User ID</h6>
                    </div>
                    <div className='col-md-3'>
                        <h6>{profileDetails._id}</h6>
                    </div>
                    <div className='col-md-6'></div>
                    <div className='col-md-3'>
                        <h6>Name</h6>
                    </div>
                    <div className='col-md-3'>
                    <input type='text' value={profileDetails.firstname} />
                    </div>
                    <div className='col-md-6'></div>

                    <div className='col-md-3'>
                        <h6>Email</h6>
                    </div>
                    <div className='col-md-3'>
                    <input type={'text'} value={profileDetails.email}/>
                        <div className='col-md-6'></div>
                    </div>
                </div>
            </div>
                {/* )
             })} */}
        </div>
    )
}
const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} className="width" alt={image.name} />;
  };
export default Profile
