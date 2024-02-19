import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

function Message({ message }) {
 
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior : 'smooth'})
  },[])

  const owner = 'flex-row-reverse'
  const myMsg = 'bg-[#8da4f1] text-white '
  const receivedMsg = 'bg-white text-gray-800 '

  return (
    <div ref={ref} className={`flex gap-5 ${message.senderId === currentUser.uid && owner}`}>
      <div className='flex flex-col text-gray-600 font-light mb-5 gap-2.5'> 
          <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} className='w-[40px] h-[40px] rounded-full object-cover'/>
          <span></span>
      </div>
      <div className='flex flex-col items-end max-w-80'>
        <p className={` py-2.5 px-5 rounded-r-lg rounded-bl-lg max-w-60 rounded-tl-lg  ${message.senderId === currentUser.uid ? myMsg : receivedMsg}`}>{message.text}</p>
       <img className ='mt-2 mb-2 ' src={message.img}/>
      </div>
    </div>
  )
}
// have to set maximum width of a message
export default Message