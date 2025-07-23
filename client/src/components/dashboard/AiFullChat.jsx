// import { useLayout } from '../context/DashboardContext';
// import PromptSection from './PromptSection';
// import { useState, useEffect } from 'react';
// import { supabase } from '../../utlis/SupabaseClient.js';
// import { fetchYouTubeMetadata } from '../../utlis/fetchYouTubeMetadata.js';
// import { useParams } from "react-router-dom";


// export default function AiFullChat() {
//   const { messages, setMessages } = useLayout();
//   const [showLibraryInput, setShowLibraryInput] = useState(false);
//   const [videoURL, setVideoURL] = useState("");
//   const [playlists, setPlaylists] = useState([]);
//   const [selectedPlaylists, setSelectedPlaylists] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { videoId } = useParams();

//   //  Fetch user, playlists, and chats if videoId exists
//   useEffect(() => {
//     const init = async () => {
//       //  Fetch user
//       const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
//       setUser(userError ? null : currentUser);

//       //  Fetch playlists for user
//       if (currentUser) {
//         const { data, error } = await supabase
//           .from('playlists')
//           .select('title')
//           .eq('user_id', currentUser.id);
//         setPlaylists(error ? [] : data.map(p => p.title));
//       }

//       //  If videoId exists, fetch chats for that video
//       if (videoId) {
//         const { data, error } = await supabase
//           .from("chats")
//           .select("role, message")
//           .eq("video_id", videoId)
//           .order("created_at", { ascending: true });
//         if (data) {
//            setMessages(data);  //Show previous chats for this video
//         } else {
//           setMessages([]);  //No previous chats
//         }        useEffect(() => {
//           const init = async () => {
//             //  Fetch user
//             const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
//             setUser(userError ? null : currentUser);
        
//             //  Fetch playlists for user
//             if (currentUser) {
//               const { data, error } = await supabase
//                 .from('playlists')
//                 .select('title')
//                 .eq('user_id', currentUser.id);
//               setPlaylists(error ? [] : data.map(p => p.title));
//             }
        
//             //  If videoId exists, fetch chats for that video
//             if (videoId) {
//               const { data, error } = await supabase
//                 .from("chats")
//                 .select("role, message")
//                 .eq("video_id", videoId)
//                 .order("created_at", { ascending: true });
//               if (data) {
//                 setMessages(data);  //Show previous chats for this video
//               } else {
//                 setMessages([]);  //No previous chats
//               }
//             } else {
//               setMessages([]);  //If no videoId, start fresh
//             }
//             setLoading(false);
//           };
        
//           init();
        
//           //  Listen for auth changes
//           const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//             setUser(session?.user || null);
//           });
        
//           return () => {
//             authListener.subscription.unsubscribe();
//           };
//         }, [videoId, setMessages]);
//       } else {
//         setMessages([]);  //If no videoId, start fresh
//       }
//       setLoading(false);
//     };

//     init();

//     //  Listen for auth changes
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user || null);
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, [videoId, setMessages]);

//   //  Handle Library Save
//   const handleSaveLibrary = async () => {
//     if (!user) {
//       alert('Please log in to save to library');
//       return;
//     }

//     if (!videoURL.trim()) {
//       alert("Paste a video link first!");
//       return;
//     }

//     try {
//       //  Fetch YouTube metadata
//       const meta = await fetchYouTubeMetadata(videoURL);
//       if (!meta) {
//         alert("Failed to fetch video metadata");
//         return;
//       }

//       //  Process each selected playlist
//       for (const playlistTitle of selectedPlaylists) {
//         try {
//           //  Find or create playlist
//           let { data: playlistData, error: playlistError } = await supabase
//             .from("playlists")
//             .select("id")
//             .eq("title", playlistTitle)
//             .eq("user_id", user.id)
//             .single();

//           //  If playlist doesn't exist, create it
//           if (playlistError) {
//             const { data: newPlaylist, error: createError } = await supabase
//               .from("playlists")
//               .insert({ 
//                 title: playlistTitle, 
//                 user_id: user.id 
//               })
//               .select()
//               .single();

//             if (createError) {
//               console.error(`Failed to create playlist: ${playlistTitle}`, createError);
//               alert(`Failed to create playlist: ${playlistTitle}`);
//               continue;
//             }

//             playlistData = newPlaylist;
//           }

//           //  Insert video into the playlist
//           const { data: videoData, error: videoError } = await supabase
//             .from("videos")
//             .insert({
//               video_url: videoURL,
//               title: meta.title,
//               thumbnail: meta.thumbnail,
//               duration: meta.duration,
//               playlist_id: playlistData.id,
//               user_id: user.id  //Make sure this column exists in your videos table!
//             })
//             .select()
//             .single();

//           if (videoError) {
//             console.error('Video insertion error:', videoError);
//             alert(`Failed to add video to playlist: ${playlistTitle}`);
//             continue;
//           }

//           //  Insert chat messages
//           const chatInserts = messages.map((msg) => ({
//             video_id: videoData.id,
//             role: msg.role,
//             message: msg.text,
//             user_id: user.id
//           }));

//           const { error: chatError } = await supabase
//             .from("chats")
//             .insert(chatInserts);

//           if (chatError) {
//             console.error('Chat messages insertion error:', chatError);
//           }
//         } catch (playlistProcessError) {
//           console.error('Playlist processing error:', playlistProcessError);
//           alert(`Error processing playlist: ${playlistTitle}`);
//         }
//       }

//     //  Reset state after successful save
//       setVideoURL("");
//       setSelectedPlaylists([]);
//       setShowLibraryInput(false);
//       alert('Successfully saved to library!');
//     } catch (error) {
//       console.error('Library save error:', error);
//       alert('Failed to save to library. Please try again.');
//     }
//   };

//     //  Playlist Toggle Handler
//   const handlePlaylistToggle = (name) => {
//     setSelectedPlaylists((prev) =>
//       prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
//     );
//   };

//     //  Create New Playlist
//   const handleCreateNewPlaylist = async () => { 
//     if (!user) {
//       alert('Please log in to create a playlist');
//       return;
//     }

//     const newPlaylist = prompt("Enter new playlist name:");
//     if (newPlaylist) {
//       try {
//         const { data, error } = await supabase
//           .from('playlists')
//           .insert({ 
//             title: newPlaylist, 
//             user_id: user.id 
//           })
//           .select()
//           .single();

//         if (error) {
//           console.error('Playlist creation error:', error);
//           alert(`Failed to create playlist: ${newPlaylist}`);
//         } else {
//           setPlaylists((prev) => [...prev, newPlaylist]);
//         }
//       } catch (error) {
//         console.error('Playlist creation error:', error);
//         alert('Failed to create playlist');
//       }
//     }
//   };

//   //  Render Loading State
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-[#0f0f0f] text-white">
//         Loading...
//       </div>
//     );
//   }

//   //  Main Render
//   return (
//     <div className="flex flex-col w-full h-screen bg-[#0f0f0f] text-white px-4 py-6">
//     {/* // <div className="flex flex-col w-full h-full bg-blue-600 text-white px-4 py-6"> */}
//       {/* Messages Section */}
//       <div className="flex-1 overflow-y-auto space-y-4 pr-2">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`px-4 py-3 rounded-md max-w-[85%] ${
//               msg.role === 'user'
//                 ? 'bg-[#232323] text-right ml-auto'
//                 : 'bg-[#1b1b1b] text-left mr-auto'
//             }`}
//           >
//             {/* <p className="text-gray-400 text-8xl font-semibold">
//               {msg.role === 'user' ? 'You' : 'AI'}
//             </p> */}
//             <p className="whitespace-pre-wrap text-white"> {msg.text} </p>
//           </div>
//         ))}
//       </div>


//       {/* Action Buttons like add to library,clear chat to be here */}


//       {/* Library Input Modal */}
//       {showLibraryInput && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="bg-[#1e1e1e] p-6 rounded-xl w-[90%] max-w-lg">
//             <h2 className="text-lg font-bold mb-4">Add to Library</h2>
//             <input
//               type="text"
//               placeholder="Paste YouTube Video URL"
//               className="w-full px-3 py-2 mb-4 rounded-md bg-[#2a2a2a] text-white"
//               value={videoURL}
//               onChange={(e) => setVideoURL(e.target.value)}
//             />
//             <div className="mb-4">
//               <p className="mb-2 font-semibold">Choose Playlists</p>
//               {playlists.map((name) => (
//                 <label key={name} className="flex items-center space-x-2 mb-1">
//                   <input
//                     type="checkbox"
//                     checked={selectedPlaylists.includes(name)}
//                     onChange={() => handlePlaylistToggle(name)}
//                   />
//                   <span>{name}</span>
//                 </label>
//               ))}
//               <button
//                 className="text-blue-400 mt-2 text-sm"
//                 onClick={handleCreateNewPlaylist}
//               >
//                 ➕ Create New Playlist
//               </button>
//             </div>
//             <div className="flex justify-end space-x-3">
//               <button 
//                 onClick={() => setShowLibraryInput(false)} 
//                 className="text-gray-300"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleSaveLibrary} 
//                 className="bg-blue-600 px-4 py-2 rounded-md text-white"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/*  testing here ie: add to library,clear chat to be here*/}
//       {messages.length > 0 && (
//         <div className="flex justify-center flex-wrap gap-3 pt-4 pb-2">
//             <button 
//               onClick={() => setShowLibraryInput(true)} 
//               className="bg-green-600 px-4 py-2 rounded-md"
//             >
//              📚 Add to Library
//             </button>
//             <button 
//               onClick={() => setMessages([])} 
//               className="bg-red-600 px-4 py-2 rounded-md"
//             >
//              🗑️ Clear Chat
//             </button>
//         </div>
//       )}
//       {/* {messages.length > 0 && (
//         <div className="flex justify-center flex-wrap gap-3 pt-4 pb-2">
//             {user ? (
//               <button 
//                onClick={() => setShowLibraryInput(true)} 
//                className="bg-green-600 px-4 py-2 rounded-md"
//               >
//                📚 Add to Library
//               </button>
//               ) : (
//               <button
//               // onClick=    Implement login modal/redirect 
//                 className="bg-blue-600 px-4 py-2 rounded-md"
//               >
//                🔐 Login to Save 
//               </button>
//             )}
//             <button 
//               onClick={() => setMessages([])} 
//               className="bg-red-600 px-4 py-2 rounded-md"
//             >
//              🗑️ Clear Chat
//             </button>
//         </div>
//       )} */}

//       <PromptSection />
//     </div>
//   );
// }










    // from chatgpt for the 1st user prompt but not working.

// import { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../../utlis/SupabaseClient.js";
// import { fetchYouTubeMetadata } from "../../utlis/fetchYouTubeMetadata.js";
// import { useLayout } from "../context/DashboardContext";
// import PromptSection from "./PromptSection";

// export default function AiFullChat() {
//   const { messages, setMessages } = useLayout();
//   const [showLibraryInput, setShowLibraryInput] = useState(false);
//   const [videoURL, setVideoURL] = useState("");
//   const [playlists, setPlaylists] = useState([]);
//   const [selectedPlaylists, setSelectedPlaylists] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const messagesEndRef = useRef(null);

//   const { videoId } = useParams();

//   useEffect(() => {
//     const init = async () => {
//       const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
//       setUser(userError ? null : currentUser);

//       if (currentUser) {
//         const { data: playlistData, error } = await supabase
//           .from("playlists")
//           .select("title")
//           .eq("user_id", currentUser.id);

//         setPlaylists(error ? [] : playlistData.map(p => p.title));
//       }

//       if (videoId) {
//         const { data, error } = await supabase
//           .from("chats")
//           .select("role, message")
//           .eq("video_id", videoId)
//           .order("created_at", { ascending: true });

//         setMessages(data || []);
//       } else {
//         setMessages([]);
//       }

//       setLoading(false);
//     };

//     init();

//     const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user || null);
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, [videoId, setMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   //check if AiFullChat renders with messages or not
//   console.log("AiFullChat rendered with messages:", messages);


//   const handleSaveLibrary = async () => {
//     if (!user) return alert('Please log in to save to library');
//     if (!videoURL.trim()) return alert("Paste a video link first!");

//     try {
//       const meta = await fetchYouTubeMetadata(videoURL);
//       if (!meta) return alert("Failed to fetch video metadata");

//       for (const playlistTitle of selectedPlaylists) {
//         let { data: playlistData, error: playlistError } = await supabase
//           .from("playlists")
//           .select("id")
//           .eq("title", playlistTitle)
//           .eq("user_id", user.id)
//           .single();

//         if (playlistError) {
//           const { data: newPlaylist, error: createError } = await supabase
//             .from("playlists")
//             .insert({ title: playlistTitle, user_id: user.id })
//             .select()
//             .single();

//           if (createError) {
//             console.error("Failed to create playlist:", createError);
//             continue;
//           }

//           playlistData = newPlaylist;
//         }

//         const { data: videoData, error: videoError } = await supabase
//           .from("videos")
//           .insert({
//             video_url: videoURL,
//             title: meta.title,
//             thumbnail: meta.thumbnail,
//             duration: meta.duration,
//             playlist_id: playlistData.id,
//             user_id: user.id
//           })
//           .select()
//           .single();

//         if (videoError) continue;

//         const chatInserts = messages.map((msg) => ({
//           video_id: videoData.id,
//           role: msg.role,
//           message: msg.text || msg.message,
//           user_id: user.id
//         }));

//         await supabase.from("chats").insert(chatInserts);
//       }

//       setVideoURL("");
//       setSelectedPlaylists([]);
//       setShowLibraryInput(false);
//       alert("Successfully saved to library!");
//     } catch (error) {
//       console.error("Library save error:", error);
//       alert("Failed to save to library.");
//     }
//   };

//   const handlePlaylistToggle = (name) => {
//     setSelectedPlaylists((prev) =>
//       prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
//     );
//   };

//   const handleCreateNewPlaylist = async () => {
//     if (!user) return alert("Please log in to create a playlist");

//     const newPlaylist = prompt("Enter new playlist name:");
//     if (newPlaylist) {
//       const { data, error } = await supabase
//         .from("playlists")
//         .insert({ title: newPlaylist, user_id: user.id })
//         .select()
//         .single();

//       if (!error) {
//         setPlaylists((prev) => [...prev, newPlaylist]);
//       } else {
//         alert("Failed to create playlist");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-[#0f0f0f] text-white">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col w-full h-screen bg-[#0f0f0f] text-white px-2 sm:px-4 md:px-6 py-4">
//       {/* Messages */}
//       {/* <div className="flex-1 overflow-y-auto space-y-4 pr-2">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`px-4 py-3 rounded-md max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%] ${
//               msg.role === "user"
//                 ? "bg-[#232323] text-right ml-auto"
//                 : "bg-[#1b1b1b] text-left mr-auto"
//             }`}
//           >
//             <p className="whitespace-pre-wrap text-white text-sm sm:text-base">
//               {msg.text || msg.message}
//             </p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div> */}

//       <div className="bg-gray-700 min-h-screen px-4 py-6 text-white flex flex-col gap-4">
//       {messages.length === 0 ? (
//         <p className="text-center text-gray-400">No messages yet...</p>
//       ) : (
//         messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`max-w-xl px-4 py-3 rounded-lg ${
//               msg.role === "user"
//                 ? "bg-pink-200 text-black self-end"
//                 : "bg-gray-600 text-white self-start"
//             }`}
//           >
//             <strong>{msg.role === "user" ? "You" : "AI"}</strong>
//             <p className="whitespace-pre-wrap">{msg.text || msg.message}</p>
//           </div>
//         ))
//       )}
//     </div>


//       {/* Action Buttons */}
//       {messages.length > 0 && (
//         <div className="flex justify-center flex-wrap gap-3 pt-4 pb-2">
//           <button
//             onClick={() => setShowLibraryInput(true)}
//             className="bg-green-600 px-4 py-2 rounded-md"
//           >
//             📚 Add to Library
//           </button>
//           <button
//             onClick={() => setMessages([])}
//             className="bg-red-600 px-4 py-2 rounded-md"
//           >
//             🗑️ Clear Chat
//           </button>
//         </div>
//       )}

//       {/* Prompt Section */}
//       <PromptSection />

//       {/* Library Modal */}
//       {showLibraryInput && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="bg-[#1e1e1e] p-6 rounded-xl w-[90%] max-w-lg">
//             <h2 className="text-lg font-bold mb-4">Add to Library</h2>
//             <input
//               type="text"
//               placeholder="Paste YouTube Video URL"
//               className="w-full px-3 py-2 mb-4 rounded-md bg-[#2a2a2a] text-white"
//               value={videoURL}
//               onChange={(e) => setVideoURL(e.target.value)}
//             />
//             <div className="mb-4">
//               <p className="mb-2 font-semibold">Choose Playlists</p>
//               {playlists.map((name) => (
//                 <label key={name} className="flex items-center space-x-2 mb-1">
//                   <input
//                     type="checkbox"
//                     checked={selectedPlaylists.includes(name)}
//                     onChange={() => handlePlaylistToggle(name)}
//                   />
//                   <span>{name}</span>
//                 </label>
//               ))}
//               <button
//                 className="text-blue-400 mt-2 text-sm"
//                 onClick={handleCreateNewPlaylist}
//               >
//                 ➕ Create New Playlist
//               </button>
//             </div>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowLibraryInput(false)}
//                 className="text-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveLibrary}
//                 className="bg-blue-600 px-4 py-2 rounded-md text-white"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };











    // this code gives 1st user prompt and chats fn in videos.

import { useLayout } from '../context/DashboardContext';
import PromptSection from './PromptSection';
import { useState, useEffect } from 'react';
import { supabase } from '../../utlis/SupabaseClient.js';
import { fetchYouTubeMetadata } from '../../utlis/fetchYouTubeMetadata.js';
import { useParams } from "react-router-dom";

export default function AiFullChat() {
  const { messages, setMessages } = useLayout();
  const [showLibraryInput, setShowLibraryInput] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { videoId } = useParams();

  // Fetch user, playlists, and chats if videoId exists
  useEffect(() => {
    const init = async () => {
      try {
        // Fetch user
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        setUser(userError ? null : currentUser);

        // Fetch playlists for user
        if (currentUser) {
          const { data, error } = await supabase
            .from('playlists')
            .select('title')
            .eq('user_id', currentUser.id);
          setPlaylists(error ? [] : data.map(p => p.title));
        }

        // If videoId exists, fetch chats for that video
        if (videoId) {
          const { data, error } = await supabase
            .from("chats")
            .select("role, message")
            .eq("video_id", videoId)
            .order("created_at", { ascending: true });
          
          if (data && !error) {
            // Map the database format to your message format
            const formattedMessages = data.map(chat => ({
              role: chat.role,
              text: chat.message
            }));
            setMessages(formattedMessages);
          } else {
            // Don't clear existing messages if we're coming from PromptSection
            // Only clear if there's an error or no data and no existing messages
            if (messages.length === 0) {
              setMessages([]);
            }
          }
        }
        // If no videoId, keep existing messages (don't clear them)
        
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    init();          

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [videoId]); // Removed setMessages from dependency array to prevent clearing

  // Handle Library Save
  const handleSaveLibrary = async () => {
    if (!user) {
      alert('Please log in to save to library');
      return;
    }

    if (!videoURL.trim()) {
      alert("Paste a video link first!");
      return;
    }

    try {
      // Fetch YouTube metadata
      const meta = await fetchYouTubeMetadata(videoURL);
      if (!meta) {
        alert("Failed to fetch video metadata");
        return;
      }

      // Process each selected playlist
      for (const playlistTitle of selectedPlaylists) {
        try {
          // Find or create playlist
          let { data: playlistData, error: playlistError } = await supabase
            .from("playlists")
            .select("id")
            .eq("title", playlistTitle)
            .eq("user_id", user.id)
            .single();

          // If playlist doesn't exist, create it
          if (playlistError) {
            const { data: newPlaylist, error: createError } = await supabase
              .from("playlists")
              .insert({ 
                title: playlistTitle, 
                user_id: user.id 
              })
              .select()
              .single();

            if (createError) {
              console.error(`Failed to create playlist: ${playlistTitle}`, createError);
              alert(`Failed to create playlist: ${playlistTitle}`);
              continue;
            }

            playlistData = newPlaylist;
          }

          // Insert video into the playlist
          const { data: videoData, error: videoError } = await supabase
            .from("videos")
            .insert({
              video_url: videoURL,
              title: meta.title,
              thumbnail: meta.thumbnail,
              duration: meta.duration,
              playlist_id: playlistData.id,
              user_id: user.id
            })
            .select()
            .single();

          if (videoError) {
            console.error('Video insertion error:', videoError);
            alert(`Failed to add video to playlist: ${playlistTitle}`);
            continue;
          }

          // Insert chat messages
          const chatInserts = messages.map((msg) => ({
            video_id: videoData.id,
            role: msg.role,
            message: msg.text,
            user_id: user.id
          }));

          if (chatInserts.length > 0) {
            const { error: chatError } = await supabase
              .from("chats")
              .insert(chatInserts);

            if (chatError) {
              console.error('Chat messages insertion error:', chatError);
            }
          }
        } catch (playlistProcessError) {
          console.error('Playlist processing error:', playlistProcessError);
          alert(`Error processing playlist: ${playlistTitle}`);
        }
      }

      // Reset state after successful save
      setVideoURL("");
      setSelectedPlaylists([]);
      setShowLibraryInput(false);
      alert('Successfully saved to library!');
    } catch (error) {
      console.error('Library save error:', error);
      alert('Failed to save to library. Please try again.');
    }
  };

  // Playlist Toggle Handler
  const handlePlaylistToggle = (name) => {
    setSelectedPlaylists((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  // Create New Playlist
  const handleCreateNewPlaylist = async () => { 
    if (!user) {
      alert('Please log in to create a playlist');
      return;
    }

    const newPlaylist = prompt("Enter new playlist name:");
    if (newPlaylist) {
      try {
        const { data, error } = await supabase
          .from('playlists')
          .insert({ 
            title: newPlaylist, 
            user_id: user.id 
          })
          .select()
          .single();

        if (error) {
          console.error('Playlist creation error:', error);
          alert(`Failed to create playlist: ${newPlaylist}`);
        } else {
          setPlaylists((prev) => [...prev, newPlaylist]);
        }
      } catch (error) {
        console.error('Playlist creation error:', error);
        alert('Failed to create playlist');
      }
    }
  };

  // Render Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f] text-white">
        Loading...
      </div>
    );
  }

  // Main Render
  return (
    <div className="flex flex-col w-full h-screen bg-[#0f0f0f] text-white px-4 py-6">
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Start a conversation...
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`px-4 py-3 rounded-md max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-[#232323] text-right ml-auto'
                  : 'bg-[#1b1b1b] text-left mr-auto'
              }`}
            >
              <p className="whitespace-pre-wrap text-white">{msg.text}</p>
            </div>
          ))
        )}
      </div>

      {/* Library Input Modal */}
      {showLibraryInput && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl w-[90%] max-w-lg">
            <h2 className="text-lg font-bold mb-4">Add to Library</h2>
            <input
              type="text"
              placeholder="Paste YouTube Video URL"
              className="w-full px-3 py-2 mb-4 rounded-md bg-[#2a2a2a] text-white"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <div className="mb-4">
              <p className="mb-2 font-semibold">Choose Playlists</p>
              {playlists.map((name) => (
                <label key={name} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedPlaylists.includes(name)}
                    onChange={() => handlePlaylistToggle(name)}
                  />
                  <span>{name}</span>
                </label>
              ))}
              <button
                className="text-blue-400 mt-2 text-sm"
                onClick={handleCreateNewPlaylist}
              >
                ➕ Create New Playlist
              </button>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowLibraryInput(false)} 
                className="text-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveLibrary} 
                className="bg-blue-600 px-4 py-2 rounded-md text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons - only show when there are messages */}
      {messages.length > 0 && (
        <div className="flex justify-center flex-wrap gap-3 pt-4 pb-2">
          <button 
            onClick={() => setShowLibraryInput(true)} 
            className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            📚 Add to Library
          </button>
          <button 
            onClick={() => setMessages([])} 
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            🗑️ Clear Chat
          </button>
        </div>
      )}

      <PromptSection />
    </div>
  );
};