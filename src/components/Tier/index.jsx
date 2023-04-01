import React, {useState} from 'react'
import Withdraw from './withdraw';
import './style.css'
const Tier = () => {
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
            <h5>0</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Tokens Earned:</p>
            <h5>0</h5>
            </div>
            <div className='Tier-btn1'>
                <button className='Token-btn'>Token</button>
                <button className='NFT-btn'>NFT</button>
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
            <h5>0</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Tokens Earned:</p>
            <h5>0</h5>
            </div>
            <div className='Tier-btn1'>
                <button className='Token-btn'>Token</button>
                <button className='NFT-btn'>NFT</button>
            </div>
            <div className='Tier-btn1'>
                <button className='Token-btn' onClick={toggleModal}>Withdraw</button>
                <button className='NFT-btn'>Claim</button>
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
            <h5>0</h5>
            </div>
            <div className='Tier-border-flex'>
            <p>Tokens Earned:</p>
            <h5>0</h5>
            </div>
            <div className='Tier-btn1'>
                <button className='Token-btn'>Token</button>
                <button className='NFT-btn'>Claim</button>
            </div>
            <div className='Tier-btn1'>
                <button className='Withdraw-btn' onClick={toggleModal}>Withdraw</button>
                {/* <button className='NFT-btn'>Claim</button> */}
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