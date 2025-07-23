import React, { StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import AuthLayout from './pages/auth/AuthLayout.jsx';
import Login from './pages/auth/Login.jsx';
import Logout from './pages/auth/Logout.jsx';
import PrivateRoute from './pages/auth/PrivateRoute.jsx';

import HomePage from './pages/public/HomePage.jsx';
import Terms from './components/home/Terms.jsx'
// import Pricing from './pages/public/Pricing.jsx';


import DashboardLayout from './pages/dashboard/DashboardLayout.jsx';
import { DashboardContext } from './components/context/DashboardContext.jsx';
import  DashboardHomePage  from './pages/dashboard/DashboardHomePage.jsx';
import Library from './components/dashboard/Library.jsx';
import EachPlaylist from './components/dashboard/EachPlaylistVideo.jsx';
import AiFullChat from './components/dashboard/AiFullChat.jsx';
import Reminders from './components/dashboard/Reminders.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* general page routes  */}
      <Route element={<App />}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/terms" element={<Terms />} />
        {/* <Route path="/pricing" element={<Pricing/>} /> */}
      </Route>

      {/* auth routing  */}
      <Route element = {<AuthLayout />} >
        <Route path="/login" element = {<Login />} /> 
        <Route path="/logout" element = {<Logout /> } /> 
      </Route>

      {/* dashboard routing */}
      <Route element={<PrivateRoute />}> //to wrap the authenticated routes
        <Route element ={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHomePage/>} />
          <Route path="/dashboard/library" element={<Library/>} />
          <Route path="/playlist/:id" element={<EachPlaylist />} />
          <Route path="/dashboard/chat/:videoId" element={<AiFullChat />} />
          <Route path="/dashboard/reminders" element={<Reminders />} />
        </Route>
      </Route>
    </>
  )
);


// Clerk Authentication API Keys
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
      <DashboardContext >
          <RouterProvider router={router} />
      </DashboardContext>
  </StrictMode>
);