import JoditEditor from "jodit-react";
import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function App() {
   const { register, handleSubmit } = useForm();
   const OnSubmit = (data) => {
      console.log(data);
   };
   
   return (
      <>
         <div className="flex justify-center flex-shrink-0 bg-slate-300 h-full w-full">
            <div className="flex w-4/5 bg-white my-10 px-10 h-full py-6">
               <div className="flex font-bold text-5xl">Create Post!</div>

               <div className="flex flex-col flex-shrink-0 w-3/5 justify-start">
               <form onSubmit={handleSubmit(OnSubmit)}></form></div>
            </div>
         </div>
      </>
   );
}

export default App;
