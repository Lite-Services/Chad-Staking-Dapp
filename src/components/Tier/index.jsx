import React, {useState} from 'react'
import Withdraw from './withdraw';
import './style.css'
import { ethers } from 'ethers';
import tier1abi from '../../ABI/tier1.json'
import tier2abi from '../../ABI/tier2.json'
import tier3abi from '../../ABI/tier3.json'
import tokenAbi from '../../ABI/token.json'
import Web3 from 'web3';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Tier = () => {
    const tier1ContractAddress = '0x6F4d6024eacd646b4253eAC733f105FC0fCb64E8';
    const tier2contractAddress = "0xb919929cE880d706A70F9367F568C9e7f8adB93E";
    const tier3ContractAddress = '0xE255173906F87c0831f098E84F537a37E5d555b2';
    const [rewardsInfo, setRewardsInfo] = useState({
        tier1Reward: "-",
        tier2Reward: "-",
        tier3Reward: "-"
      });
      const [hasUserTier1Approved, setHasUserTier1Approved] = useState(false);
      const [hasUserTier2Approved, setHasUserTier2Approved] = useState(false);
      const [hasUserTier3Approved, setHasUserTier3Approved] = useState(false);


    const getUserRewards = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const t1 = new ethers.Contract(tier1ContractAddress, tier1abi, signer);
        const t2 = new ethers.Contract(tier2contractAddress, tier2abi, signer);
        const t3 = new ethers.Contract(tier3ContractAddress, tier3abi, signer);
        const signerAddress = await signer.getAddress();
        const userRewardsForPool1= await t1.NormRewards(signerAddress);
        const userRewardsForPool2= await t2.NormRewards(signerAddress);
        const userRewardsForPool3= await t3.NormRewards(signerAddress);
        const setUserRewardsForPool1 = userRewardsForPool1/10**18;
        const setUserRewardsForPool2 = userRewardsForPool2/10**18;
        const setUserRewardsForPool3 = userRewardsForPool3/10**18;
        setRewardsInfo({
            tier1Reward: String(Math.floor(setUserRewardsForPool1)),
            tier2Reward: String(Math.floor(setUserRewardsForPool2)),
            tier3Reward: String(Math.floor(setUserRewardsForPool3))

          });
    }
    getUserRewards();

    const tier1Stake = async () => {
        const stakeLoading = toast.loading(" Staking Tokens ......");
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const t1 = new ethers.Contract(tier1ContractAddress, tier1abi, signer);
        const signerAddress = await signer.getAddress();
        const amount = document.getElementById('amount1').value;
        const parsedAmount= Web3.utils.toWei(amount, 'ether')  
              try{
            const transaction = await t1.stake(parsedAmount);
            await transaction.wait();
            toast.update(stakeLoading, {
                autoClose: 3000,
                render: " Tokens Staked Succesfully ",
                isLoading: false,
                type: "success",
              });
              setHasUserTier1Approved(false);
        }catch(e){
            console.log(e)
            toast.update(stakeLoading, {
                autoClose: 3000,
                render: "An issue occured while staking Your tokens ",
                isLoading: false,
                type: "error",
              });
        }

    }

    const tier2Stake = async () => {
        const stakeLoading = toast.loading(" Staking Tokens ......");
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const t2 = new ethers.Contract(tier2contractAddress, tier2abi, signer);
        const signerAddress = await signer.getAddress();
        const amount = document.getElementById('amount2').value;
        const parsedAmount= Web3.utils.toWei(amount, 'ether')  
              try{
            const transaction = await t2.stake(parsedAmount);
            await transaction.wait();
            toast.update(stakeLoading, {
                autoClose: 3000,
                render: " Tokens Staked Succesfully ",
                isLoading: false,
                type: "success",
              });
              setHasUserTier2Approved(false);
        }catch(e){
            console.log(e)
            toast.update(stakeLoading, {
                autoClose: 3000,
                render: "An issue occured while staking Your tokens ",
                isLoading: false,
                type: "error",
              });
        }

    }

    const tier3Stake = async () => {
        const stakeLoading = toast.loading(" Staking Tokens ......");
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const t3 = new ethers.Contract(tier3ContractAddress, tier3abi, signer);
        const signerAddress = await signer.getAddress();
        const amount = document.getElementById('amount3').value;
        const parsedAmount= Web3.utils.toWei(amount, 'ether')  
              try{
            const transaction = await t3.stake(parsedAmount);
            await transaction.wait();
            toast.update(stakeLoading, {
                autoClose: 3000,
                render: " Tokens Staked Succesfully ",
                isLoading: false,
                type: "success",
              }); 
              setHasUserTier3Approved(false);
        }catch(e){
            console.log(e)
            toast.update(stakeLoading, {
                autoClose: 3000,
                render: "An issue occured while staking Your tokens ",
                isLoading: false,
                type: "error",
              });
            
        }

    }

    const handleTier1Approval = async () => {
        const approveLoading = toast.loading("Approving Tokens ......");
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract('0xEA22237225f7A2D16b1062A6255e31f5Ae3a5708', tokenAbi, signer);
        const amount = document.getElementById('amount1').value;
        const parsedAmount= Web3.utils.toWei(amount, 'ether')
        //alert(parsedAmount)

        try{
            const transaction =  await tokenContract.approve(tier1ContractAddress, parsedAmount);
               await transaction.wait();
               toast.update(approveLoading, {
                autoClose: 3000,
                render: " Tokens Approved Succesfully ",
                isLoading: false,
                type: "success",
              }); 
               setHasUserTier1Approved(true);
        }catch(e){
            console.log(e)
            toast.update(approveLoading, {
                autoClose: 3000,
                render: "An issue occured while approving Your tokens ",
                isLoading: false,
                type: "error",
              });
        }
    }

    const handleTier2Approval = async () => {
        const approveLoading = toast.loading("Approving Tokens ......");

        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract('0xEA22237225f7A2D16b1062A6255e31f5Ae3a5708', tokenAbi, signer);
        const amount = document.getElementById('amount2').value;
        const parsedAmount= Web3.utils.toWei(amount, 'ether')
        //alert(parsedAmount)

        try{
            const transaction =  await tokenContract.approve(tier2contractAddress, parsedAmount);
               await transaction.wait();
               toast.update(approveLoading, {
                autoClose: 3000,
                render: " Tokens Approved Succesfully ",
                isLoading: false,
                type: "success",
              }); 
                              setHasUserTier2Approved(true);
        }catch(e){
            console.log(e)
            toast.update(approveLoading, {
                autoClose: 3000,
                render: "An issue occured while approving Your tokens ",
                isLoading: false,
                type: "error",
              });
        }
    }

    const handleTier3Approval = async () => {
        const approveLoading = toast.loading("Approving Tokens ......");

        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract('0x3FcBfbC9fe4f930767754E674b4991B6825F54E6', tokenAbi, signer);
        const amount = document.getElementById('amount3').value;
        const parsedAmount= Web3.utils.toWei(amount, 'ether')
        //alert(parsedAmount)

        try{
            const transaction =  await tokenContract.approve(tier3ContractAddress, parsedAmount);
               await transaction.wait();
               toast.update(approveLoading, {
                autoClose: 3000,
                render: " Tokens Approved Succesfully ",
                isLoading: false,
                type: "success",
              }); 
                             setHasUserTier3Approved(true);
        }catch(e){
            console.log(e)
            toast.update(approveLoading, {
                autoClose: 3000,
                render: "An issue occured while approving Your tokens ",
                isLoading: false,
                type: "error",
              });
        }
    }

    const tier1Claim = async () => {
        const claimLoading = toast.loading("Confirming Claim ......");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const t1 = new ethers.Contract(tier1ContractAddress, tier1abi, signer);
        const signerAddress = await signer.getAddress();
        try{
          await t1.claim();
            toast.update(claimLoading, {
                autoClose: 3000,
                render: " Claim Succesful ",
                isLoading: false,
                type: "success",
              });
            }catch(error){
                toast.update(claimLoading, {
                    autoClose: 3000,
                    render: "An issue occured while Claiming Your tokens ",
                    isLoading: false,
                    type: "error",
                  });
            }    }

    const tier2Claim = async () => {
        const claimLoading = toast.loading("Confirming Claim ......");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const t2 = new ethers.Contract(tier2contractAddress, tier2abi, signer);
        const signerAddress = await signer.getAddress();
        try{
          await t2.claim();
            toast.update(claimLoading, {
                autoClose: 3000,
                render: " Claim Succesful ",
                isLoading: false,
                type: "success",
              });
            }catch(error){
                toast.update(claimLoading, {
                    autoClose: 3000,
                    render: "An issue occured while Claiming Your tokens ",
                    isLoading: false,
                    type: "error",
                  });
            }    }

    const tier3Claim = async () => {
        const claimLoading = toast.loading("Confirming Claim ......");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const t3 = new ethers.Contract(tier3ContractAddress, tier3abi, signer);
        const signerAddress = await signer.getAddress();
        try{
          await t3.claim();
            toast.update(claimLoading, {
                autoClose: 3000,
                render: " Claim Succesful ",
                isLoading: false,
                type: "success",
              });
            }catch(error){
                toast.update(claimLoading, {
                    autoClose: 3000,
                    render: "An issue occured while Claiming Your tokens ",
                    isLoading: false,
                    type: "error",
                  });
            }    
    }

    const tier1Withdraw = async () => {
        const withdrawLoading = toast.loading(" Unstaking Tokens ......");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const t1 = new ethers.Contract(tier1ContractAddress, tier1abi, signer);
        const signerAddress = await signer.getAddress();
        try{
          await t1.unstake();

            toast.update(withdrawLoading, {
                autoClose: 3000,
                render: " Unstaking Succesful ",
                isLoading: false,
                type: "success",
              });
            }catch(e){
              console.log(e)
                toast.update(withdrawLoading, {
                    autoClose: 3000,
                    render: "An issue occured while Unstaking ",
                    isLoading: false,
                    type: "error",
                  });
            }    
        }

    const tier2Withdraw = async () => {
        const withdrawLoading = toast.loading(" Unstaking Tokens ......");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const t2 = new ethers.Contract(tier2contractAddress, tier2abi, signer);
        const signerAddress = await signer.getAddress();
        try{
          await t2.unstake();

            toast.update(withdrawLoading, {
                autoClose: 3000,
                render: " Unstaking Succesful ",
                isLoading: false,
                type: "success",
              });
            }catch(e){
              console.log(e)
                toast.update(withdrawLoading, {
                    autoClose: 3000,
                    render: "An issue occured while Unstaking ",
                    isLoading: false,
                    type: "error",
                  });
            }

    }

    const tier3Withdraw = async () => {
        const withdrawLoading = toast.loading("Unstaking Tokens ......");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const t3 = new ethers.Contract(tier3ContractAddress, tier3abi, signer);
        const signerAddress = await signer.getAddress();
        try{
          await t3.unstake();
            toast.update(withdrawLoading, {
                autoClose: 3000,
                render: " Unstaking Succesful ",
                isLoading: false,
                type: "success",
              });
            }catch(e){
              console.log(e)
                toast.update(withdrawLoading, {
                    autoClose: 3000,
                    render: "An issue occured while Unstaking ",
                    isLoading: false,
                    type: "error",
                  });
            }
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
         <ToastContainer position='bottom-left'/>
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
            <h5>{rewardsInfo.tier1Reward}</h5>
            </div>
            <div className='Tier-btn1'>
                <input type='text' placeholder='Enter Token Amount' id='amount1' className='Token-btn'></input>
                                {hasUserTier1Approved === false ? (
                                <button className='NFT-btn' onClick={handleTier1Approval}>Approve</button>
                                                                         ) : (
                                                                             ""
                                                          )}
                                         {hasUserTier1Approved === true ? (
                                    <button className='NFT-btn' onClick={tier1Stake}>Stake</button>
                                                    ) : (
                                                      ""
                                                     )}
            </div>
            <div className='Tier-btn1'>
                <button className='NFT-btn' onClick={tier1Withdraw}>Unstake Early</button>
                <button className='NFT-btn' onClick={tier1Claim}>Claim</button>
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
                <input type='text' placeholder='Enter Token Amount' id='amount2' className='Token-btn'></input>
                                {hasUserTier2Approved === false ? (
                                <button className='NFT-btn' onClick={handleTier2Approval}>Approve</button>
                                                                         ) : (
                                                                             ""
                                                          )}
                                         {hasUserTier2Approved === true ? (
                                    <button className='NFT-btn' onClick={tier2Stake}>Stake</button>
                                                    ) : (
                                                      ""
                                                     )}
            </div>
            <div className='Tier-btn1'>
                <button className='NFT-btn' onClick={tier2Withdraw}>Unstake Early</button>
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
            <h5>{rewardsInfo.tier3Reward}</h5>
            </div>
            <div className='Tier-btn1'>
                <input type='text' placeholder='Enter Token Amount' id='amount3' className='Token-btn'></input>
                                {hasUserTier3Approved === false ? (
                                <button className='NFT-btn' onClick={handleTier3Approval}>Approve</button>
                                                                         ) : (
                                                                             ""
                                                          )}
                                         {hasUserTier3Approved === true ? (
                                    <button className='NFT-btn' onClick={tier3Stake}>Stake</button>
                                                    ) : (
                                                      ""
                                                     )}
            </div>
            <div className='Tier-btn1'>
                <button className='NFT-btn' onClick={tier3Withdraw}>Unstake Early</button>
                <button className='NFT-btn' onClick={tier3Claim}>Claim</button>
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