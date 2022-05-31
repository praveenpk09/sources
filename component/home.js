import React from 'react'
import './app.css';
import logo1 from '../images/content.png'
import log from '../images/log1.png'
import bit from '../images/bit.png'
// import { Slider, RangeSlider } from 'rsuite';
import "rc-slider/assets/index.css";
import Slider, { createSliderWithTooltip } from "rc-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from 'react';
import axios from 'axios';
const Home = () => {
  const [value, setValue] = useState(0);
  const [days, setDays] = useState(0);
  const [APR1, setAPR1] = useState(0);
  const [currestimatedreward, setCurrestimatedreward] = useState(0);
  const [stakeUsdtValue, setStakeUsdValue] = useState(0);
  const [price, setPrice] = useState();
  const [rewardUsdtValue, setRewardUsdtValue] = useState(0);
  const [amount1, setamount1] = useState(0);
  const[rewardUsdtValue1,setRewardUsdtValue1]=useState(0);
  const [currentAPR,setCurrentAPR]=useState(0);
console.log('price',price)
  
// useEffect(()=>{
//   const ele = document.querySelector('.buble');
// if (ele) {
//   ele.style.left = `${Number(days / 4)}px`;
// }
// })

  function handleChange(e) {
    calculateReward(e.target.value);
  }
  function handleDays(e) {
    calculateAPR(e.target.value);
  }
  useEffect(()=>{  
    let currentAPR = calculateAPR(days);
     setCurrentAPR(currentAPR);
  })
  const getPrices=async()=>{
    const result=await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=lockness&vs_currencies=usd');
  console.log(result);
const data=result.data.lockness.usd;
setPrice(data);
  }
  useEffect(()=>{
    getPrices();
},[])

  const calculateAPR = (days) => {
    setDays(days);
    let APR1 = (days * 0.1) +50;//(amount *30/100)365
    setAPR1(APR1.toFixed(3));
    calculateReward(value);
    console.log('reward'.calculateReward)
  }
  const calculateReward = (amount) => {
    setValue(amount);
    console.log("amount",amount);
    let amount1 = (amount * APR1) / 100;
    console.log("amount1",amount1)
    setamount1(amount1.toFixed(2));
  
    let stakeUsdtValue = (value * price).toFixed(2);
    setStakeUsdValue(stakeUsdtValue);

    let rewardUsdtValue1 = (amount1 * price).toFixed(2);
    setRewardUsdtValue1(rewardUsdtValue1);

    let currestimatedreward = ((amount1 / 365) * days);
    currestimatedreward = (Math.floor(currestimatedreward));
    setCurrestimatedreward(currestimatedreward)
    setRewardUsdtValue(currestimatedreward * price)
    console.log("cur",currestimatedreward);

   
  }



  return (
    <div className='container-fluid'>
      <header className='toleft'>
        <p className='imggg'><img src={log} width="40px" height="40px" />
          <h5>Crypto<span className='fontcolor'>Staking</span></h5></p>
        <button className='button-1'>Connect to wallet</button>
      </header>
      <hr />
      <div className='row'>
        <div className='col-md-4 hover'>
          <img src={logo1} className='imgg' width="380px" height="465px" />
        </div>
        <div className='col-md-7'>
          <div className='row border-1'>
            <div className='col-md-5 pad'>
              <h4>PK Bounty</h4>
              <div className='total mb pl'>
                <h6>Total Stake</h6><h6 className='pl ml'>0</h6>
              </div>
              <button className='mt button-2 '>Stake amount</button>
            </div>
            <div className='col-md-1 vl'></div>
            <div className='col-md-5 mt1'>
              <div className='total mb'>

                <img src={bit} width='25px' height='25px' className='bit'></img><h6>0</h6><span className='pl ml'>Rewards received</span>
              </div>
              <button className='mt button-3'>Collect reward</button>
            </div>

          </div>
          <div className='row border-1 mt'>
            <div className='col-md-12'><h4>Select your rewards</h4></div>

            <div className='col-md-3'>


              <p className='font'>Your estimated rewards </p>
              <span className='total1 mb1 font1'><p className='fontcolor'>{currestimatedreward}</p><p className='fontcolor'>PK</p><p className='fontcolor'>{rewardUsdtValue1}</p><p className='fontcolor'>USD</p></span>
              <p className='font '>Current APY</p>
              <p className='font1 fontcolor'>{APR1}</p>

            </div>
            <div className='col-md-1 vl1'></div>
            <div className='col-md-8'>
              <span className='total2 '><p className='fontcol'>Your Stake</p><h5>Token<input className='input ' type='text'
                value={value ? value : '0'} onChange={(e) => handleChange(e)}></input>PK</h5><h5>{stakeUsdtValue} USD</h5></span> 
                <Slider className='mt2'
                   min={0}
                  max={30000000}
                  value={value}
                  onChange={(value) => { calculateReward(value); }}
                  railStyle={{
                    height: 4,
                    width: 480,
                    left: 20
                  }}
                  handleStyle={{
                    height: 20,
                    width: 20,
                    marginLeft: 10,
                    marginTop: -10,
                    backgroundColor: "#8d3bff",
                    border: 10
                  }}
                  trackStyle={{
                    background: "#c69dff"
                  }} />
              <span className='total2 mt1'><p className='fontcol'>Your days</p><h5><input className='input' type='text'
                value={days} onChange={(e) => handleDays(e)}></input>Days</h5></span>
              <Slider className='mt2'
                min={0}
                max={365}
                value={days}
                onChange={(days) => { calculateAPR(days); }}
                railStyle={{
                  height: 4,
                  width: 480,
                  left: 20
                }}
                handleStyle={{
                  height: 20,
                  width: 20,
                  marginLeft: 10,
                  marginTop: -10,
                  backgroundColor: "#8d3bff",
                  border: 10
                }}
                trackStyle={{
                  background: "#c69dff"
                }} />
              <button className='button4'>stake Reward</button>


            </div>
          </div>

        </div>
        <div className='col-md-12'>
          <i class="fa-thin fa-arrow-up-arrow-down"></i>
          <h4>Transaction history</h4>
        </div>
        <div className='col-md-1'>
          <p>No</p>
        </div>
        <div className='col-md-3'>
          <p>hash</p>
        </div>
        <div className='col-md-2'>
          <p>wallet</p>
        </div>
        <div className='col-md-1'>
          <p>Usd</p>
        </div>
        <div className='col-md-2'>
          <p>CBE</p>
        </div>
        <div className='col-md-3'>
          <p>Transaction date</p>
        </div>

        <div className='col-md-12'>
          <div className=' row border-1 pdt'>
            <div className='col-md-1'>
              <p>No</p>
            </div>
            <div className='col-md-3'>
              <p>hash</p>
            </div>
            <div className='col-md-2'>
              <p>wallet</p>
            </div>
            <div className='col-md-1'>
              <p>Usd</p>
            </div>
            <div className='col-md-2'>
              <p>CBE</p>
            </div>
            <div className='col-md-3'>
              <p>Transaction date</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home