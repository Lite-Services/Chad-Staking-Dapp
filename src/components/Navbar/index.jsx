import React,{useState} from 'react'
import Logo from '../../assets/image_3-removebg-preview1.png';
import { NavLink, Link } from "react-router-dom";
import add from '../../assets/add.svg'
import hambuger from '../../assets/Icon.svg'
// src\assets\Icon.svg
import './style.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavBar = () => {
  const [open , setopen] = useState(false);

    const togglehambuger= () => {
      setopen(!open);
      console.log(open)


    }
  return (
    <div>

      <div className='NavBar'>
        <div className='hambuger'>
      <label  className={`hamburger ${open && "open"}`} >
  <input type="checkbox" onClick={togglehambuger}/>
  <svg viewBox="0 0 32 32">
    <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
    <path className="line" d="M7 16 27 16"></path>
  </svg>
</label>
</div>
        {/* <img src={hambuger} alt="" className={`hambuger ${open && "open"}`} onClick={togglehambuger}/> */}
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className={`Nav-link ${open && "open"}`} id='Nav-link'>
     <NavLink to='/' className='NavLink'>Home </NavLink>
     <NavLink to='/'  className='NavLink'>Contact </NavLink>
        </div>
        <div className='Navbar-btn'>
        <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    <img src={add}/>
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
        </div>
      </div>
    </div>
  )
}

export default NavBar