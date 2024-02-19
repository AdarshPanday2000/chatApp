import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const {currentUser} = useContext(AuthContext);
  
  return (
    <div className='flex items-center bg-[#2f2d52] h-14 p-2.5 justify-between text-white'>
      <span className='font-bold'>ChatterBox</span>
      <div className='flex gap-2'>
        <img src={currentUser.photoURL} className='bg-[#ddddf7] h-8 w-8 rounded-full object-cover'/>
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)} className='bg-[#5d5b8d] text-[#ddddf7] text-xs border-none cursor-pointer p-1 rounded-md hover:bg-[#2f2d52]'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar