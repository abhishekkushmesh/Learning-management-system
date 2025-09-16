import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useClerk , UserButton, useUser} from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import logo1 from '../../assets/logo1.svg'; 


const Navbar = () => {
  const {navigate, isEducator} = useContext(AppContext)

  const location = useLocation(); // ✅ Get current path
  const isCourseListPage = location.pathname.includes('/course-list');

  const {openSignIn} = useClerk()
  const {user} =useClerk()

  return (
    <div className={`flex items-center px-4 py-4 border-b border-gray-500 justify-between sm:px-10 md:px-14 lg:px-36 ${isCourseListPage ? 'bg-white' : 'bg-red-200/70'}`}>
      <img
      onClick={() => navigate('/')}
      src={logo1}
      alt="Logo1"
      className="w-10 cursor-pointer lg:w-12"
    />
      <div className="items-center hidden gap-5 text-gray-500 md:flex">
        <div className='flex items-center gap-5'>
        { user && 
        <>
          <button onClick={()=> {navigate('educator')}}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
        <Link to="/my-enrollments">My Enrollments</Link>
        </>
        }
        </div>
        { user ? <UserButton/> :
          
          <button onClick={()=> openSignIn()} className="px-5 py-2 text-white transition bg-blue-600 rounded-full hover:bg-blue-700">Create Account</button>}
      </div>
      {/* for Phone Screen */}
      <div className='flex items-center gap-2 text-gray-500 md:hidden sm:gap-5'>
        <div className='flex items-center gap-1 sm:gap2 max-sm:text-xs' >
        { user && 
        <>
          <button onClick={()=> {navigate('educator')}}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
        <Link to="/my-enrollments">My Enrollments</Link>
        </>
        }
        </div>
        {
          user ? <UserButton /> : <button onClick={()=> openSignIn()}><img src={assets.user_icon} alt="" /></button>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
