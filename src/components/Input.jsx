import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import { IoIosAttach } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";
import { serverTimestamp,Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';

function Input() {
  const [text, setText] = useState('')
  const [img, setImg] = useState(ChatContext)
  
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  async function handleSend(){
    if(img){
      const storageRef = ref(storage, uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed', 
      (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
      (error) => {
        // console.log(error)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
          await updateDoc(doc(db,'chats', data.chatId), {
            messages: arrayUnion({
              id: uuidv4(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL
            }),
          });
      }
    ); 
     }
    )}

    else{
      await updateDoc(doc(db,'chats', data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText('')
    setImg(null)
  }

  return (
    <div className='h-10 bg-white p-2 flex items-center justify-between w-full'>
      <input type="text" placeholder='Type something...' onChange={(e) => setText(e.target.value)} value={text} className='w-full border-none outline-none text-[#2f2d52] text-base placeholder:text-gray-400'/>
      <div className='flex items-center gap-3 cursor-pointer text-gray-600'>
        <IoIosAttach />
        <input type='file' id='file' className='hidden' onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor='file'>
           <RiImageAddLine />
        </label>
        <button onClick={handleSend} className='border-none font-mono p-1 text-white bg-[#8da4f1] hover:bg-[#2f2d52]'>Send</button>
      </div>
    </div>
  )
}

export default Input