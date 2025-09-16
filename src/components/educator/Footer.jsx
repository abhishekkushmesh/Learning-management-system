import React from 'react'
import { assets } from '../../assets/assets'
import logo1 from '../../assets/logo1.svg';

const Footer = () => {
  return (
    <footer className='flex flex-col-reverse items-center justify-between w-full px-8 text-left border-t md:flex-row'>
      {/* left side */}
      <div className='flex items-center gap-4'>
        
          <img src={logo1} alt="logo1" className="w-10 cursor-pointer lg:w-12"/>
        
        <div className='hidden w-px bg-gray-500/60 md:block h-70'></div>
          <div>
            <p className='py-4 text-xs text-center text-gray-500 md:text-sm'>Copyright 2025 © Abhishek. All Right Reserved.</p>
          </div>
        </div>


      {/* right side */}
      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href="#">
          <img src={assets.facebook_icon} alt="facebook icon" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="twitter icon" />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="instagram icon" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
