// import React, {useState, useEffect}  from 'react';

// import { supabase } from '../../utlis/SupabaseClient.js'; 
// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';

// import { useNavigate } from 'react-router-dom';

// import DashboardHomePage  from '../dashboard/DashboardHomePage.jsx';
// import DashboardLayout  from '../dashboard/DashboardLayout.jsx';

//   // outside the function so that Every time React re-renders your App, it doesnot create a new Supabase client.
//   // This avoids the breakage of session tracking, auth listeners, and wastes memory.
//   // It’s like creating a new connection to the database on every frame — not ideal.


// function Login(){
//     const [session, setSession] = useState(null)

//     const navigate = useNavigate();

//     useEffect(() => {
//         supabase.auth.getSession().then(({ data: { session } }) => {
//         setSession(session)
//     });

//     const {
//       data: { subscription },
//         } 
//         = supabase.auth.onAuthStateChange((_event, session) => {
//         setSession(session)
//     });

//     return () => subscription.unsubscribe()
//   }, [])


//   if (!session) {
//     return (
//       <div className="auth-container">
//         <Auth 
//             supabaseClient={supabase}
//             appearance={{
//                 theme: ThemeSupa,
//                 variables: {
//                     default: {
//                         colors: {
//                             brand: '#0ea5e9', // Tailwind cyan-500
//                             brandAccent: '#0284c7',
//                             inputBackground: '#1f2937', // Tailwind gray-800
//                             inputText: '#f9fafb',        // Tailwind gray-50
//                         }
//                     }
//                 }
//             }}
//             providers={['google', 'github']}
//         />
//       </div>
//     )
//   };


//   return <div>
//     {/* <p> */}
//         {/* ✅ Logged in as {session.user.email} */}
//         {/* <DashboardLayout /> */}
//         <DashboardHomePage />
//     {/* </p>
//     <button onClick={handleLogout}>Logout</button> */}
//     </div>
// };

// export default Login;











import React, { useState, useEffect } from 'react';
import { supabase } from '../../utlis/SupabaseClient.js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // Fetch initial session and listen for auth state changes
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate('/dashboard'); // ✅ Redirect after login
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // If session already exists (user is logged in), redirect immediately
  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-md border border-gray-700">
        <h2 className="text-2xl font-semibold mb-7 text-center">Welcome back</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#0ea5e9',
                  brandAccent: '#0284c7',
                  inputBackground: '#1f2937',
                  inputText: '#f9fafb',
                },
              },
            },
          }}
          theme="dark"
          providers={['google']}
        />
      </div>
    </div>
  );
}

export default Login;