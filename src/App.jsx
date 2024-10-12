import { useState } from 'react'
import { useForm } from 'react-hook-form'

function App() {
  const { register, handleSubmit } = useForm();
  const OnSubmit = (data)=>{
    console.log(data);
  }
  
  return (
   <>
    <div>
      <h1 className='font-bold text-8xl flex mx-24'>Create Post</h1>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <input {...register("Title of the Post")} />
      </form>
    </div>
   </>
  )
}

export default App
