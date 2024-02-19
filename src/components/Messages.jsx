import React, { useEffect, useState } from 'react'
import Message from './Message'
import { onSnapshot,doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';

function Messages() {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  },[data.chatId]);

  return (
    <>
    <div className=' bg-[#ddddf7] p-4 h-96 overflow-y-scroll w-full flex-grow'>
      {messages.map((msg) => (
        <Message message = {msg} key={msg.id}/>
      ))}
    </div>
    </>
  )
}

export default Messages