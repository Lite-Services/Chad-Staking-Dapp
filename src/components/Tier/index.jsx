import React, {useState} from 'react'
import Withdraw from './withdraw';
import './style.css'
import { ethers } from 'ethers';
import tier2abi from '../../ABI/chadABI.json'
import tokenAbi from '../../ABI/token.json'
import Web3 from 'web3';

const Tier = () => {

    const tier2contractAddress = "0xF9861b397654A4197d3A2229Dd0EE1B88C7df72B";
    const [rewardsInfo, setRewardsInfo] = useState({
        tier2Reward: "-",
      });
      const [hasUserApproved, setHasUserApproved] = useState(false);


    const getUserRewards = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const t2 = new ethers.Contract(tier2contractAddress, tier2abi, signer);
        const signerAddress = await signer.getAddress();
        const userRewardsForPool2= await t2.NormRewards(signerAddress);
        const setUserRewardsForPool2 = userRewardsForPool2/10**18;
        setRewardsInfo({
            tier2Reward: String(setUserRewardsForPool2)
          });
    }
    getUserRewards();

    const tier2Stake = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const t2 = new ethers.Contract(tier2contractAddress, tier2abi, signer);
        const signerAddress = await signer.getAddress();
        const amount = document.getElementById('amount1').value;
        const parsedAmount= Web3.utils.toWei(amount, 'ether')  
              try{
            const transaction = await t2.stake(parsedAmount);
            await transaction.wait();
            alert("Staked Successfully")
        }catch(e){
            console.log(e)
            
        }

    }

    const handleApproval = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract('0xEA22237225f7A2D16b1062A6255e31f5Ae3a5708', tokenAbi, signer);
        const amount = document.getElementById('amount1').value;
        const parsedAmount= Web3.utils.toWei(amount, 'ether')
        //alert(parsedAmount)

        try{
            const transaction =  await tokenContract.approve(tier2contractAddress, parsedAmount);
               await transaction.wait();
                alert("Approved Successfully")
                setHasUserApproved(true);
        }catch(e){
            console.log(e)
        }
    }

    const tier2Claim = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const t2 = new ethers.Contract(tier2contractAddress, tier2abi, signer);
        const signerAddress = await signer.getAddress();
        await t2.claim();
    }
    const tier2Withdraw = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const t2 = new ethers.Contract(tier2contractAddress, tier2abi, signer);
        const signerAddress = await signer.getAddress();
        await t2.unstake();
    }


    const [modal, setModal] = useState(false);
    const toggleModal = (e) => {
        setModal(!modal);
      };
    
      if (modal) {
        document.body.classList.add('active-modal');
      } else {
        document.body.classList.remove('active-modal');
      }
  return (
    <div>
        <div className='Tier-flex'>
            <div className='Tier-border'>
                <div className='Tier-cont'>
            <p>Tier 1</p>
            <h5>The Chad</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>APR:</p>
            <h5>5%</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Lock Duration:</p>
            <h5>20 Days</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Early Penalty:</p>
            <h5>95%</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Tokens Earned:</p>
            <h5>0</h5>
            </div>
            <div className='Tier-btn1'>
                <input type='text' placeholder='Amount' className='Token-btn'></input>
                <button className='NFT-btn'>Stake</button>
            </div>
            <div className='Tier-btn1'>
                <button className='Token-btn' onClick={toggleModal}>Withdraw</button>
                <button className='NFT-btn'>Claim</button>
            </div>
            </div>
            <div className='Tier-border'>
                <div className='Tier-cont'>
            <p>Tier 2</p>
            <h5>The Investor</h5>
            </div>
            
            <div className='Tier-border-flex'>
            <p>APR:</p>
            <h5>2%</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Lock Duration:</p>
            <h5>10 Days</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Early Penalty:</p>
            <h5>90%</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Tokens Earned:</p>
            <h5>{rewardsInfo.tier2Reward}</h5>
            </div>
            <div className='Tier-btn1'>
                <input type='text' placeholder='Amount' id='amount1' className='Token-btn'></input>
                                {hasUserApproved === false ? (
                                <button className='NFT-btn' onClick={handleApproval}>Approve</button>
                                                                         ) : (
                                                                             ""
                                                          )}
                                         {hasUserApproved === true ? (
                                    <button className='NFT-btn' onClick={tier2Stake}>Stake</button>
                                                    ) : (
                                                      ""
                                                     )}
            </div>
            <div className='Tier-btn1'>
                <button className='Token-btn' onClick={tier2Withdraw}>Withdraw</button>
                <button className='NFT-btn' onClick={tier2Claim}>Claim</button>
            </div>
            </div>
            <div className='Tier-border'>
                <div className='Tier-cont'>
            <p>Tier 3</p>
            <h5>The 9-5er</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>APR:</p>
            <h5>0.5%</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Lock Duration:</p>
            <h5>5 Days</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Early Penalty:</p>
            <h5>75%</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Tokens Earned:</p>
            <h5>0</h5>
            </div>
            <div className='Tier-btn1'>
                <input type='text' placeholder='Amount' className='Token-btn'></input>
                <button className='NFT-btn'>Stake</button>
            </div>
            <div className='Tier-btn1'>
                <button className='Token-btn' onClick={toggleModal}>Withdraw</button>
                <button className='NFT-btn'>Claim</button>
            </div>
            </div>
        </div>
        {modal && (
              <div className="modal">
                <div className="overlay"></div>
                <div className='modal-contents'>
                   <Withdraw toggleModal={toggleModal}/>
                   </div>
              </div>
            )}
    </div>
  )
}

export default Tier