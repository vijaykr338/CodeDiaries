import React, { useEffect, useState } from 'react'
import axios from "axios";
import {InboxIcon} from "@heroicons/react/outline";
import { useLocation } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin , faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { XIcon } from '@heroicons/react/solid';


function Profile() {
  const location=useLocation();
    let [overview,setOverview]=useState(true);
    let [posts,setPosts]=useState(false);
    let [update,setUpdate]=useState(false);
    let [summary,setSummary]=useState(false);
    let [details,setDetails]=useState("");
    const [error,setError]=useState("");
    let [updatedDetails,setUpdatedDetails]=useState({
      name:'',
      designation:'',
      location:'',
      summary:'',
      profile_pic:null,
      bg_pic:null,
      isItTheUser:false
    })
    const id= "6712bbfe2b362c5b7b5edd2b"||location.state.key ;

    useEffect(()=>{
      const fetchProfile=async()=>{
        try{
          const response=await axios.get(`http://localhost:3000/profile/viewprofile/${id}`,{
            withCredentials:true
          })
          console.log(response.data);
          setDetails(response.data);
          setUpdatedDetails(prevdetails=>({
            ...prevdetails,
            name:response.data.name,
            location:response.data.location,
            designation:response.data.designation,
            summary:response.data.summary,
            profile_pic:response.data.profile_pic,
            bg_pic:response.data.bg_pic
          }));
        }
        catch(err){
          setError(err.response.data || "An error occurred while fetching profile");
        console.error(err);
        }
      }

      fetchProfile();
    },[]);

    useEffect(()=>{
      console.log("Updated profile",details)
    },[details]);

    const handleOverviewClick=()=>{
        setOverview(true);
        setPosts(false);
    }

    const handlePostsClick=()=>{
        setOverview(false);
        setPosts(true);
    }
    
    const triggerFileInput = () => {
      document.getElementById('profileImageInput').click();
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setUpdatedDetails(prevdetails=>({
          ...prevdetails,
          profile_pic:URL.createObjectURL(file)
        }));
        console.log(updatedDetails.profile_pic);
        // Display the chosen image before upload
        // You can handle the file upload logic here
        // For example, you could send the file to the backend using FormData and axios
      }
    };

//w-full=71.7rem
  return (

    <div className="my-16">
      <div className="w-[90vw] ml-[5vw] rounded-lg mt-5 shadow-xl h-auto relative border-2 border-slate-200 border-solid">
        <div className="w-full h-96">
          <img
            className="w-full h-96 rounded-tl-lg object-cover rounded-tr-lg"
            src="https://img.freepik.com/premium-vector/laptop-with-word-keyboard-screen_906149-48380.jpg?w=1380"
          />
          <div className={`${update?'inline':'inline'}`}>
          <button onClick={triggerFileInput} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
            <PencilIcon className="w-6 h-6 text-green-500" />
          </button>
          {/* Hidden file input */}
          <input
            type="file"
            id="profileImageInput"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          </div>
        </div>
        <div className="ml-5 sm:ml-20 -mt-20 rounded-full rounded-t-full h-40 sm:h-56 w-40 sm:w-56 absolute flex justify-center items-center bg-white z-50">
          <img
            className="rounded-full h-36 w-36 sm:h-52 object-cover sm:w-52"
            src="../../Images/Profile image.jpeg"
          />
          {/* <div className={`${update?'inline':'inline'}`}> */}
          <button onClick={triggerFileInput} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
            <PencilIcon className="w-6 h-6 text-green-500" />
          </button>
          {/* </div> */}
          {/* Hidden file input */}
          <input
            type="file"
            id="profileImageInput"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-[60%] sm:w-[72%] h-52 ml-44 sm:ml-80">
          <div className="flex justify-between w-auto items-center mt-3 flex-wrap">
            <h1 className="font-serif font-bold text-lg sm:text-xl text-slate-800">
              {details.name}
            </h1>
            <div
              className={`mr-2 sm:mr-5 w-auto bg-slate-100 p-1 sm:p-2 text-xs sm:text-sm rounded-md font-serif ${
                details.isItTheUser ? "block" : "hidden"
              }`}
            >
              <div className="w-full h-full flex">
              <PencilIcon className="w-5 h-7 text-green-400" />
                <button className="ml-2">Edit Profile</button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-slate-500 font-sans font-semibold text-sm sm:text-base">
              {details.designation}
            </h2>
          </div>
          <div className="w-36 sm:w-52 h-auto rounded-md font-serif font-semibold mt-2 sm:mt-3 text-sm sm:text-base text-center bg-slate-200">
            <h1>{details.location}</h1>
          </div>
          <div className="w-auto mt-5">
            <button className="shadow-xl">
            <InboxIcon className="w-10 h-7 text-green-500" />
            </button>
            <button className="shadow-xl ml-2">
            <FontAwesomeIcon icon={faLinkedin} className="w-10 h-7 text-blue-600" />
            </button>
            <button className="shadow-xl ml-2">
            <XIcon className="w-10 h-7 text-gray-500" />
            </button>
            <button className="shadow-xl ml-2">
            <FontAwesomeIcon icon={faGithub} className="w-10 h-7 text-gray-500" />
            </button>
            <button className="shadow-xl ml-2">
            <FontAwesomeIcon icon={faInstagram} className="w-10 h-7 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-[90%] ml-[5%] rounded-md h-10 justify-center flex mt-5 bg-black">
        <div
          className={`w-[40%] sm:w-[12%] cursor-pointer`}
          onClick={handleOverviewClick}
        >
          <div
            className={`${
              overview ? "bg-white" : "text-gray-300"
            } font-mono h-8 font-bold w-28 text-center ml-3 p-1 rounded-lg mt-1`}
          >
            Overview
          </div>
        </div>    

        <div
          className={`w-[60%] cursor-pointer sm:w-[80%]`}
          onClick={handlePostsClick}
        >
          <div
            className={`${
              posts ? "bg-white" : "text-gray-300"
            } w-28 font-bold h-8 p-1 font-mono  text-center rounded-lg mt-1`}
          >
            Posts
          </div>
        </div>
      </div>
      <div
        className={`${
          overview ? "block" : "hidden"
        } w-[90%] ml-[5%] shadow-xl border-2 border-black border-solid mt-10 rounded-md`}
      >
        <div className="flex justify-between ml-5 mt-2">
          <div className="font-serif font-bold text-2xl">Summary</div>
          <div className={`${details.isItTheUser ? "block" : "hidden"} mr-5`}>
            <button>
            <PencilIcon className="w-5 h-7 text-green-400" />
            </button>
          </div>
        </div>
        <div className="ml-5 my-10 mt-1 leading-6 text-slate-600">
          {details.summary}
        </div>
      </div>
    </div>




  )
}

export default Profile




