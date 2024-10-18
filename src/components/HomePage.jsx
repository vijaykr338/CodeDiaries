import React, { useEffect, useState } from 'react';
import Header from './header';
import Divider from './divider';
import HorizonntalScrollCard from './horizonntalScrollCard';

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('src/blogs.json');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        
        fetchBlogs();
    }, []);

    return (
        <div className='min-h-screen w-screen bg-black'>
            <Header />
            <Divider />
            <div className='w-screen'>
                <div className='text-8xl md:text-[8rem] lg:text-[12rem] text-white font-black text-center'>THE BLOG</div>
            </div>
            <Divider />
            <div className='flex flex-col lg:flex-row justify-between gap-16 items-center lg:items-start p-5 md:p-10 '>
                <div className='text-white h-full'>
                    {blogs.length > 0 && (
                        <>
                            <img src={blogs[0].image} alt='image' className='h-96 w-full object-cover' />
                            <div className='text-gray-600 mb-2' >{blogs[0].date}</div>
                            <div className='text-4xl font-bold mb-2'>{blogs[0].title}</div>
                            <div className='text-lg text-gray-400'>{blogs[0].brief}</div>
                        </>
                    )}
                </div>
                <div className='text-white' >
                    {blogs.map((blog, index) => {
                        if (index > 0 && index < 4) {
                            return (
                                <div key={index} className='mb-4'>
                                    <div className='flex justify-between gap-5 items-center mb-5' >
                                        <img src={blog.image} className=' w-52 object-cover' />
                                        <div>
                                            <div className='text-gray-600 mb-2 text-sm' >{blog.date}</div>
                                            <div className='text-lg font-bold'>{blog.title}</div>
                                            <div className='text-sm text-gray-400 mb-2'>{blog.brief}</div>
                                        </div>
                                    </div>
                                    <Divider/>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
            <HorizonntalScrollCard blogs={blogs} />
        </div>
    );
}

export default HomePage;
