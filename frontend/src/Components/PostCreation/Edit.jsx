import JoditEditor from "jodit-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useMemo, useRef, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Header from "../HomePage/header";
import { AuthContext } from "../../AuthContext";

function Edit() {

    const { user } = useContext(AuthContext);
    const editor = useRef(null);
    const [Content, setContent] = useState("");
    const { register, handleSubmit, reset } = useForm();

  const notify = () =>
    toast.success("Post Created", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const OnSubmit = async (data) => {
    data.Content = Content;
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    // Include the author's information in the post data
    data.authorName = user.username;
    data.authorEmail = user.email;

    let r = await fetch('http://localhost:3000/posts/create-post', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    let res = await r.text();
    console.log(data, res);
    reset();
    setContent('');
    notify();
  };

  return (
    <>
    <div className="wrapper overflow-hidden">
      <div className="overflow-x-hidden w-screen bg-black">
        <Header />
      </div>
      <div className="flex justify-center flex-shrink-0 bg-[url('https://t4.ftcdn.net/jpg/02/06/60/49/360_F_206604992_yMzBFofmJEeznSvs3OZw0NXYwVBb2ryr.jpg')] bg-fixed bg-cover bg-no-repeat bg-center h-full w-screen">
        <div className="flex w-11/12 sm:w-4/5 bg-[rgba(17, 25, 40, 0.75)] backdrop-blur-md my-6 px-10 h-full py-6 justify-center flex-col rounded-lg backdrop-saturate-150 border-white border-opacity-15 border-2 items-center">
          <div className="flex font-bold text-4xl sm:text-7xl text-white justify-center mb-5 " >
            Create Post!
          </div>
          <div className="flex flex-col flex-shrink-0 sm:w-3/5 gap-6 my-7 sm:text-2xl justify-center">
            <form
              className="flex flex-col gap-9 "
              onSubmit={handleSubmit(OnSubmit)}
              action="/createpost"
            >
              <input
                className="border-2 border-black rounded-md px-6 py-3  placeholder:text-black"
                type="text"
                placeholder="Title for the Post"
                {...register("Title")}
              />

              <input
                className="border-2 border-black rounded-md px-6 py-3  placeholder:text-black"
                type="url"
                placeholder="Image URL"
                {...register("img_url")}
              />

              <input
                className="border-2 border-black rounded-md px-6 py-3  placeholder:text-black"
                type="text"
                placeholder="Tags"
                {...register("Tags")}
              />

              <JoditEditor
                className="w-96"
                ref={editor}
                value={Content}
                onChange={(newcontent) => {
                  setContent(newcontent);
                }}
              />
              <input
                onClick={notify}
                type="submit"
                className="border-2 border-white bg-black font-bold text-white py-2 px-3  rounded-full hover:shadow-xl shadow-cyan-300"
              />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
              />
              <input
                className="rounded-large hidden"
                type="textarea"
                value={Content}
              />
            </form>
            <div>
              <div className="font-bold text-2xl text-white">Preview:</div>
              <div
                className=" px-8 py-4 border-2 text-white border-white min-h-24 rounded-2xl h-full overflow-auto"
                dangerouslySetInnerHTML={{ __html: Content }}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Edit;
