import React from 'react'
import './style.css'
import close from '../../../assets/Cross.svg'
// src\assets\Cross.svg

const Withdraw = ({toggleModal}) => {
  return (
    <div>
  <div className='Withdraw'>
    <div className='Withdraw-felx'>
      <p>Withdraw</p>
      <img src={close} alt="" onClick={() => toggleModal()}/>
    </div>
    <div className='Withdraw-felx1'>
      <h7>TOKENS</h7>
      <input type="checkbox" id="custom-check" />
              <label htmlFor="custom-check"></label>
    </div>
    <div className='Withdraw-felx1'>
      <h7>NFT</h7>
      <input type="checkbox" id="custom" />
              <label htmlFor="custom"></label>
    </div>
    <button className='Continue'>Continue</button>

  </div>
    </div>
  )
}

export default Withdraw