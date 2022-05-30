import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, connectFailed } from "../redux/WalletAction";
import "../components/Navbarcss.css"
import { Container } from "react-bootstrap";


const Navbar = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.WalletConnect);
    console.log(wallet);

    const connect = () => {
        console.log('connect');
        dispatch(connectWallet());
    }

    const network = useSelector((state) =>state.WalletConnect);
    console.log(network);

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
        <Container fluid>
        <nav className='navbar'>
          
                {/* <a className="navbar-brand" href="/"></a> */}
                <div className="navbar">
                    <div className="nav">
                        { !wallet.connected &&  
                                <button className='btn btn-primary'  onClick={connect}>Connect Wallet</button> 
                            }
                        { wallet.connected && 
                            <button className='btn btn-danger' onClick={disconnect}>Disconnect: {wallet.address.slice(0, 5) + '...' + wallet.address.slice(-5)}</button>
                        }
                    </div>
                </div>    
        </nav>
        </Container>
    );
}

export default Navbar;