import React, { useState,useRef } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import GOOGLE_ICON from "../../assets/google.svg";
import FACEBOOK_ICON from "../../assets/facebook.svg";
import COVER from "../../assets/codediariescover.png";
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/bgimg.png';

function SignUp() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const formRef = useRef(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setReTypePassword] = useState('');
  const [paragraphText, setParagraphText] = useState('');
  const [textColor, setTextColor] = useState('text-red-500');

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeReTypePassword = (event) => setReTypePassword(event.target.value);

  const handleTextColorChange = (a) => {
    setTextColor(a === 2 ? 'text-green-500' : 'text-red-500');
  };

  const handleErrorTextChange = (a) => {
    handleTextColorChange(a);
    if (a === 0) {
      setParagraphText('Please fill all the details');
    } else if (a === 1) {
      setParagraphText('Passwords do not match');
    }
  };

  const triggerSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Trigger form's submit event
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password || !retypePassword) {
      handleErrorTextChange(0);
      return;
    }

    if (password !== retypePassword) {
      handleErrorTextChange(1);
      return;
    }

    // Clear error text
    setParagraphText('');

    // Send data to backend
    await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      return response.json();
    })
    .then(data => {
      handleTextColorChange(2);
      setParagraphText('Registration successful');
      console.log('Success:', data);
    })
    .catch(error => {
      handleTextColorChange(0);
      setParagraphText('Registration failed. Try again later.');
      console.error('Error:', error);
    });
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 p-8 bg-gray-100 min-h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className="bg-white px-12 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-tl-lg rounded-bl-lg">
        <div className="relative flex justify-left p-4">
          <button onClick={goBack}>
            <FaArrowLeft className="mr-2 transition-transform duration-150 hover:scale-150"/>
          </button>
          <div className='w-1/2 items-right text-right pt-0.5 ml-72'>
            <span className="text-gray-600 ">Already a member?</span>
            <a href="/signin" className="text-blue-600 hover:underline ml-2">
              Sign In
            </a>
          </div>
        </div>
        <div className='ml-4 mt-5'>
          <div className='w-full flex flex-col'>
            <h3 className='text-2x1 font-semibold mb-4 text-4xl'>Sign Up</h3>
            <p className='text-gray-600 text-sm'>Welcome to Code Diaries</p>
          </div>


          <form id='registerForm' ref={formRef} onSubmit={handleSubmit}>
            <div className='w-full flex flex-col'>
              <input 
                type="text"
                placeholder='Username'
                value={username} 
                onChange={handleChangeUsername}  
                className='w-full mt-7 text-black border-b border-black outline-none focus:outline-none py-4'/>
            </div>
            <div className='w-full flex flex-col'>
              <input 
                type="email"
                placeholder='Email' 
                value={email} 
                onChange={handleChangeEmail}  
                className='w-full text-black border-b border-black outline-none focus:outline-none py-4'/>
            </div>
            <div className='grid grid-cols-2 gap-x-4'>
              <div className='w-full flex flex-col'>
                <input 
                  type="password"
                  placeholder='Password'
                  value={password} 
                  onChange={handleChangePassword}  
                  className='w-full text-black border-b border-black outline-none focus:outline-none py-4'/>
              </div>
              <div className='w-full flex flex-col'>
                <input 
                  type="password"
                  placeholder='Retype Password' 
                  value={retypePassword} 
                  onChange={handleChangeReTypePassword} 
                  className='w-full text-black border-b border-black outline-none focus:outline-none py-4'/>
              </div>
            </div>
          </form>
          <div className={`${textColor} mt-4 min-h-6 font-semibold`}>
            <p>{paragraphText}</p>
          </div>
          <div className='w-full flex flex-row items-center mt-14'>
            <button className='bg-black min-w-[105px] p-2 justify-center rounded-full text-center font-semibold flex text-white transition-transform duration-300 hover:scale-110'
                    onClick={triggerSubmit}>
              Register
            </button>
            <p className='mx-[180px] py-1 text-center justify-center'>or</p>
            <img src={GOOGLE_ICON} className='rounded-full hover:bg-zinc-300 h-7 w-7 border-2 rounded-4x1 border-zinc-500'/>
            <img src={FACEBOOK_ICON} className='ml-3 rounded-full mx-24 hover:bg-zinc-300 h-7 w-7 border-2 border-zinc-500'/>
          </div>
        </div>
      </div>
      <div className="max-h-fit overflow-hidden flex justify-center items-center rounded-tr-lg rounded-br-lg">
        <img src={COVER} className='w-full h-full object-cover' />
      </div>
    </div>
  );
}

export default SignUp;