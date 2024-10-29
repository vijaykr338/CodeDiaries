import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from '../../assets/logo.png'
import Button from './Button'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className='w-screen flex justify-between items-center pt-5 h-32 pl-5 pr-5 md:pl-10 md:pr-10 overflow-hidden' >
        <div className='flex justify-between items-center gap-2 md:gap-3 lg:gap-5' >
            <Link to="/profile/example">
            <img src={logo} className='bg-white h-10 w-10 md:h-16 md:w-16 rounded-full mr-3' /></Link>
            <Link to="/">
            <GoHomeFill className='text-white h-10 w-10' />
            </Link>
            <Link to="/create-post">
            <div className=' border-2 border-gray-500 px-3 py-1 rounded-xl text-gray-500 text-md md:text-xl font-bold hover:text-white duration-500 flex items-center gap-1'>
            <MdEdit className='text-2xl' /> CREATE POST</div>
            </Link>
          
        </div>
        <div className='flex  justify-center items-center gap-2 md:gap-5' >
        <div className='md:flex hidden ml-[380px] items-center gap-2 md:gap-5' >
            <FaInstagram className='text-white font-bold bg-gradient-to-br from-indigo-500 to-red-600 rounded-xl h-12 w-12'/>
            <FaFacebookSquare className='text-[#3b5999] h-12 w-12' />
            <FaXTwitter className='text-white h-12 w-12' />
        </div>
        <Link to="/signup"> <Button title="Sign Up"></Button></Link>
           <Link to="/signin">  <Button title="Sign In"></Button></Link>
            <GiHamburgerMenu className='text-white h-10 w-10'/>
        </div>
    </div>
  )
}

export default Header
