
import SignIn from '../src/Components/Authentication/SignIn'
import SignUp from '../src/Components/Authentication/SignUp'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../src/Components/HomePage/HomePage';
import PostPage from '../src/Components/PostCreation/PostPage';
import Edit from '../src/Components/PostCreation/Edit';
import ProfilePage from '../src/Components/ProfilePage/ProfilePage';
import { SelectedIndexProvider } from './context';
function App() {
  return (
    <SelectedIndexProvider>
  <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/post/:id" element={<PostPage/>} /> 
    <Route path="/create-post" element={<Edit/>} /> 
    <Route path='/profile/:email' element={<ProfilePage />} />
  
    </Routes>
  </Router>
  </SelectedIndexProvider>
  )
  }

export default App

