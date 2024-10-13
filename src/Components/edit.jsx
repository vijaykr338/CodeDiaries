import JoditEditor from "jodit-react";
import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function Edit() {
   const { register, handleSubmit } = useForm();
   const OnSubmit = (data) => {
      
      console.log(data);
   };

   const editor =  useRef(null);
   const [Content, setContent] = useState('')
   
   return (
      <>
         <div className="flex justify-center flex-shrink-0 bg-slate-300 h-full w-full">
            <div className="flex w-11/12 sm:w-4/5 bg-white my-10 px-10 h-full py-6 flex-col rounded-lg">
               <div className="flex font-bold text-4xl sm:text-7xl">Create Post!</div>
               <div className="flex flex-col flex-shrink-0 sm:w-3/5 justify-start gap-6 my-7 sm:text-2xl">
                  <form className="flex flex-col gap-9" onSubmit={handleSubmit(OnSubmit)}>
                     <input className="border-2 border-black rounded-md px-6 py-3 font-bold placeholder:text-black"
                     type="text" placeholder="Title for the Post" {...register("Title")}/>

                     <input className="border-2 border-black rounded-md px-6 py-3 font-bold placeholder:text-black"
                     type="url" placeholder="Image URL" {...register("img_url")}/>

                     <input className="border-2 border-black rounded-md px-6 py-3 font-bold placeholder:text-black"
                     type="text" placeholder="Tags" {...register("Tags")}/>
                     
                     <JoditEditor className="w-96" ref={editor} value={Content} onChange={newcontent => {
                        setContent(newcontent)
                     }} />

                    <input type="submit" className="border-2 border-black bg-black font-bold text-white py-2 px-2 w-28 rounded-full hover:shadow-xl shadow-cyan-300"/>

                    <input
                    className="rounded-large w-0 h-0"
                    type="textarea" value={Content} {...register("content(html)")} />
                  </form>
                  <div>
                     <div className="font-bold text-2xl">Preview:</div>
                     <div className=" px-8 py-4 border-2 border-black min-h-24 rounded-2xl h-full overflow-auto" dangerouslySetInnerHTML={{ __html: Content }} />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Edit;
