import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const getProviderOptions = () => {
    const providerOptions = {
      Walletconnect: {
        package: WalletConnectProvider,
        options: {
          //infuraId: process.env.REACT_APP_INFURA_ID
          rpc: {
            56: "https://bsc-dataseed.binance.org",
            97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
            //  80001: "https://rpc-mumbai.maticvigil.com"
            // 4002: "https://rpc.testnet.fantom.network/"
          }
        }
      }
    }

    return providerOptions;
}

const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: getProviderOptions() // required
});


const initialState = {
    loading: false,
    address: "",
    connected: false,
    web3: null,
    provider: null,
    dpnstaking:null,
    dpntoken: null,
    token: null,
    errorMsg: null,
    reward: null,
    web3Modal
}
export const WalletConnect = (state = initialState, action) => {
    switch (action.type) {
        case "CONNECTION_REQUEST":
            return {
                ...initialState,
                loading: true,
            };
        case "CONNECTION_SUCCESS":
            return {
                ...state,
                loading: false,
                address: action.payload.address,
                token: action.payload.token,

                dpnstaking:action.payload.dpnstaking,
                dpntoken:action.payload.dpntoken,

                reward: action.payload.reward,
                web3: action.payload.web3,
                provider: action.payload.provider,
                connected: action.payload.connected
            };
        case "CONNECTION_FAILED":
            return {
                ...initialState,
                loading: false,
                errorMsg: action.payload,
            };
        case "UPDATE_ADDRESS":
            return {
                ...state,
                address: action.payload.address,
            };
        default:
            return state;
    }
};

const networkInitialStatus={

    web3: null,
    provider: null,
    dpnstaking:null,
    dpntoken: null,
    token: null,
    errorMsg: null,
    reward: null,
    connected: false,

};

export const activeNetwork = (state = networkInitialStatus,action) =>{
  switch(action.type){
   case "NETWORK_CHANGE":
   return{

    address: action.payload.address,
    token: action.payload.token,

    dpnstaking:action.payload.dpnstaking,
    dpntoken:action.payload.dpntoken,

    reward: action.payload.reward,
    web3: action.payload.web3,
    provider: action.payload.provider,
    connected: action.payload.connected
   };

 default: 
 return state;

  }


}

export default WalletConnect;
  