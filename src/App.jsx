import { useState } from 'react'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <SignUp />
    <SignIn />
   </div>
  )
}

export default App
