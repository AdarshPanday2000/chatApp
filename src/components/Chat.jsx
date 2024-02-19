import React, { useContext } from 'react'
import { PiVideoCameraDuotone } from "react-icons/pi";
import { IoPersonAdd } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <>
      <div className='h-14 bg-[#5d5b8d] flex items-center justify-between p-4 text-gray-200 w-full'>
          <span>{data.user.displayName}</span>
          <div className='flex gap-4 cursor-pointer h-4'>
             <PiVideoCameraDuotone />
             <IoPersonAdd />
             <BsThreeDots />
          </div>
      </div>
      <Messages/>
      <Input/>
    </>
  )
}

export default Chat