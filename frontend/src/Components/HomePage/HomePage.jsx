import React, { useEffect, useState, useContext } from "react";
import Header from "./header";
import Divider from "./divider";
import HorizonntalScrollCard from "./horizonntalScrollCard";
import { Link } from "react-router-dom";

import { useSelectedIndex } from "../../context";
import { AuthContext } from "../../AuthContext"

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  const { selectedIndex, setSelectedIndex } = useSelectedIndex(); 
  const { user, loading } = useContext(AuthContext); 

  useEffect(() => {
    if (!loading) {
      console.log("This is the user -> ", user);
    }
  }, [loading, user]);

  const handleCommentClick = (index) => {
    console.log("index is ", index);
    setSelectedIndex(index); 
    console.log("selected index is ",selectedIndex);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts/getposts/");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black ">
      <Header />
      <Divider />
      <div className="w-screen">
        <div className="text-8xl md:text-[8rem] lg:text-[12rem] text-white font-black text-center">
          THE BLOG
        </div>
      </div>
      <Divider />
      <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start p-5 md:p-10 justify-around">
        <div className="text-white h-full w-3/5">
          {blogs.length > 0 && (
            <Link to={`/post/${blogs[0]._id}`}>
              <img
                src={blogs[0].coverimg}
                alt="image"
                className="h-96 w-full object-cover"
              />
              <div className="text-gray-600 mb-2">{blogs[0].date}</div>
              <div className="text-4xl font-bold mb-2">{blogs[0].title}</div>
              <div className="text-lg text-gray-400">{blogs[0].tags}</div>
            </Link>
          )}
        </div>
        <div className="text-white">
          {blogs.map((blog, index) => {
            if (index > 0 && index < 4) {
              return (
                <div key={index} className="mb-4">
             <Link to={`/post/${blog._id}`}>
                  <div className="flex w-full gap-5 items-center mb-5">
                    <img src={blog.coverimg} className=" w-52 object-cover" />
                    <div>
                      <div className="flex text-gray-600 mb-2 text-sm">
                        {blog.date}
                      </div>
                      <div className="text-lg font-bold">{blog.title}</div>
                      <div className="text-sm text-gray-400 mb-2">
                        {blog.tags}
                      </div>
                    </div>
                  </div>
                    </Link>
                  <Divider />
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
};

export default HomePage;
