import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full pt-20 text-center md:pt-36 px-7 md:px-0 space-y-7 bg-gradient-to-b from-red-100/70'>
      <h1 className='relative max-w-3xl mx-auto font-bold text-gray-800 md:text-home-heading-large text-home-heading-small'>Gain skills with expert-led courses, track progress, and grow at your own pace. Join a vibrant learning community and <span className='text-blue-600'> take your career to the next level!</span><img src={assets.sketch} alt="sketch" className='absolute right-0 hidden md:block -bottom-7' /></h1>
      <p className='hidden max-w-2xl mx-auto text-gray-500 md:block'>We bring  together world-class instructor, interactive content, and a supportive community to help ypu achieve your personal and professional goals.</p>
      <p className='max-w-sm mx-auto text-gray-500 md:hidden'>we bring  world-class instructors to help you achieve your professional goals.</p>
      <SearchBar />
    </div>
  )
}

export default Hero
