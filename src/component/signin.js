import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast, Slide,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Signin() {
  const [firstname, setFirstName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const emailRegex = /\S+@\S+\.\S+/;
  const [setpasswords, setPassword] = useState('');
  const [ispass, setIsPass] = useState(false);
  const [msg, setMsg] = useState('');
  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const [isTrue, setisTrue] = useState(false);
  const [sms, setSms] = useState('')
  




  function toasting() {
    if (firstname !== '') {
      if (phonenumber.match('[0-9]{10}')) {
        if (emailRegex.test(email)) {
          setIsValid(true);
          setMessage('Your email looks good!');
          if (regularExpression.test(setpasswords)) {
            setIsPass(true);
            if (confirm === setpasswords) {
              setisTrue(true);
              // setSms("Password is same")

              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              var raw = JSON.stringify({
                firstname: firstname,
                phonenumber: phonenumber,
                email: email,
                confirm: confirm,
              });
              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };

              fetch("http://localhost:8090/signup", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));


              toast.success("Login success", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Slide
              });
            } else {
              setisTrue(false);
              setSms('');
              toast.error('Give youru correct cofirmation password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Slide,
              });
            }


          } else {
            setIsPass(false);
            setMsg('');
            toast.error('PASSWORD:Use atleast one Uppercase,Numbers,special characters and atleast 8 charcters needed', {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
              transition: Slide
            });
          }
        } else {
          setIsValid(false);
          setMessage('');
          toast.error('Please give a valid Email!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Slide,
          });
        }
      } else {
        toast.error('Give your 10 Digit valid number', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Slide
        });
      }
    } else {
      toast.error('The fullname is empty', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
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
            <button className='but'><a href='/login'> Login</a></button>
          </div>
          <div className='col-md-2 back'>
            <button className='bu'>Sign In</button>
          </div>

          <div className='col-md-4'></div>
          <div className='col-md-4'></div>
          <div className='col-md-4 back'>
            <h6 className='h67'>Full name</h6>
            <input type={'text'} placeholder="Email" className='in' onChange={(e) => setFirstName(e.target.value)} value={firstname}></input>
          </div>
          <div className='col-md-4'></div>
          <div className='col-md-4'></div>
          <div className='col-md-4 back'>
            <h6 className='h6'>Phone number</h6>
            <input type={'text'} placeholder="Mob no" className='in' onChange={(e) => setPhoneNumber(e.target.value)} value={phonenumber}></input>
          </div>
          <div className='col-md-4'></div>
          <div className='col-md-4'></div>
          <div className='col-md-4 back'>
            <h6 className='h16'>Email</h6>
            <input type={'email'} placeholder="Email" className='in' onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <div className={`message ${isValid ? 'success' : 'error'}`}>
              {message}
            </div>
          </div>
          <div className='col-md-4'></div>
          <div className='col-md-4'></div>
          <div className='col-md-4 back'>
            <h6 className='h67' >Set Password</h6>
            <input type={'password'} placeholder="Set pass" className='in' onChange={(e) => setPassword(e.target.value)} value={setpasswords}></input>
            <div className={`msg ${ispass ? 'success' : 'error'}`}>
              {msg}
            </div>
          </div>
          <div className='col-md-4'></div>
          <div className='col-md-4'></div>
          <div className='col-md-4 back'>
            <h6 className='h66'>Confirm Password</h6>
            <input type={'password'} placeholder='Confirm pass' className='in' onChange={(e) => setConfirm(e.target.value)} value={confirm}></input>
            <div className={`sms ${isTrue ? 'success' : 'error'}`}>
              {sms}
            </div>

          </div>
          <div className='col-md-4'></div>
          <div className='col-md-4'></div>
          <div className='col-md-4 back'>
            <input type={'checkbox'} className="checkk" /><span>I have accepted terms & conditions</span>
          </div>
          <div className='col-md-4'></div>
          <div className='col-md-4'></div>
          <div className='col-md-4 back'> <input type={'checkbox'} className="checkk" /><span>I want to subscribe to the newspaper</span></div>
          <div className='col-md-4'></div>
          <div className='col-md-4'></div>
          <div className='col-md-4 back text-center'>
            <button className='mt' onClick={toasting}>Log in</button>
          </div>
          <div className='col-md-4'></div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Signin