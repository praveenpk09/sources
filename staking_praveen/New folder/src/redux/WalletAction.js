// constants
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import store from "./store";
import DPNToken from "../contracts/dpntoken.json"
import DPNStaking from "../contracts/staking.json" 

const activeNetwork = (payload) => {
  return {
    type: "NETWORK_CHANGE",
    payload: payload,
  };
};


const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

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

// const updateAccountRequest = (payload) => {
//   return {
//     type: "UPDATE_ADDRESS",
//     payload: payload,
//   };
// };

const getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          //infuraId: process.env.REACT_APP_INFURA_ID
          rpc: {
            56: "https://bsc-dataseed.binance.org",
             97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
             // 80001: "https://rpc-mumbai.maticvigil.com"
            // 4002: "https://rpc.testnet.fantom.network/"
          }
        }
      }
    }

    return providerOptions;
}

export const connectWallet = () => {
    return async(dispatch) => {
        dispatch(connectRequest());
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: true,
                providerOptions: getProviderOptions() // required
            });
    
            const provider = await web3Modal.connect();
            const TokencontractAddress = '0x9cBaa3f5505975CB0ffc816de847Bcb235D24445';
            const  StakingContractAddress ='0x1Ae7b90149b1F969B52F043C2F49a572E35c27f4';
            await subscribeProvider(provider,dispatch);
            
            const web3 = new Web3(provider);
        
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            // const dpntoken = new web3.eth.Contract(dpntokenabi,TokencontractAddress);
            // const dpnstaking = new web3.eth.Contract(dpnstakingabi, StakingContractAddress);
            const dpnstaking = new web3.eth.Contract(DPNStaking,StakingContractAddress);
            console.log(dpnstaking)
            const dpntoken = new web3.eth.Contract(DPNToken,TokencontractAddress)  
            const networkId = await web3.eth.net.getId();
            console.log(networkId);
            // const token = new web3.eth.Contract(
            //   tokenContract,
            //   //tokenContract.output.abi,
            //   tokenContractAddress
            // );

           

           

               
            // if(window.ethereum && window.ethereum.networkVersion !== '80001') {
            //   await addNetwork(80001);
            // }
            dispatch(
                connectSuccess({
                    address,
                    web3,
                    dpnstaking ,
                    dpntoken,
                    provider,
                    connected: true,
                    web3Modal
                })
            );
            dispatch(
              activeNetwork({
                  address,
                  web3,
                  dpnstaking ,
                  dpntoken,
                  provider,
                  connected: true,
                  web3Modal
              })
          ); 
        } catch (e) {
            dispatch(connectFailed(e));
        }
    }
}

const subscribeProvider = async(provider,dispatch) => {
    if (!provider.on) {
      return;
    }

    provider.on('connect', async(id) => {
      console.log(id);
    });

    provider.on("networkChanged", async (networkId) => {
    //  const {web3} = store.getState().WalletConnect;
    //  console.log(web3);
    //  console.log(networkId);
      if(networkId === '97') {
        const web3Modal = new Web3Modal({
          cacheProvider: true,
          providerOptions: getProviderOptions() // required
      });

      const provider = await web3Modal.connect();
      var web3 = new Web3(provider);
        const TokencontractAddress = '0x9cBaa3f5505975CB0ffc816de847Bcb235D24445';
        const  StakingContractAddress ='0x1Ae7b90149b1F969B52F043C2F49a572E35c27f4';
        const dpnstaking = new web3.eth.Contract(DPNStaking,StakingContractAddress);
        console.log(dpnstaking)
        const dpntoken = new web3.eth.Contract(DPNToken,TokencontractAddress);
      
      
        const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
           
          dispatch(

            activeNetwork({
              address,
              web3,
              dpnstaking ,
              dpntoken,
              provider,
              connected: true,
            
          })
          )
        // store.dispatch(connectFailed('Please switch to Binance mainnet'));
      } else if(networkId === "80001"){
       
        const web3Modal = new Web3Modal({
          cacheProvider: true,
          providerOptions: getProviderOptions() // required
      });

      const provider = await web3Modal.connect();
      var web3 = new Web3(provider);

          const TokencontractAddress = '0x845d1c171dd3AC2bc274aE23Fac02Ea3D0e32bA2';
          const  StakingContractAddress ='0x5f28c9eAfD10D20Ab04C4EBeB0012e8fD171625E';


          const dpnstaking = new web3.eth.Contract(DPNStaking,StakingContractAddress);
          console.log(dpnstaking)
          const dpntoken = new web3.eth.Contract(DPNToken,TokencontractAddress);
          
          const accounts = await web3.eth.getAccounts();

          const address = accounts[0];
           console.log(address) ;

            dispatch(
  
              activeNetwork({
                address,
                web3,
                dpnstaking ,
                dpntoken,
                provider,
                connected: true,
              
            })
            )

          // store.dispatch(connectFailed('Please switch to Binance mainnet'));
        

      } else if(networkId === "4002")
      {
        const web3Modal = new Web3Modal({
          cacheProvider: true,
          providerOptions: getProviderOptions() // required
      });

      const provider = await web3Modal.connect();
      var web3 = new Web3(provider);
          const TokencontractAddress = '0x1D0455B507B1562D78C3af4Ca6F536E594B4BaB6';
          const  StakingContractAddress ='0x4e13b6DB14D73cFaCd436177fd784EC6A795a983';
          console.log(web3)
          const dpnstaking =new web3.eth.Contract(DPNStaking,StakingContractAddress);
          console.log(dpnstaking)
          const dpntoken = new web3.eth.Contract(DPNToken,TokencontractAddress)
          const accounts = await web3.eth.getAccounts();
              const address = accounts[0];
             
            dispatch(
              activeNetwork({
                address,
                web3,
                dpnstaking ,
                dpntoken,
                provider,
                connected: true,
              
            })
            )
          // store.dispatch(connectFailed('Please switch to Binance mainnet'));
        }


      
    });
}

export async function addNetwork(id) {
  let networkData;
  console.log(id);
  switch (id) {
    //bsctestnet
    case 97:
      networkData = [
        {
          chainId: "0x61",
          chainName: "BSCTESTNET",
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          nativeCurrency: {
            name: "BINANCE COIN",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
      ];

      break;

      //polygon testnets

      case 80001:
        networkData = [
          {
            chainId: "80001",
            chainName: "Mumbai Testnet",
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            nativeCurrency: {
              name: "Mumbai Testnet",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ];
  
        break;

      // fantom testnet  
        case 4002:
          networkData = [
            {
              chainId: "4002",
              chainName: "Fantom Testnet",
              rpcUrls: ["https://rpc.testnet.fantom.network/"],
              nativeCurrency: {
                name: "Fantom Testnet",
                symbol: "FTM",
                decimals: 18,
              },
              blockExplorerUrls: ["https://faucet.fantom.network/"],
            },
          ];
    
          break;
    //bscmainet
    case 56:
      networkData = [
        {
          chainId: "0x38",
          chainName: "BSCMAINET",
          rpcUrls: ["https://bsc-dataseed1.binance.org"],
          nativeCurrency: {
            name: "BINANCE COIN",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
      ];
      break;
    default:
      break;
  }
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: networkData,
  });
}

(() => {
  if(window.ethereum) {
    window.ethereum.on('networkChanged', function(networkId){
      if(networkId !== '97') {
        console.log(networkId);
        store.dispatch(connectFailed('Please switch to Binance mainnet'));
      } else {
        store.dispatch(connectWallet());
      }
    });
  }
})();



