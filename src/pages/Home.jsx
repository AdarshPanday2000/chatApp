import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

function Home() {
  return (
    <div className=' bg-[#a7bcff] h-screen flex items-center justify-center'>
      <div className=' w-4/6 h-4/5 border-gray-100 border-2 grid grid-cols-3 rounded-xl overflow-hidden'>
        <div className='bg-[#3e3c61]'><Sidebar/></div>
        <div className=' col-span-2 flex flex-col justify-between items-center'><Chat/></div>
      </div>
    </div>
  )
}

export default Home