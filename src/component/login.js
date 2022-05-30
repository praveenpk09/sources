import React from 'react'
import './loginstyle.css'
import { useState } from 'react';
import { ToastContainer, toast, Zoom, Slide, Bounce, Flip,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function Login() {

  const[email, setEmail]=useState('');
  const[password, setPassword]=useState('');
  const emailRegex = /\S+@\S+\.\S+/;
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [ispass, setIsPass] = useState(false);
  const [msg, setMsg] = useState('');
  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  // const history = useHistory();
const navigate = useNavigate();


  // const [emailError, setEmailError] = useState('')
  // const validateEmail = (e) => {
  //   var email = e.target.value
  
  //   if (validator.isEmail(email)) {
  //     setEmailError('You are ready to get in')
  //   } else {
  //     setEmailError('Enter your email to get in!')
  //   }
  // }
  async function toasting(){
      if(emailRegex.test(email)){
    setIsValid(true);
    setMessage('Your email looks good!');
    
    if(regularExpression.test(password)){
     setIsPass(true);
     setMsg("your password is correct")
     var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");
     var raw = JSON.stringify({
       email: email,
       password: password,
     });
     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: raw,
       redirect: 'follow'
     };

     fetch("http://localhost:8090/login", requestOptions)
       .then(response => response.json())
       .then(result => {console.log(result)
        if(result.status==true){
          navigate('/home');
          console.log('yaru',result);
          console.log('yaru ivan',result.description[0]._id)
          localStorage.setItem("userId",result.description[0]._id)
          
        toast.success("Login success",
        {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:'dark',
          transition:Slide
          });}
          else{toast.error('error', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'dark',
            transition:Slide
            });
    

          }
        })
       .catch(error => {console.log('error', error); toast.error('error', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:'dark',
        transition:Slide
        });});
     
     
      }
    }else{
      setIsValid(false);
      setMessage('');
      toast.error('Please enter a Valid email', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:'dark',
        transition:Slide,
        });
      }
    }

  
  return (
    <div className='login'>
       
        <div className='login2'>
        <div className='row'>
            <div className='col-md-12'><p></p></div>
             
            <div className='col-md-4'></div>
            <div className='col-md-2 back'>
                <button className='butt'>Login</button>
         </div>
         <div className='col-md-2 back'>
        <a href='/signin'> <button className='buu'>SignIn</button></a>
         </div>
            
            <div className='col-md-4'></div>
            <div className='col-md-4'></div>
            <div className='col-md-4 back'>
               <h6>Email address</h6>
                <input type={'email'} placeholder="Email" className='in'onChange={(e)=> setEmail(e.target.value)} value={email} ></input>
                <div className={`message ${isValid ? 'success' : 'error'}`}>
        {message}
      </div>
            </div>
            <div className='col-md-4'></div>
            <div className='col-md-4'></div>
            <div className='col-md-4 back'>
                <h6 className='h666'>Password</h6>
                <input type={'password'} placeholder='Password' className='in' onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <div className={`msg ${ispass ? 'success' : 'error'}`}>
        {msg}
      </div>
            </div>
            <div className='col-md-4'></div>
            <div className='col-md-4'></div>
            <div className='col-md-2 back'>
                <input type={'checkbox'} className="check"/><label>Remember me</label>
            </div>
            <div className='col-md-2 back'><a className='small'>Forgotten password?</a></div>
            <div className='col-md-4'></div> 
             <div className='col-md-4'></div> 
            <div className='col-md-4 back text-center'>
                <button className='mt' onClick={toasting} >Log in</button>
            </div>
            <div className='col-md-4'></div>
            <div className='col-md-12'><p></p></div>
        </div>
        <ToastContainer/>
        </div>
        
    </div>
  )
}

export default Login