
import React, { useState } from 'react';
import Divider from './divider';
import { Link } from 'react-router-dom';
import { useSelectedIndex } from "../../context"; 
import { useEffect } from 'react';

const HorizonntalScrollCard = ({ blogs }) => {

  const { selectedIndex, setSelectedIndex } = useSelectedIndex(); 

  const handleCommentClick =  (index) => {
     setSelectedIndex(index); 
  };

  useEffect(() => {
    console.log('Selected Index updated:', selectedIndex);
  }, [selectedIndex]);

  return (
    <div className='bg-white p-5 md:p-10 w-screen'>
      <div className='w-screen flex justify-start items-center gap-5 md:gap-10'>

        <div className='hover:text-gray-400 text-sm sm:text-lg duration-200'>TECHNOLOGY</div>
        <div className='hover:text-gray-400 text-sm sm:text-lg duration-200'>SCIENCE</div>
        <div className='hover:text-gray-400 text-sm sm:text-lg duration-200'>ART</div>
        <div className='hover:text-gray-400 text-sm sm:text-lg duration-200'>GAMES</div>
      </div>

      <Divider />

      <div className='w-full mt-10'>
        <div className='flex gap-5 overflow-x-auto flex-nowrap'>
          {
            blogs.map((blog, index) => {
              if (index > 3) {
                return (

                  <div key={index} className='relative min-w-[20rem] w-80 border-5 border-r border-r-gray-300 pr-5'>
                    <Link to={`/post/${blog._id}`} onClick={() => handleCommentClick(index)} >
                    <img src={blog.coverimg} alt='image' className='h-40 w-full object-cover' />
                    <div className='text-gray-400 mb-2'>{blog.date}</div>
                    <div className='text-2xl font-bold mb-2 text-balance'>{blog.title}</div>
                    <div><div className='text-lg text-gray-500'>{blog.brief}</div></div>

                    </Link>
                  </div>
                );
              }
              return null;
            })
          }
        </div>
      </div>
    </div>
  );
};

export default HorizonntalScrollCard;
