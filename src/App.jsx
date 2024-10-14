import { useState } from 'react'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

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
