// import { useEffect, useState } from "react";
// import { supabase } from "../../utlis/SupabaseClient";
// import { useNavigate } from "react-router-dom";
// import { SlOptionsVertical } from "react-icons/sl";

// function Library() {
//   const [playlists, setPlaylists] = useState([]);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       const { data, error } = await supabase
//         .from("playlists")
//         .select(`id, title, updated_at, videos(id, thumbnail)`);

//       if (error) {
//         console.error("Error fetching playlists:", error);
//       } else {
//         setPlaylists(data);
//       }
//     };
//     fetchPlaylists();
//   }, []);

//   const handleDelete = async (playlistId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this video?");
//     if (!confirmDelete) return;

//     const { error } = await supabase.from("playlists").delete().eq("id", playlistId);
//     if (error) {
//       console.error("Error deleting playlist:", error);
//     } else {
//       setPlaylists(playlists.filter((pl) => pl.id !== playlistId));
//       setOpenMenuId(null);
//     }
//   };

//   const handleEdit = async (playlist) => {
//     const newTitle = prompt("Enter new title:", playlist.title);
//     if (!newTitle) return;

//     const { error } = await supabase
//       .from("playlists")
//       .update({ title: newTitle })
//       .eq("id", playlist.id);

//     if (error) {
//       console.error("Error updating title:", error);
//     } else {
//       setPlaylists((prev) =>
//         prev.map((pl) =>
//           pl.id === playlist.id ? { ...pl, title: newTitle } : pl
//         )
//       );
//       setOpenMenuId(null);
//     }
//   };

//   const closeMenus = () => {
//     setOpenMenuId(null);
//   };

//   return (
//     <div className="p-9 h-full text-white bg-black" onClick={closeMenus}>
//       <h1 className="text-3xl mb-9 text-center font-bold ">Playlists</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {playlists.map((pl) => (
//           <div
//             key={pl.id}
//             className="relative cursor-pointer bg-zinc-800 rounded-xl overflow-hidden shadow hover:opacity-95 transition-all"
//           >
//             <img
//               onClick={() => navigate(`/playlist/${pl.id}`)}
//               src={
//                 pl.videos?.[0]?.thumbnail ||
//                 "https://placehold.co/320x180?text=No+Thumbnail"
//               }
//               alt={pl.title}
//               className="w-full h-40 object-cover"
//             />

//             <div
//               onClick={() => navigate(`/playlist/${pl.id}`)}
//               className="flex justify-between items-start bg-zinc-800 p-4"
//             >
//               <div>
//                 <h2 className="text-lg font-bold truncate">{pl.title}</h2>
//                 <p className="text-sm text-zinc-400">Private • Playlist</p>
//                 <p className="text-sm text-zinc-400 mt-1">
//                   Updated{" "}
//                   {pl.updated_at
//                     ? new Date(pl.updated_at).toLocaleDateString()
//                     : "recently"}
//                 </p>
//                 <span className="text-md text-zinc-200 mt-2">
//                   {pl.videos.length}{" "}
//                   {pl.videos.length === 1 ? "video" : "videos"}
//                 </span>
//               </div>
//             </div>

//             {/* Options icon and dropdown */}
//             <div
//               className="absolute top-4 right-4  "
//               onClick={(e) => e.stopPropagation()} // Prevent click bubbling
//             >
//               <SlOptionsVertical
//                 onClick={() =>
//                   setOpenMenuId(openMenuId === pl.id ? null : pl.id)
//                 }
//                 className="hover:bg-gray-500 bg-zinc-700 rounded-md text-3xl p-1 mt-2 text-white cursor-pointer"
//               />

//               {openMenuId === pl.id && (
//                 <div className="absolute top-8 right-0 mt-2 bg-zinc-800 border border-zinc-600 rounded-md shadow-lg z-50 w-36">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEdit(pl);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(pl.id);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Library;










//      creating playlist donoot work with this code.

// import { useEffect, useState } from "react";
// import { supabase } from "../../utlis/SupabaseClient";
// import { useNavigate } from "react-router-dom";
// import { SlOptionsVertical } from "react-icons/sl";

// function Library() {
//   const [playlists, setPlaylists] = useState([]);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       const { data, error } = await supabase
//         .from("playlists")
//         .select(`id, title, updated_at, videos(id, thumbnail)`);

//       if (error) {
//         console.error("Error fetching playlists:", error);
//       } else {
//         setPlaylists(data);
//       }
//     };
//     fetchPlaylists();
//   }, []);

//   const handleDelete = async (playlistId) => {
//     const { error } = await supabase.from("playlists").delete().eq("id", playlistId);
//     if (error) {
//       console.error("Error deleting playlist:", error);
//     } else {
//       setPlaylists(playlists.filter((pl) => pl.id !== playlistId));
//       setOpenMenuId(null);
//     }
//   };

//   const handleEdit = async (playlist) => {
//     const newTitle = prompt("Enter new title:", playlist.title);
//     if (!newTitle) return;

//     const { error } = await supabase
//       .from("playlists")
//       .update({ title: newTitle })
//       .eq("id", playlist.id);

//     if (error) {
//       console.error("Error updating title:", error);
//     } else {
//       setPlaylists((prev) =>
//         prev.map((pl) =>
//           pl.id === playlist.id ? { ...pl, title: newTitle } : pl
//         )
//       );
//       setOpenMenuId(null);
//     };

//   };

//   const handleCreate = async () => {
//     const title = prompt("Enter a title for your new playlist:");
//     if (!title) return;

//     const { data, error } = await supabase
//       .from("playlists")
//       .insert([{ title }])
//       .select(`id, title, updated_at, videos(id, thumbnail)`);

//     if (error) {
//       console.error("Error creating playlist:", error);
//     } else if (data && data.length > 0) {
//       setPlaylists((prev) => [data[0], ...prev]);
//     }
//   };

//   const closeMenus = () => {
//     setOpenMenuId(null);
//   };

//   return (
//     <div className="p-9 h-full text-white bg-black" onClick={closeMenus}>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-center md:text-left">Playlists</h1>
//         <button
//           onClick={handleCreate}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
//         >
//           + Create Playlist
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {playlists.map((pl) => (
//           <div
//             key={pl.id}
//             className="relative cursor-pointer bg-zinc-800 rounded-xl overflow-hidden shadow hover:opacity-95 transition-all"
//           >
//             <img
//               onClick={() => navigate(`/playlist/${pl.id}`)}
//               src={
//                 pl.videos?.[0]?.thumbnail ||
//                 "https://placehold.co/320x180?text=No+Thumbnail"
//               }
//               alt={pl.title}
//               className="w-full h-40 object-cover"
//             />

//             <div
//               onClick={() => navigate(`/playlist/${pl.id}`)}
//               className="flex justify-between items-start bg-zinc-800 p-4"
//             >
//               <div>
//                 <h2 className="text-lg font-bold truncate">{pl.title}</h2>
//                 <p className="text-sm text-zinc-400">Private • Playlist</p>
//                 <p className="text-sm text-zinc-400 mt-1">
//                   Updated{" "}
//                   {pl.updated_at
//                     ? new Date(pl.updated_at).toLocaleDateString()
//                     : "recently"}
//                 </p>
//                 <span className="text-md text-zinc-200 mt-2">
//                   {pl.videos.length}{" "}
//                   {pl.videos.length === 1 ? "video" : "videos"}
//                 </span>
//               </div>
//             </div>

//             {/* Options icon and dropdown */}
//             <div
//               className="absolute top-4 right-4"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <SlOptionsVertical
//                 onClick={() =>
//                   setOpenMenuId(openMenuId === pl.id ? null : pl.id)
//                 }
//                 className="hover:bg-gray-500 bg-zinc-700 rounded-md text-3xl p-1 text-white cursor-pointer"
//               />

//               {openMenuId === pl.id && (
//                 <div className="absolute top-8 right-0 mt-2 bg-zinc-800 border border-zinc-600 rounded-md shadow-lg z-50 w-36">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEdit(pl);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(pl.id);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Library;


















import { useEffect, useState } from "react";
import { supabase } from "../../utlis/SupabaseClient";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";

function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.warn("User not authenticated.");
        return;
      }

      const { data, error } = await supabase
        .from("playlists")
        .select(`id, title, updated_at, videos(id, thumbnail)`)
        .eq("user_id", user.id); // Only fetch this user's playlists

      if (error) {
        console.error("Error fetching playlists:", error);
      } else {
        setPlaylists(data);
      }
    };

    fetchPlaylists();
  }, []);

  const handleDelete = async (playlistId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this playlist?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("playlists").delete().eq("id", playlistId);
    if (error) {
      console.error("Error deleting playlist:", error);
    } else {
      setPlaylists(playlists.filter((pl) => pl.id !== playlistId));
      setOpenMenuId(null);
    }
  };

  const handleEdit = async (playlist) => {
    const newTitle = prompt("Enter new title:", playlist.title);
    if (!newTitle) return;

    const { error } = await supabase
      .from("playlists")
      .update({ title: newTitle })
      .eq("id", playlist.id);

    if (error) {
      console.error("Error updating title:", error);
    } else {
      setPlaylists((prev) =>
        prev.map((pl) =>
          pl.id === playlist.id ? { ...pl, title: newTitle } : pl
        )
      );
      setOpenMenuId(null);
    }
  };

  const handleCreate = async () => {
    const newTitle = prompt("Enter new playlist name:");
    if (!newTitle) return;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("You must be logged in to create a playlist.");
      return;
    }

    const { data, error } = await supabase
      .from("playlists")
      .insert([{ title: newTitle, user_id: user.id }])
      .select(`id, title, updated_at, videos(id, thumbnail)`)
      .single();

    if (error) {
      console.error("Error creating playlist:", error);
      alert("Failed to create playlist.");
    } else {
      setPlaylists((prev) => [data, ...prev]);
    }
  };

  const closeMenus = () => {
    setOpenMenuId(null);
  };

  return (
    <div className="p-9 h-full text-white bg-black" onClick={closeMenus}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-y-4">
        <h1 className="text-3xl font-bold text-center md:text-left">Playlists</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md shadow"
        >
          + Create Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {playlists.map((pl) => (
          <div
            key={pl.id}
            className="relative cursor-pointer bg-zinc-800 rounded-xl overflow-hidden shadow hover:opacity-95 transition-all"
          >
            <img
              onClick={() => navigate(`/playlist/${pl.id}`)}
              src={
                pl.videos?.[0]?.thumbnail ||
                "https://placehold.co/320x180?text=No+Thumbnail"
              }
              alt={pl.title}
              className="w-full h-36 object-cover "
            />

            <div
              onClick={() => navigate(`/playlist/${pl.id}`)}
              className="flex justify-between items-start bg-zinc-800 p-4"
            >
              <div>
                <h2 className="text-lg font-bold truncate">{pl.title}</h2>
                <p className="text-sm text-zinc-400">Private • Playlist</p>
                <p className="text-sm text-zinc-400 ">
                  Updated{" "}
                  {pl.updated_at
                    ? new Date(pl.updated_at).toLocaleDateString()
                    : "recently"}
                </p>
                <span className="text-md text-zinc-200 mt-2">
                  {pl.videos.length}{" "}
                  {pl.videos.length === 1 ? "video" : "videos"}
                </span>
              </div>
            </div>

            {/* Options icon and dropdown */}
            <div
              className="absolute top-4 right-4"
              onClick={(e) => e.stopPropagation()}
            >
              <SlOptionsVertical
                onClick={() =>
                  setOpenMenuId(openMenuId === pl.id ? null : pl.id)
                }
                className="hover:bg-gray-500 bg-zinc-700 rounded-md text-3xl p-1 mt-2 text-white cursor-pointer"
              />

              {openMenuId === pl.id && (
                <div className="absolute top-8 right-0 mt-2 bg-zinc-800 border border-zinc-600 rounded-md shadow-lg z-50 w-36">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(pl);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(pl.id);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;