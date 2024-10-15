import React from 'react'
import instagram from '../assets/square-instagram-brands-solid.svg'
import facebook from '../assets/facebook-brands-solid.svg'
import twitter from '../assets/twitter-brands-solid.svg'
import brand from '../assets/c-solid.svg'
import menu from '../assets/bars-solid.svg'



const Header = () => {
  return (
    <div className='w-screen flex justify-between items-center pt-5 h-32 pl-5 pr-5 md:pl-10 md:pr-10' >
        <div className='flex justify-between items-center gap-2 md:gap-3 lg:gap-5' >
            <img src={brand} className='bg-white h-10 w-10 md:h-16 md:w-16 rounded-full mr-3' />
            <div className='text-gray-500 text-md md:text-lg hover:text-white duration-500' >LEARN</div>
            <div className='text-gray-500 text-md md:text-lg hover:text-white duration-500'>BLOG</div>
            <div className='text-gray-500 text-md md:text-lg hover:text-white duration-500'>BOOKMARKS</div>
            <div className='text-gray-500 text-md md:text-lg hover:text-white duration-500'>UI KIT</div>
            <div className='text-gray-500 text-md md:text-lg hover:text-white duration-500'>LAIN NYA</div>
        </div>
        <div className='md:flex hidden justify-center items-center gap-2 md:gap-5' >
            <img src={instagram} className='bg-white h-10 w-10'/>
            <img src={facebook} className='bg-white h-10 w-10 '/>
            <img src={twitter} className='bg-white h-10 w-10 '/>
        </div>
        <div className='flex md:hidden justify-center items-center gap-2 md:gap-5' >
            <img src={menu} className='bg-white h-6 w-6'/>
        </div>
    </div>
  )
}

export default Header
