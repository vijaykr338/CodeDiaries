import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
   const { register, handleSubmit } = useForm();
   const OnSubmit = (data) => {
      console.log(data);
   };

   return (
      <>
         <div>
            <h1 className="font-bold text-8xl flex mx-24">Create Post</h1>
            <div>
               <form
                  className="
       justify-start 
       text-4xl 
       flex 
       font-bold 
       text-black 
       bg-red-700 
       border-4 
       flex-col 
       gap-4 
       border-black selection:border-none"
                  onSubmit={handleSubmit(OnSubmit)}
               >
                  <input
                     className=""
                     type="text"
                     placeholder="Title of the page"
                     {...register("Title of the Post")}
                  />
                  <input type="text" placeholder="Tags" {...register("Tags")} />
                  <input
                     type="text"
                     placeholder="Content"
                     {...register("Content")}
                  />
                  <input type="submit" />
               </form>
            </div>
         </div>
      </>
   );
}

export default App;
