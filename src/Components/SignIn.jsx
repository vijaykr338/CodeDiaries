import React from 'react' 
import { FaArrowLeft } from "react-icons/fa"; 
import GOOGLE_ICON from "../assets/google.svg";
import FACEBOOK_ICON from "../assets/facebook.svg";
import COVER from "../assets/codediariescover.png";

function SignIn() {
  return (
    <div className="grid grid-cols-2 p-8 bg-gray-100 min-h-screen">
      <div className="max-h-fit overflow-hidden flex justify-center items-center">
        <img src={COVER} className='w-full h-full object-cover' />
      </div>
      <div className="bg-white px-12 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative flex justify-left p-4">
          <button>
            <FaArrowLeft className="mr-2" />
          </button>
          <div className='w-1/2 items-right text-right pt-0.5 ml-72'>
            <span className="text-gray-600 ">New to Code Diaries?</span>
            <a href="#" className="text-blue-600 hover:underline ml-2">
              Sign Up
            </a>
          </div>
        </div>
        <div className='ml-4 mt-5'>
          <div className='w-full flex flex-col'>
            <h3 className='text-2x1 font-semibold mb-4 text-4xl'>Sign In</h3>
            <p className='text-gray-600 text-sm'>Welcome to Code Diaries</p>
          </div>

          <div className='w-full flex flex-col mt-6'>
            <input 
              type="text"
              placeholder='Username' 
              className='w-full mt-7 text-black border-b border-black outline-none focus:outline-none py-4'/>
          </div>
          <div className='w-full flex flex-col'>
            <input 
              type="password"
              placeholder='Password' 
              className='w-full text-black border-b border-black outline-none focus:outline-none py-4'/>
          </div>
          <div className='w-full flex flex-row items-center mt-32'>
            <button className='bg-black min-w-[105px] p-2 justify-center rounded-full text-center flex text-white'>Login</button>
            <p className='mx-[180px] text-gray-600 py-1 text-center justify-center'>or</p>
            <button><img src={GOOGLE_ICON} className='mr-7 rounded-full hover:bg-zinc-300 h-7 w-7 border-2 rounded-4x1 border-zinc-500'/></button>
            <button><img src={FACEBOOK_ICON} className='ml-2 rounded-full mx-24 hover:bg-zinc-300 h-7 w-7 border-2 border-zinc-500'/></button>

            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn