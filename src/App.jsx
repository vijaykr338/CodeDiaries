import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <div>
      <h1 className='font-bold text-8xl flex mx-24'>Create Post</h1>
    </div>
   </>
  )
}

export default App
