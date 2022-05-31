import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import store from "./store";
import contract from "../contract/vesting.json";
import Token from "../contract/token.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const currentchainid = process.env.REACT_APP_chainid

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

export const disconnectRequest = () => {
  return {
    type: "DISCONNECT"
  };
}


export const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

export const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const getProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        //infuraId: '1225dbb4ccc94c219acf51ef31fa42de'
        rpc: {
          4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        }
      }
    },
  }
  return providerOptions;
}
export const connectWallet = () => {
    return async(dispatch) =>  {
      
        dispatch(connectRequest());
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: true,
                providerOptions: getProviderOptions() // required
            });
    
            const provider = await web3Modal.connect();
           const VestingContractAddress = process.env.REACT_APP_VestingContractAddress
           const TokenContractAddress = process.env.REACT_APP_TokenContractAddress
          
    
            await subscribeProvider(provider,dispatch);
            
            const web3 = new Web3(provider);

            web3.eth.extend({
                methods: [

                  {
                     name:"chainId",
                     call: "eth_chainId",
                     outputFormatter: web3.utils.hexToNumber
                  }
                ]
            });
        
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
           
           const vesting =new web3.eth.Contract(
             contract,
             VestingContractAddress
              );

              const token = new web3.eth.Contract(
                Token,
                TokenContractAddress
              )
          //  console.log("currentchainid",currentchainid)
            if(window.ethereum && window.ethereum.networkVersion !== currentchainid ) {
              await addNetwork(currentchainid);
            }
           
              const details = await vesting.methods.getInvestorDetails(address).call();
              const owneradd = await vesting.methods.owner().call();
              const totalBalance = parseInt(web3.utils.fromWei(details.totalBalance,'ether'));  
           
if(owneradd===address)
{
  if(window.location.pathname !=='/admin'){
    window.open(window.location.origin + "/admin","_self");
  }
  dispatch(
    connectSuccess({
        address,
        web3,
        vesting,
        token,
        provider,
        connected: true,
        web3Modal
    })
);
}
            else if (totalBalance > 0)
              {
                if(window.location.pathname !=='/dashboard'){
                  window.open(window.location.origin + "/dashboard","_self");
                }
              dispatch(
                connectSuccess({
                    address,
                    web3,
                    vesting,
                    provider,
                    connected: true,
                    web3Modal
                })
            );
              } else if(totalBalance > 0){
                 if(window.location.pathname !=='/dashboard'){
                  window.open(window.location.origin + "/dashboard","_self");
                }
                dispatch(
                     connectSuccess({
                      address,
                      web3,
                      vesting,
                      provider,
                      conected: true,
                      web3Modal
                     })
                )
              }
          else {
             if(window.location.pathname !=='/'){
               window.open(window.location.origin + "/","_self");
             }
            toast('wallet not whitelisted!');
              
          }
        } catch (e) {
            dispatch(connectFailed(e));
        }
    }
    
}
export const disconnect = () => {
  return async(dispatch)=> {
    const { web3Modal } = store.getState().walletConnect;
  
    web3Modal.clearCachedProvider();
    dispatch(disconnectRequest());
  }
}
const subscribeProvider = async(provider) => {
    if (!provider.on) {
      return;
    }

    provider.on('connect', async(id) => {
      
    });

    provider.on("networkChanged", async (networkId) => {
      if(networkId !== currentchainid) {
       
        store.dispatch(connectFailed('Please switch to ETH Mainnet'));
      } else {
      
      }
    });

}

export async function addNetwork(id) {
  //alert(typeof id)
  let networkData;
  switch (parseInt(id)) {
      case 4:
        networkData = [
          {
            chainId: '0x4'
          }
        ]
        break;
      case 1:
        networkData = [
          {
            chainId: '0x1'
          }
        ]
        break;
    default:
      break;
  }
  if(id!=currentchainid)
  {
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: networkData,
      });
  }
  else
  {
    return window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: networkData,
      });
  }
}



