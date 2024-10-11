import { useState } from 'react'
import SignUpSignIn from './Components/SignUpSignIn'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <SignUpSignIn />
   </div>
  )
}

export default App
