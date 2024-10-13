
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";



import './index.css';
import Layout from "./Layout.jsx";
import Profile from './Components/Profile.jsx';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Profile/>}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
      <RouterProvider router={router}/>
)
