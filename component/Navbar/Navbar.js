import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../../redux/WalletAction";
 import log from '../images/log1.png'
import { Link } from "react-router-dom";
import './Navbar.css'
import { useNavigate } from "react-router-dom";
const Navbar = () => {

    let history = useNavigate();

    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.WalletConnect);
    const {connected } = wallet;
 //   console.log("wallet vesting :",wallet);

    const connect = () => {
       // console.log('connect');
        dispatch(connectWallet());
    }

    const errorDiv = () => {
        return (
            <p>Wallet Disconnected!</p>
        )
    }
    const disconnect = () => {
        
        const { web3Modal } = wallet;
        web3Modal.clearCachedProvider();
        dispatch(connectFailed(errorDiv()));      
    }
    return (
        <nav className='navbar navbar-expand-lg'>
            <div className="container-fluid navbar_mobile" style={{margin:0}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <Link className="nav-link"  to='/'>
                <img src={log} className='brand_logo_img'/></Link>


                { !wallet.connected &&  
                                <button className='navbar-toggler mr-auto ml-auto connect_btn_mobile' onClick={connect}>Connect Wallet</button> 
                            }
                        { wallet.connected && 
                       <Link className="nav-link"  to='/'><button className='navbar-toggler mr-auto ml-auto btn btn-danger disconnect_btn_mobile' onClick={disconnect} ><span className="disconnect">Disconnect</span> {wallet.address.slice(0, 5) + '...' + wallet.address.slice(-5)}</button> </Link>
                        }
                <div className="navbar navbar-collapse d-none d-md-block">
                   <div className="nav navbar-nav ms-auto ml-auto">
                        { !wallet.connected &&  
                                <button className='btncont ' onClick={connect}>Connect Wallet</button> 
                            }
                        { wallet.connected && 
                         <Link className="nav-link"  to='/'>  <button className='btn btn-danger disconnect_btn_pc' onClick={disconnect}>Disconnect: {wallet.address.slice(0, 5) + '...' + wallet.address.slice(-5)}</button></Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
