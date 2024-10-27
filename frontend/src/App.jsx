
import { useState } from 'react'
import SignUp from './components/Authentication/SignUp'
import SignIn from './components/Authentication/SignIn'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import PostPage from './components/PostCreation/PostPage';
import Edit from './components/PostCreation/Edit';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { SelectedIndexProvider } from './context';

function App() {
  return (
    <SelectedIndexProvider>
  <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/post/example" element={<PostPage/>} /> 
    <Route path="/create-post" element={<Edit/>} /> 
    <Route path='/profile/example' element={<ProfilePage/>}/>
  
    </Routes>
  </Router>
  </SelectedIndexProvider>
  )
  }

export default App

