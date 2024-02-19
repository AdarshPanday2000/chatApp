import { onSnapshot,doc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'
import { ChatContext } from '../context/ChatContext'

function Chats () {
  const [chats, setChats] = useState([])

  const { dispatch } = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    function getChats(){
      const unsub = onSnapshot(doc(db, 'userChats',currentUser.uid), (doc) => {
        setChats(doc.data())
      })
  
      return () => {
        unsub();
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])
  console.log(chats)

  function handleSelect(user){
    dispatch({ type: 'CHANGE_USER', payload : user })
  }

  return (
    <>
    <div>
      {/* convert the received chats objects in array..at index 0 we get uid & at index 1 we get more information */}
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (

       <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} className='flex items-center gap-4 p-2 cursor-pointer text-white hover:bg-[#2f2d52]'>
        <img src={chat[1].userInfo.photoURL} className=' w-8 h-8 rounded-full object-cover'/>
        <div className= 'font-semibold text-gray-300'>
          <span>{chat[1].userInfo.displayName}</span>
          <p className='text-xs font-light text-gray-300'>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}

    </div>
    </>
  )
}

export default Chats;