import React  from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "../components/Home.css"
import { Container} from 'react-bootstrap';
import {connectWallet} from '../redux/WalletAction';
// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";



function Header (props)  {
   console.log(props);
    const [value,stakeValue]=useState(1000);
    const [value2,setValue2]=useState(10);
    const [apyvalue,setApyvalue]=useState(0);
    const [apymonth,setApymonth]=useState(0);
    const [apyreward,setreward]=useState(0);
    const [APR1,setAPR1]=useState(0);
    const [APR2,setAPR2]=useState(0);
    const [APR3,setAPR3]=useState(0);
    const [amount1,setamount1]=useState(0);
    const [amount2,setamount2]=useState(0);
    const [amount3,setamount3]=useState(0);
    const [currindex,setCurrindex]=useState(0);
    const [hideApprove,setHideApprove]=useState(false);
    const [isApproved,setApproved]=useState(false);
    const [allowace,setAllowance]=useState(0);
    const [rewardUsdtValue,setRewardUsdtValue]=useState(0);
    const [stakeUsdtValue,setStakeUsdValue]=useState(0);
    const [price,setPrice]=useState(0.01219);
    const [currentAPR,setCurrentAPR]=useState(0);
    const [tokenAmount, gettokenAmount]=useState(0);
    const [totaltoken,settotaltoken]=useState(100000000)
    const [StakeRecords,setStakeRecords]=useState([]);
    const [currestimatedreward,setCurrestimatedreward]=useState(0);
    const [currestimatedreward2,setCurrestimatedreward2]=useState(0);
    const [currestimatedreward3,setCurrestimatedreward3]=useState(0);
    const[griddata,setgriddata]=useState([]);
     const wallet = useSelector((state)=>state.WalletConnect);
     console.log(wallet)
    // let price = 75.79
    // setPrice(price)
function handleChange(e){
  calculateReward(e.target.value);
}
function handleDays(e){
  calculateAPR(e.target.value);
}

useEffect(()=>{  
 let currentAPR = calculateAPR(value2);
  setCurrentAPR(currentAPR);


if(wallet.connected !== false)
{
  console.log('in promise call back');
   getStakeRecords();
   checkAllowance();
}   
},
 [wallet.connected == true]
)
useEffect(()=>{
const {web3}=wallet;
if(wallet.connected !== wallet.connected){
 getStakeRecords();
}
})



    useEffect(()=>{
        const ele = document.querySelector('.buble');
      if (ele) {
        ele.style.left = `${Number(value / 4)}px`;
      }
    })
   

    useEffect(()=>{
        const ele = document.querySelector('.buble');
      if (ele) {
        ele.style.left = `${Number(value2 / 4)}px`;
      }
    })

    const approval = async() =>{
       const {address,dpntoken,web3}=wallet
       const tokenAmount =web3.utils.toWei('99999999','ether');
       const stakingControstAddress= "0x5f28c9eAfD10D20Ab04C4EBeB0012e8fD171625E" ;
       const approval = await dpntoken.methods.approve(stakingControstAddress,tokenAmount).send({
        from: address
       })
      setApproved(true);
}


    const stakeLkn = async() =>{
      
     if(value > 0 && value2 > 0 ){
        const{web3,dpnstaking,address}=wallet;
        console.log(dpnstaking);
        const tokenAmount=web3.utils.toWei(value.toString(),'ether');
        const stake = await dpnstaking.methods.stake(tokenAmount,value2,'2').send({from: address});
        
         await getStakeRecords();
     }else{
       alert('Amount of LKN or days should be more than 0!');
     }

    }
    const stakeLkn1 = async() =>{
      
      if(value > 0 && value2 > 0 ){
         const{web3,dpnstaking,address}=wallet;
         console.log(dpnstaking);
         const tokenAmount=web3.utils.toWei(value.toString(),'ether');
         const stake = await dpnstaking.methods.stake(tokenAmount,value2,'0').send({from: address});
         
          await getStakeRecords();
      }else{
        alert('Amount of LKN or days should be more than 0!');
      }
 
     }
     const stakeLkn2 = async() =>{
      
      if(value > 0 && value2 > 0 ){
         const{web3,dpnstaking,address}=wallet;
         console.log(dpnstaking);
         const tokenAmount=web3.utils.toWei(value.toString(),'ether');
         const stake = await dpnstaking.methods.stake(tokenAmount,value2,'1').send({from: address});
         
          await getStakeRecords();
      }else{
        alert('Amount of LKN or days should be more than 0!');
      }
 
     }

    const getStakeRecords = async() => {
      const {web3, address, dpnstaking} =wallet;
      let result = [];
      //Check for v1 stake records
      // const v1TotalStakeRecords = await dpnstaking.methods.totalStakeRecords(address).call();
      // if(v1TotalStakeRecords > 0) {
      //   console.log('in v1',v1TotalStakeRecords);
      //  await getV1StakeRecords(v1TotalStakeRecords);
      // }
      const totalStakeRecord = await dpnstaking.methods.totalStakeRecords(address).call();
    const stakersPromises = [];
    for(let i = 0; i < totalStakeRecord; i++) {
      stakersPromises.push(dpnstaking.methods.Stakers(address, i).call());
    }
    let array=[]
    Promise.all(stakersPromises).then(async(res) => {
      await Promise.all(res.map(async(data, i) => {
        data.balance = web3.utils.fromWei(data.balance, 'ether');
        let earnedperstak = await dpnstaking.methods.earned(address, i).call();
        data.rewardEarned = web3.utils.fromWei(earnedperstak, 'ether').split('.')[0];
        // data.maxapr = calculateAPR(parseInt(data.lockingPeriod));
        data.apr =web3.utils.fromWei(data.apr,"");
        // data.maxapr =parseInt(data.apr) ;
        const time = Math.floor(Math.floor(data.maxTime - (Date.now() / 1000)) / (60));
        data.timeleft = time < -1 ? -1 : time;
        console.log("data",data);
        array.push(data);
      }));
      setgriddata(array)
      if(res.length > 0) {
        setStakeRecords(res);
      }
    });
  }
  const unstake = async(record)=>{
    const {web3,dpnstaking,address}=wallet;
    const instance = dpnstaking;
    if(isTimeEnded(record,instance)){
      const exit =await instance.methods.exit(record).send({from: address});
    }else {
      const unstake= await instance.methods.unstake(record).send({from: address}); 
     console.log(unstake);
    }
     await getStakeRecords();
  }


  const isTimeEnded = async(record,instance)=>{
   const{address} = wallet;
   const stakerDetails = await instance.methods.Stakers(address,record).call();
   console.log(stakerDetails);

   if(parseInt(stakerDetails.maxTime) <= Math.ceil(Date.now()/1000)){
     return true;
   }
     return false;
  }
  
  const canUnstake = (data) =>{
    console.log(data.maxTime < (Date.now()/1000));
    return !(data.maxTime < (Date.now()/1000) );
  }
  const claimReward = async (record) => {
       const { dpnstaking,address } = wallet;
       const instance = dpnstaking;
       if(await isTimeEnded(record,instance)){
         const exit=await instance.methods.getReward(record).send({from: address});
       } else{
         const claimReward = await instance.methods.getReward(record).send({from: address});
         console.log(claimReward);
       }
       await getStakeRecords(); 
  }

  const checkAllowance= async()=>{
      const {web3, dpntoken, address} = wallet;
    const stakingContractAddress = '0x1Ae7b90149b1F969B52F043C2F49a572E35c27f4';
    const allowance = await dpntoken.methods.allowance(address, stakingContractAddress).call();
    const allowanceFromWei = parseInt(web3.utils.fromWei(allowance, 'ether'));

    setAllowance(allowanceFromWei)

      if(allowanceFromWei < value) {
        console.log('to be approved!')
        setApproved(false);
      } else {
        console.log('approved');
        setApproved(false);
      }

    }

//  const getV1StakeRecords = async(totalRecords)=> {
//          const {web3,address,dpnstaking}=wallet;
//          const stakerspromises=[];
//          for(let i=0; i<totalRecords;i++){
//            stakerspromises.push(dpnstaking.methods.Stakers(address,i).call());
//          }

//      Promise.all(stakerspromises).then(async(res) => {
//         await Promise.all(res.map(async(data,i) =>{
//          data.balance = web3.utils.formwei(data.balance,'ether');
//          let enrnedperstak = await dpnstaking.methods.earned(address,i).call();
//          data.rewardEarned = web3.utils.fromwei(earnedperstak,'ether').split('.')[0];
//          data.maxapr = calculateAPR(parseInt(data.lockingPeriod));
//          const time = Math.floor(Math.floor(data.maxTime- (Date.now()/1000))/(60));
//          data.timeleft = time < -1 ? -1 :time;
//          console.log(data.timeleft);

//         }));
//         if(res.length>0){
//           return setV1StakeRecords(res);

//         }
//       });
//     }
 
const  calculateAPR = (days) => {
  // calculateAPR = (parseInt(days,'days'));
    setValue2(days);
  
  
   let APR1 = ( days * 0.001) + 25;
   let APR2 = ( days * 0.002) + 50;
   let APR3 = ( days * 0.003) + 75;
   setAPR1(APR1.toFixed(3));
   setAPR2(APR2.toFixed(3));
   setAPR3(APR3.toFixed(3));
  calculateReward(value);
   // currentAPR = currentAPR.toFixed(3);
   // return currentAPR;
 }


    const  calculateReward = (amount) => {
          stakeValue(amount);
      let amount1 = (amount * APR1)/100;
      let amount2 = (amount * APR2)/100;
      let amount3 = (amount * APR3)/100;
      setamount1(amount1.toFixed(2));
      setamount2(amount2.toFixed(2));
      setamount3(amount3.toFixed(2));

        let currentestimatedreward = (( amount1 / 365) * value2);
        let currentestimatedreward2 = (( amount2 / 365) *value2);
        let currentestimatedreward3 = (( amount3 / 365) *value2);
           currentestimatedreward = (Math.floor(currentestimatedreward));
           currentestimatedreward2 = (Math.floor(currentestimatedreward2));
           currentestimatedreward3 = (Math.floor(currentestimatedreward3));
         setCurrestimatedreward(currentestimatedreward)
         setCurrestimatedreward2(currentestimatedreward2)
         setCurrestimatedreward3(currentestimatedreward3)
        setRewardUsdtValue(currentestimatedreward * price)

             let stakeUsdtValue =(value * price).toFixed(2);
             setStakeUsdValue(stakeUsdtValue);
             let rewardUsdtValue1 = (amount1 * price).toFixed(2);
             setRewardUsdtValue(rewardUsdtValue1);
         // calculateAPR(value2);
   
            }
  

  return (
<div className='body'>
<div>
 
<Container fluid>
       <div className='row'>
                              {/* <div className='btn'><span className='wallet'>Connect Wallet</span></div> */}
  
                       <div className='dpnline'>
                          <span className='dpn'>DPN STAKING</span>
                       </div>
       </div>
  </Container>
    
    <Container>
    <div className='row'>
       <div className='col lg-5'>
           <div className='container1'>
           <h1 className='h1'>DPN BOUNTY</h1>
           {/* .filter((e,i) => griddata.length-1<=griddata.length) */}
          {griddata.map((data,i)=>
          {
            if(data.balance !== '0'){
            return(
              <div className='stackcon1'>
             <p className='apy_1Text'>Apy</p> 
            <p className='apy_value' style={{color:"white"}}>{data.balance} DPN {(data.apr * totaltoken ).toFixed(2) } %</p> 
            <p className='apy_1month'>No.of.Days</p> 
            <p className='apy_month' style={{color:"white"}}> <b>{data['3']} Days</b> &nbsp;&nbsp;<span> ({data.timeleft + 1}) </span> Left </p>
            <p className='apy_1reward'>Rewards</p>
            <p className='apy_reward'style={{color:"white"}}>{data.rewardEarned} DPN</p>
            <button className='btnunstake' key={i} style={{backgroundColor: !canUnstake(data)  ? '#5b5c24':'#373736'}}  disabled={canUnstake(data)} onClick={() => unstake(i, false)}><span className='tbtn2'> UNSTAKE</span></button>
            <button className='btnsclaim' key={i} onClick={() => claimReward(i, false)} ><span className='tbtn2'> CLAIM</span></button>  
          </div>
            )
            }
          })}
           {/* {griddata.map((data,i)=>
          {
            if(data.balance !== '0'){
            return(
              <div className='stackcon1'>
             <p className='apy_1Text'>Apy</p> 
            <p className='apy_value' style={{color:"white"}}>{data.balance} DPN {data.apr} </p>               
             <p className='apy_1month'>No.of.Days</p> 
            <p className='apy_month' style={{color:"white"}}> <b>{data['3']} Days</b> &nbsp;&nbsp;<span> ({data.timeleft + 1}) </span> left </p>
            <p className='apy_1reward'>Rewards</p>
            <p className='apy_reward'style={{color:"white"}}>{data.rewardEarned} DPN</p>
            <button className='btnunstake' key={i} style={{backgroundColor: !canUnstake(data)  ? '#5b5c24':'#373736'}}  disabled={canUnstake(data)} onClick={() => unstake(i, false)}><span className='tbtn2'> UNSTAKE</span></button>
            <button className='btnsclaim' key={i} onClick={() => claimReward(i, false)} ><span className='tbtn2'> CLAIM</span></button>  
          </div>
            )
            }
          })} */}
           
               
               
           </div>
       </div>
       <div className='col lg-7'>
           <div className='container2'>
          <div className='in_container2'>

            <span className='stake-text'>YOU STAKE</span> <input className='inp1' id='dtex' name='text' type="text" value={value ? value : '0'} onChange={(e)=>handleChange(e)} />
            <span className='stake-text1'>DPN 
             ({stakeUsdtValue} USD) 
            </span>
           <div className='slider1'>  
           
           
            <input className='input1'  type="range" min="0" max="10000000" value={value}
            onChange={({ target: { value: radius} }) => {calculateReward(radius);} }/>
          
           {/* <div className='sli1'>{value}</div> */}

           <span className='Svalue'>0</span>
           <span className='Svalue1'>10M</span>

           <span className='Month-text'>Locking it for </span>  <input className='inp' name='mtex' id='mtex' type="text" value={value2 ? value2 : '0' } onChange={(e)=>handleDays(e)} />
               
           
           <span className='Month-text1'>Days</span>
           <div className='slider2'>


           <input className='input2' type="range" min="0" max="365" value={value2}
             onChange={({ target: { value: radius } }) => {calculateAPR(radius);} }
             />
             {/* <div className='sli2'>{value2}</div>   */}



            <span className='Mvalue'>1 day</span>
           <span className='Mvalue1'>365 days</span> 
            </div>
          
           </div>
         
           </div>
           <br/>
           <div className='textrow'>
           <span className='apy1'>APY1</span>
           <span className='apy2'>APY2</span>
           <span className='apy3'>APY3</span>
           </div>
           <div className='valuecon1'>
             <span className='val1'>Estimated reward</span>
             <span className='dpnvalue'>{currestimatedreward} DPN</span>
             <span className='value1'>Current APY</span>
             <span className='dpnp'>{APR1}%</span>
             <button className='btns1'
             style={{backgroundColor: isApproved ? '#5b5c24' : '#373736'}} 
             disabled={!isApproved} onClick={() =>isApproved ? stakeLkn1(): alert('Approve tokens before staking!')}
             ><span className='tbtn1'> STAKE DPN</span></button>   
             </div> 
           <div className='valuecon2'>
           <span className='val1'>Estimated reward</span>
             <span className='dpnvalue'>{currestimatedreward2} DPN</span>
             <span className='value1'>Current APY</span>
             <span className='dpnp'>{APR2}%</span>
             <button className='btns2'
             style={{backgroundColor: isApproved ? '#5b5c24' : '#373736'}} 
             disabled={!isApproved} onClick={() =>isApproved ? stakeLkn2(): alert('Approve tokens before staking!')}
             ><span className='tbtn2'> STAKE DPN</span></button>
             </div> 
           <div className='valuecon3'>
           <span className='val1'>Estimated reward</span>
             <span className='dpnvalue'>{currestimatedreward3} DPN</span>
             <span className='value1'>Current APY</span>
             <span className='dpnp'>{APR3}%</span>
             <button className='btns3'
             style={{backgroundColor: isApproved ? '#5b5c24' : '#373736'}} 
             disabled={!isApproved} onClick={() =>isApproved ? stakeLkn(): alert('Approve tokens before staking!')}><span className='tbtn3'> STAKE DPN</span></button></div> 
             <div className='row'>
             {!isApproved && <button className='btns4' onClick={() => wallet.connected ? approval()  :alert('Connect to wallet!')}><span className='tbtn4' > APPROVE STAKE </span> </button>}
             </div>
 </div>
</div>
</div>
</Container>
</div>
</div>
)

}

export default Header;