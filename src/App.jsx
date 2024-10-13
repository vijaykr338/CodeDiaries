import JoditEditor from "jodit-react";
import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function App() {
   const { register, handleSubmit } = useForm();
   const OnSubmit = (data) => {
      
      console.log(data);
   };

   const editor =  useRef(null);
   const [Content, setContent] = useState('')
   
   return (
      <>
         <div className="flex justify-center flex-shrink-0 bg-slate-300 h-full w-full">
            <div className="flex w-4/5 bg-white my-10 px-10 h-full py-6 flex-col rounded-lg">
               <div className="flex font-bold text-7xl">Create Post!</div>
               <div className="flex flex-col flex-shrink-0 w-3/5 justify-start gap-6 my-7 text-2xl">
                  <form className="flex flex-col gap-9" onSubmit={handleSubmit(OnSubmit)}>
                     <input className="border-2 border-black rounded-md px-6 py-3 font-bold placeholder:text-black"
                     type="text" placeholder="Title for the Post" {...register("Title")}/>

                     <input className="border-2 border-black rounded-md px-6 py-3 font-bold placeholder:text-black"
                     type="url" placeholder="Image URL" {...register("img_url")}/>

                     <input className="border-2 border-black rounded-md px-6 py-3 font-bold placeholder:text-black"
                     type="text" placeholder="Tags" {...register("Tags")}/>
                    
                     {/* <input type="textarea" placeholder="Enter Content here" className="border-2 border-black rounded-md px-6 py-3 font-bold bg-gray-400 placeholder:text-black"/> */}
                     
                     <JoditEditor ref={editor} value={Content} onChange={newcontent => {
                        setContent(newcontent)
                     }} />

                    <input type="submit" className="border-2 border-black bg-black font-bold text-white py-2 px-2 w-28 rounded-full hover:shadow-xl shadow-cyan-300"/>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
}

export default App;
