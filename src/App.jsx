import { useState } from 'react'
import SignUp from './Components/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <SignUp />
   </div>
  )
}

export default App
