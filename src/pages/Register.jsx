import React, { useState } from 'react'
import AddImage from '../assests/addImage.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage,db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password)
   
      const storageRef = ref(storage, displayName);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
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
        setErr(true)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
          await updateProfile(res.user , {
            displayName,
            photoURL: downloadURL
          });

          await setDoc(doc(db, "users", res.user.uid), {
            uid : res.user.uid,
            displayName,
            email,
            photoURL : downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/")
        })
      }
    ); 

    } catch (err){
      setErr(true)
    }
   
  };

  return (
 <div className=' bg-[#a7bcff] h-screen flex justify-center items-center'>
    <div className=' bg-white py-4 px-16 flex flex-col gap-10 rounded-md shadow-xl w-96'>
      <span className=' text-[#5d5b8d] font-bold text-2xl flex justify-center items-center'>ChatterBox</span>
      <span className='text-[#5d5b8d] text-base flex justify-center items-center'>Register</span>
      <form className=' flex flex-col gap-6' onSubmit={handleSubmit}>
        <input type="text" placeholder="Display name" className=' p-2 border-b-2 border-[#a7bcff] outline-none'/>
        <input type="email" placeholder="Email" className=' p-2 border-b-2 border-[#a7bcff] outline-none'/>
        <input type="password" placeholder="Password" className=' p-2 border-b-2 border-[#a7bcff] outline-none'/>
        <input type="file" id="file" className=' hidden'/>
        <label htmlFor='file' className='flex gap-2 '>
            <img src={AddImage} alt="" className='w-4 h-4'/>
            <span className=' text-sm text-gray-600'>Add an avatar</span>
        </label>
        <button className=' bg-[#7b96ec] p-2 font-semibold border-none cursor-pointer text-white hover:bg-[#2f2d52]'>Sign up</button>
        {err && <span>Something went wrong</span>}
      </form>
      <p className='text-[#5d5b8d] text-sm flex justify-center'>You have an account? <Link to='/login'> ...Login</Link></p>
    </div>
  </div>
  )
}

export default Register