import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div>
      <footer className='w-full mt-10 text-left bg-gray-900 md:px-36'>
        <div className='flex items-start justify-center gap-10 px-8 py-10 border-b flext-col md:flex-row md:px-0 border-white/30 md:gap-32'> 
            <div className='flex flex-col items-center w-full md:items-start'>
              <img src={assets.logo_dark} alt="logo" />
              <p className='mt-6 text-sm text-center text-white md:text-left/80'>Lorem ipsum dolor sit amet consectetur, 
                adipisicing elit. Quibusdam iusto non, porro similique corporis 
                atque possimus. Placeat, quibusdam? Harum accusantium maiores,  
                cupiditate non placeat exercitationem iusto vitae.</p>
            </div>
            <div className='flex flex-col items-center w-full md:items-start'>
              <h2 className='mb-5 font-semibold text-white'>Company</h2>
              <ul className='flex justify-between w-full text-sm text-white/80 md:flex-col md:space-y-2'>
                <li><a href="#"></a>Home</li>
                <li><a href="#"></a>About us</li>
                <li><a href="#"></a>Contact us</li>
                <li><a href="#"></a>Privacy policy</li>
              </ul>
            </div>
            <div className='flex-col items-start hidden w-full md:flex'>
              <h2 className='mb-5 font-semibold text-white'>Subscribe to our newsletter</h2>
              <p className='text-sm text-white/80'>The latest news, articles, and resources, sent to your inbox weekly.</p>
              <div className='flex items-center pt-4 gsp-2'>
                <input className='w-64 px-2 text-sm text-gray-500 placeholder-gray-500 bg-gray-800 border rounded outline-none border-gray-500/30 h-9' 
                type="email" placeholder='Enter your email' />
                <button className='w-24 text-white bg-blue-600 rounded h-9'>Subscribe</button>
              </div>
            </div>
        </div>
        <p className='py-4 text-xs text-center text-white/60 md:text-sm'>
          Copyright 2025 © EduEleVate. All Right Reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
