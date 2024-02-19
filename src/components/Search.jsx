import React, { useState } from 'react'
import { db } from '../firebase'
import { collection,getDocs,query,serverTimestamp,setDoc,updateDoc,where,getDoc,doc } from 'firebase/firestore'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Search() {
  const[userName, setUserName] = useState('')  // for searching
  const[user, setUser] = useState(null) // for checking if user is there or not
  const[err, setErr] = useState(false)

  const {currentUser} = useContext(AuthContext) || {};

  function handleKey(e){
    e.code === 'Enter' && handleSearch()
  }

  async function handleSearch(){
    //for searching a user we are using a firebase query
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', userName)
    );
     
      try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
      catch(err){
        setErr(true)
      }
  }

  async function handleSelect(){
    // to make a connection between two users we gonna combine the id
    //check wheather the group(chats in firestore) exists, if not , create
    const combinedId = 
      currentUser.uid > user.uid 
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        
    // console.log(combinedId)
    try{
      const res = await getDoc(doc(db, 'chats', combinedId));
      console.log(res)
      if(!res.exists()){
        //create a chat in chats collection
        await setDoc(doc (db, 'chats', combinedId), { messages: [] });

        //create user chats for first time after searching
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

    }
    catch(err){ 
      console.log(err)
    }

    setUser(null);
    setUserName("")
  };

  return (
    <div className='border-b-2 border-r-gray-500'>
      <div className='searchForm'>
        <input type='text' onKeyDown={handleKey} value={userName} onChange={(e) => setUserName(e.target.value)} className=' bg-transparent border-none text-white outline-none text-sm placeholder:text-gray-400 p-4 w-full' placeholder='Find a user'/>
      </div>
     {err && <span>User not found!</span>}
     {user &&
      <div onClick={handleSelect} className='flex items-center gap-4 p-2 cursor-pointer text-white hover:bg-[#2f2d52]'>
        <img src={user.photoURL} className=' w-8 h-8 rounded-full object-cover'/>
        <div className=' font-semibold text-gray-300'>
          <span>{user.displayName}</span>
        </div>
      </div>
     }

    </div>
  )
}

export default Search
// onKeyDown = handles keyboard strokes ; so when enter is pressed we re gonna search for user