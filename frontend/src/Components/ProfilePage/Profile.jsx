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
    let [updateSummary,setUpdateSummary]=useState(false);
    let [details,setDetails]=useState("");
    const [error,setError]=useState("");
    const [loading, setLoading] = useState(false)
    let [updatedDetails,setUpdatedDetails]=useState({
      name:'',
      position:'',
      location:'',
      summary:'',
      profile_pic:null,
      bg_pic:null,
      isItTheUser:false
    })
    const email= "assaf@gmail.com"||location.state.key ;

    useEffect(()=>{
      const fetchProfile=async()=>{
        try{
          const response=await axios.get(`http://localhost:3000/profile/viewprofile/${email}`,{
            withCredentials:true
          })
          console.log(response.data);
          setDetails(response.data);
          setUpdatedDetails(prevdetails=>({
            ...prevdetails,
            name:response.data.name,
            location:response.data.location,
            position:response.data.position,
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

    const triggerbgInput = () => {
      document.getElementById('bgImageInput').click();
    };

    

    const handleProfileChange = async (event) => {
      setLoading(true)
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('profile_pic', file);
        
        try {
          // Send file to the backend
          const response = await axios.post(`http://localhost:3000/profile/upload/profile`, formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          // console.log(response.data);
      
          // Update both 'details' and 'updatedDetails' to immediately reflect the new image
          const updatedProfile = response.data.profile; // Assuming the backend returns the uploaded image URL
          // console.log(response.data);
          setDetails(prevdetails => ({
            ...prevdetails,
             'profile_pic' : updatedProfile.profile_pic
          }));
          
          setUpdatedDetails(prevdetails => ({
            ...prevdetails,
            'profile_pic' : updatedProfile.profile_pic
          }));
          setLoading(false)
        } catch (err) {
          console.error("Error uploading the image", err);
        }
      }
    };

    const handleBgChange = async (event) => {
      setLoading(true);
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('bg_pic',file);
        
        try {
          // Send file to the backend
          const response = await axios.post(`http://localhost:3000/profile/upload/bg`, formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          // console.log(response.data);
      
          // Update both 'details' and 'updatedDetails' to immediately reflect the new image
          const updatedProfile = response.data.profile; // Assuming the backend returns the uploaded image URL
          // console.log(response.data);
          setDetails(prevdetails => ({
            ...prevdetails,
             'bg_pic' : updatedProfile.bg_pic
          }));
          
          setUpdatedDetails(prevdetails => ({
            ...prevdetails,
            'bg_pic' : updatedProfile.bg_pic
          }));
          setLoading(false);
        } catch (err) {
          console.error("Error uploading the image", err);
        }
      }
    };

    const handleNameChange=(e)=>{
      setUpdatedDetails(prevdetails=>({
        ...prevdetails,
        name:e.target.value
      }))
    }

    const handlePositionChange=(e)=>{
      setUpdatedDetails(prevdetails=>({
        ...prevdetails,
        position:e.target.value
      }))
    }

    const handleLocationChange=(e)=>{
      setUpdatedDetails(prevdetails=>({
        ...prevdetails,
        location:e.target.value
      }))
    }

    const handleProfileDataChange=()=>{
      setUpdate(true);
    }

    const handleUpdateProfile=async()=>{
      try {
        // Send file to the backend
        const response = await axios.post(`http://localhost:3000/profile/update`, updatedDetails, {
          withCredentials: true
        });
        // console.log(response.data);
    
        // Update both 'details' and 'updatedDetails' to immediately reflect the new image
        const updatedProfile = response.data.profile; // Assuming the backend returns the uploaded image URL
        // console.log(response.data);
        setDetails(updatedProfile);
        
        setUpdatedDetails(updatedProfile);
        setLoading(false);
        setUpdate(false);
      } catch (err) {
        console.error("Error uploading the image", err);
      }
    
    }

    const handleSummaryChange=()=>{
      setUpdateSummary(true);
    }

    const handleSummaryUpdate=async()=>{
      try {
        // Send file to the backend
        const response = await axios.post(`http://localhost:3000/profile/update_summary`, updatedDetails, {
          withCredentials: true
        });
        // console.log(response.data);
    
        // Update both 'details' and 'updatedDetails' to immediately reflect the new image
        const updatedProfile = response.data.profile; // Assuming the backend returns the uploaded image URL
        // console.log(response.data);
        setDetails(updatedProfile);
        
        setUpdatedDetails(updatedProfile);
        setLoading(false);
        setUpdateSummary(false);
      } catch (err) {
        console.error("Error uploading the image", err);
      }
    }

    const handleSummaryDataChange=(e)=>{
      setUpdatedDetails(prevdetails=>({
        ...prevdetails,
        summary:e.target.value
      }))
    }

//w-full=71.7rem
  return (

    <div className={`${loading?'opacity-20':''} my-16`}>
       <div className={`loader2 top-[50%] left-[50%] absolute  z-50 ${loading?'block':'hidden'}`}></div>
      <div className={` w-[90vw] ml-[5vw] rounded-lg mt-5 shadow-xl h-auto relative border-2 border-slate-200 border-solid`}>
        <div className="w-full h-96">
          <img
            className="w-full h-96 rounded-tl-lg object-cover rounded-tr-lg"
            src={details.bg_pic}
          />
          <div className={`${update?'inline':'inline'}`}>
          <button onClick={loading ? null : triggerbgInput} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
            <PencilIcon className={`w-6 h-6 ${loading ? 'text-gray-300' : 'text-green-500'}`} />
          </button>
          {/* Hidden file input */}
          <input
            type="file"
            id="bgImageInput"
            className="hidden"
            accept="image/*"
            onChange={handleBgChange}
          />
          </div>
        </div>
        <div className="ml-5 sm:ml-20 -mt-20 rounded-full rounded-t-full h-40 sm:h-56 w-40 sm:w-56 absolute flex justify-center items-center bg-white z-50">
          <img
            className="rounded-full h-36 w-36 sm:h-52 object-cover sm:w-52"
            src={details.profile_pic}
          />
          {/* <div className={`${update?'inline':'inline'}`}> */}
          <button onClick={loading ? null : triggerFileInput} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
            <PencilIcon className={`w-6 h-6 ${loading ? 'text-gray-300' : 'text-green-500'}`} />
          </button>
          {/* </div> */}
          {/* Hidden file input */}
          <input
            type="file"
            id="profileImageInput"
            className="hidden"
            accept="image/*"
            onChange={handleProfileChange}
          />
        </div>
        <div className={`${update?'hidden':'block'} w-[60%] sm:w-[72%] h-52 ml-44 sm:ml-80`}>
          <div className="flex justify-between w-auto items-center mt-3 flex-wrap">
            <h1 className="font-serif font-bold text-lg sm:text-xl text-slate-800">
              {details.name}
            </h1>
            <div
              className={`mr-2 sm:mr-5 w-auto bg-slate-100 p-1 sm:p-2 text-xs sm:text-sm rounded-md font-serif ${
                details.isItTheUser ? "block" : "block"
              }`}
            >
              <button onClick={handleProfileDataChange} className="w-full h-full flex">
                <PencilIcon className="w-5 h-7 text-green-400" />
                <h2 className="ml-2 mt-1">Edit Profile</h2>
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-slate-500 font-sans font-semibold text-sm sm:text-base">
              {details.position}
            </h2>
          </div>
          <div className="w-36 sm:w-52 h-auto rounded-md font-serif font-semibold mt-2 sm:mt-3 text-sm sm:text-base text-center bg-slate-200">
            <h1>{details.location}</h1>
          </div>
          <div className="w-auto mt-5 flex">
            <button className="shadow-xl">
            <InboxIcon className="w-10 h-8 text-green-500" />
            </button>
            <button className="shadow-xl ml-2">
            <FontAwesomeIcon icon={faLinkedin} className="w-10 h-7 text-blue-600" />
            </button>
            <button className="shadow-xl ml-2">
            <XIcon className="w-10 h-8 text-gray-500" />
            </button>
            <button className="shadow-xl ml-2">
            <FontAwesomeIcon icon={faGithub} className="w-10 h-7 text-gray-500" />
            </button>
            <button className="shadow-xl ml-2">
            <FontAwesomeIcon icon={faInstagram} className="w-10 h-7 text-gray-500" />
            </button>
          </div>
          </div>
          <div className={`${update?'block':'hidden'} w-[60%] sm:w-[72%] h-52 ml-44 sm:ml-80`}>
              <div className='mt-2 ml-2'>
                <div>Name</div>
                <input value={updatedDetails.name} onChange={handleNameChange} className='border-2 border-black border-solid rounded-md'/>
              </div>
              <div className='mt-2 ml-2'>
                <div>Position</div>
                <input value={updatedDetails.position} onChange={handlePositionChange} className='border-2 border-black border-solid rounded-md'/>
              </div>
              <div className='mt-2 ml-2'>
                <div>
                  Location
                </div>
                <input value={updatedDetails.location} onChange={handleLocationChange} className='border-2 border-black border-solid rounded-md'/>
              </div>
              <div className='ml-20 mt-2'>
                <button onClick={handleUpdateProfile} className='border-2 border-black border-double'>Update</button>
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
          onClick={handlePostsClick}>
          <div
            className={`${
              posts ? "bg-white" : "text-gray-300"
            } w-28 font-bold h-8 p-1 font-mono  text-center rounded-lg mt-1`}>
            Posts
          </div>
        </div>
      </div>
      <div
        className={`${
          overview ? "block" : "hidden"
        } w-[90%] ml-[5%] shadow-xl border-2 h-auto border-black border-solid mt-10 rounded-md`}>
        <div className={`${updateSummary?'hidden':'block'}`}>
          <div className={` flex justify-between ml-5 mt-2`}>
            <div className="font-serif font-bold text-2xl">Summary</div>
            <div className={`${details.isItTheUser ? "block" : "block"} mr-5`}>
              <button onClick={handleSummaryChange}>
              <PencilIcon className="w-5 h-7 text-green-400" />
              </button>
            </div>
          </div>
          <div className="ml-5 my-10 mt-1 leading-6 text-slate-600">
            {details.summary}
          </div>
        </div>
        <div className={`${updateSummary?'block':'hidden'}`}>
          <div className={` flex justify-between ml-5 mt-2`}>
            <div className="font-serif font-bold text-2xl">Summary</div>
          </div>
          <div className="ml-5 my-10 mt-1 leading-6 text-slate-600">
            <textarea onChange={handleSummaryDataChange} value={updatedDetails.summary} rows={7} cols={100} className='border-2 border-black border-solid'></textarea>
          </div>
          <div>
            <button onClick={handleSummaryUpdate} className='border-2 border-black border-solid'>Update</button>
          </div>
        </div>
      </div>

      <div
        className={`${
          overview ? "hidden" : "block"
        } w-[90%] ml-[5%] shadow-xl border-2 h-auto border-black border-solid mt-10 rounded-md`}>
        <div className='ml-5 mt-5 mb-5'>
          <div className="font-serif font-bold text-2xl">Posts</div>
          <div>
            All posts goes here...
          </div>
        </div>
      </div>


    </div>




  )
}

export default Profile




