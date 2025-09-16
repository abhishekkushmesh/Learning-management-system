import React from 'react'
import { Link } from 'react-router-dom'
import { assets, dummyEducatorData } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import logo1 from '../../assets/logo1.svg'; 
const Navbar = () => {
  const educatorData = dummyEducatorData
  const { user } = useUser()

  return (
    <div className='flex items-center justify-between px-4 py-3 text-white border-b border-gray-500 md:px-8 bg-gradient-to-r from-cyan-500 bg-red-200/70'>
      {/* Logo */}
      <Link to='/'>
        <img src={logo1} alt="Logo1" className='w-5 cursor-pointer lg:w-8' />
      </Link>

      {/* Right side */}
      <div className='relative flex items-center gap-5'>
        <p>Hi! {user ? user.fullName : 'Developers'}</p>
        {user ? (
          <UserButton />
        ) : (
          <img className='max-w-8' src={assets.profile_img} alt="profile" />
        )}
      </div>
    </div>
  )
}

export default Navbar