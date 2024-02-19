import React from 'react'
import AddImage from '../assests/addImage.png'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase';

function Login() {

  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth,email,password);
      navigate('/')
    } 
    catch (err){
      setErr(true)
    }
   
  };


  return (
  <div className=' bg-[#a7bcff] h-screen flex justify-center items-center'>
    <div className=' bg-white py-4 px-16 flex flex-col gap-10 rounded-md shadow-xl w-96'>
      <span className=' text-[#5d5b8d] font-bold text-2xl flex justify-center items-center'>ChatterBox</span>
      <span className='text-[#5d5b8d] text-base flex justify-center items-center'>Login</span>
      <form className=' flex flex-col gap-6' onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className=' p-2 border-b-2 border-[#a7bcff] outline-none'/>
        <input type="password" placeholder="Password" className=' p-2 border-b-2 border-[#a7bcff] outline-none'/>
        <button className=' bg-[#7b96ec] p-2 font-semibold border-none cursor-pointer text-white hover:bg-[#2f2d52]'>Sign in</button>
        {err && <span>Something went wrong</span>}
      </form>
    <p className='text-[#5d5b8d] text-sm flex justify-center'>You don't have an account? <Link to='/register'>...Register</Link></p>
    </div>
  </div>
  )
}

export default Login