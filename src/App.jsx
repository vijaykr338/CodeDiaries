import { useState } from 'react'
import SignUp from './Components/Authentication/SignUp'
import SignIn from './Components/Authentication/SignIn'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
  <Router>
    <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    </Routes>
  </Router>
  )
}

export default App
