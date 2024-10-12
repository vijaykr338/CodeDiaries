import React from 'react'
import { FaArrowLeft } from "react-icons/fa"; 

function SignUpSignIn() {
  return (
    <div className="grid grid-cols-2 p-8 bg-gray-100 min-h-screen">
      <div className="bg-white px-12 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative flex justify-left p-4">
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <FaArrowLeft className="mr-2" />         
          </button>
          <div className='w-1/2 items-right text-right pt-0.5 ml-72'>
            <span className="text-gray-600 ">Already a member?</span>
            <a href="#" className="text-blue-600 hover:underline ml-2">
              Sign In
            </a>
          </div>
        </div>
        <div className='ml-4 mt-5'>
          <div className='w-full flex flex-col'>
            <h3 className='text-2x1 font-semibold mb-4 text-4xl'>Sing Up</h3>
            <p className='text-gray-600 text-sm'>Welcome to Code Diaries</p>
          </div>

          <div className='w-full flex flex-col'>
            <input 
              type="text"
              placeholder='Username' 
              className='w-full mt-7 text-black border-b border-black outline-none focus:outline-none py-4'/>
          </div>
          <div className='w-full flex flex-col'>
            <input 
              type="email"
              placeholder='Email' 
              className='w-full text-black border-b border-black outline-none focus:outline-none py-4'/>
          </div>
          <div className='grid grid-cols-2 gap-x-4'>
            <div className='w-full flex flex-col'>
              <input 
                type="password"
                placeholder='Password' 
                className='w-full text-black border-b border-black outline-none focus:outline-none py-4'/>
            </div>
            <div className='w-full flex flex-col'>
              <input 
                type="password"
                placeholder='Retype Password' 
                className='w-full text-black border-b border-black outline-none focus:outline-none py-4'/>
            </div>
          </div>
        </div>

        
      </div>
      <div className="bg-white pt-8 pb-8 pr-40 bg-zinc-300">
      </div>
    </div>
  )
}

export default SignUpSignIn