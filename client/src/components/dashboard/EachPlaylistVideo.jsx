// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../../utlis/SupabaseClient";
// import { fetchYouTubeMetadata } from "../../utlis/fetchYouTubeMetadata"; 
// import PromptSection from "./PromptSection";


// function EachPlaylistVideo() {
//   const { id } = useParams();
//   const [playlist, setPlaylist] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showChatModal, setShowChatModal] = useState(false);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [videoUrl, setVideoUrl] = useState("");
//   const [addLoading, setAddLoading] = useState(false);
//   const [showOptions, setShowOptions] = useState(null);


//   useEffect(() => {
//     const fetchplaylist = async () => {
//       const { data, error } = await supabase
//         .from("playlists")
//         .select("id, title, updated_at, videos(id, title, thumbnail, video_url, duration)")
//         .eq("id", id)
//         .single();

//       if (error) console.error("Error fetching playlist:", error);
//       else {
//         setPlaylist(data);
//         setVideos(data.videos || []);
//       }
//       setLoading(false);
//     };

//     fetchplaylist();
//   }, [id]);

//   const handleShowChats = async (video) => {
//     setActiveVideo(video);
//     setShowChatModal(true);
//     const { data, error } = await supabase
//       .from("chats")
//       .select("id, role, message, created_at")
//       .eq("video_id", video.id)
//       .order("created_at", { ascending: true });

//     if (error) console.error("Error fetching chats:", error);
//     else setChatMessages(data);
//   };

//   const handleAddVideo = async () => {
//     if (!videoUrl) return;
//     setAddLoading(true);

//     const metadata = await fetchYouTubeMetadata(videoUrl);
//     if (!metadata) {
//       alert("Failed to fetch video metadata.");
//       setAddLoading(false);
//       return;
//     };

//     const { title, thumbnail, duration } = metadata;

//     const { data, error } = await supabase.from("videos").insert({
//       title,
//       thumbnail,
//       duration,
//       video_url: videoUrl,
//       playlist_id: id,
//     }).select().single();  

//     if (error) {
//       console.error("Error adding video:", error);
//       alert("Could not add video.");
//     } else {
//       setVideos((prev) => [data, ...prev]);
//       setVideoUrl("");
//     }
//     setAddLoading(false);
//   };

//   const handleDeleteVideo = async (videoId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this video?");
//     if (!confirmDelete) return;

//     const { error } = await supabase
//       .from("videos")
//       .delete()
//       .eq("id", videoId);

//     if (error) {
//       console.error("Error deleting video:", error);
//       alert("Failed to delete video.");
//     } else {
//       setVideos((prev) => prev.filter((v) => v.id !== videoId));
//     }
//   };

//   if (loading) return <div className="p-6 text-white">Loading...</div>;

//   return (
//     <div className="p-6 h-full text-white bg-black">
//       <h1 className="text-3xl font-bold mb-4">{playlist.title}</h1>
//       <p className="text-sm text-zinc-400 mb-6">
//         Updated {playlist.updated_at ? new Date(playlist.updated_at).toLocaleDateString() : "recently"}
//       </p>

//       {/* Add video input */}
//       <div className="flex gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="Paste YouTube URL"
//           value={videoUrl}
//           onChange={(e) => setVideoUrl(e.target.value)}
//           className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded"
//         />
//         <button
//           onClick={handleAddVideo}
//           disabled={addLoading}
//           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
//         >
//           {addLoading ? "Adding..." : "Add Video"}
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {videos.map((video) => (
//           <div key={video.id} className="bg-zinc-800 rounded-xl overflow-hidden shadow relative">
//             <img
//               src={video.thumbnail || "https://via.placeholder.com/320x180?text=No+Thumbnail"}
//               alt={video.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-3">
//               <h2 className="text-xl font-bold truncate">{video.title || "Untitled Video"}</h2>
//               <p className="text-lg font-semibold text-zinc-400">{video.duration || "Unknown duration"}</p>
//               <a
//                 href={video.video_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400 hover:underline mr-8"
//               >
//                 Watch on YouTube
//               </a>
//               <div className="flex justify-between items-center mt-2">
//                 <button
//                   className="block text-md bg-zinc-700 hover:bg-zinc-600 rounded mt-2 px-2"
//                   onClick={() => handleShowChats(video)}
//                 >
//                   💬 Chat & Details
//                 </button>
//                 <button
//                   className="bg-red-600 hover:bg-red-500 rounded px-3 py-1 text-sm"
//                   onClick={() => handleDeleteVideo(video.id)}
//                 >
//                   Delete
//                 </button>
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Modal */}
      {/* {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setShowChatModal(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Chats for: {activeVideo?.title}</h2>
            {chatMessages.length === 0 ? (
              <p className="text-zinc-400">No chats for this video.</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`px-4 py-2 rounded-md ${
                      msg.role === "user"
                        ? "bg-zinc-800 text-right ml-auto"
                        : "bg-zinc-800 text-left mr-auto"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <span className="block text-xs text-zinc-500 mt-1">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                    <PromptSection/>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )} */}

//     </div>
//   );
// }

// export default EachPlaylistVideo;














import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utlis/SupabaseClient";
import { fetchYouTubeMetadata } from "../../utlis/fetchYouTubeMetadata"; 

// comp. for chat functionality in video.
import VideoChat from "./VideoChat"; 

function EachPlaylistVideo() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(null);

// for chat functionality in video, this state and fetchUser useEffect code.
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!error) setUser(user);
      else console.error("Error fetching user:", error);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchplaylist = async () => {
      const { data, error } = await supabase
        .from("playlists")
        .select("id, title, updated_at, videos(id, title, thumbnail, video_url, duration)")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching playlist:", error);
      else {
        setPlaylist(data);
        setVideos(data.videos || []);
      }
      setLoading(false);
    };

    fetchplaylist();
  }, [id]);

  const handleShowChats = async (video) => {
    setActiveVideo(video);
    setShowChatModal(true);
    const { data, error } = await supabase
      .from("chats")
      .select("id, role, message, created_at")
      .eq("video_id", video.id)
      .order("created_at", { ascending: true });

    if (error) console.error("Error fetching chats:", error);
    else setChatMessages(data);
  };

  const handleAddVideo = async () => {
    if (!videoUrl) return;
    setAddLoading(true);

    const metadata = await fetchYouTubeMetadata(videoUrl);
    if (!metadata) {
      alert("Failed to fetch video metadata.");
      setAddLoading(false);
      return;
    };

    const { title, thumbnail, duration } = metadata;

    const { data, error } = await supabase.from("videos").insert({
      title,
      thumbnail,
      duration,
      video_url: videoUrl,
      playlist_id: id,
    }).select().single();  

    if (error) {
      console.error("Error adding video:", error);
      alert("Could not add video.");
    } else {
      setVideos((prev) => [data, ...prev]);
      setVideoUrl("");
    }
    setAddLoading(false);
  };

  const handleDeleteVideo = async (videoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", videoId);

    if (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video.");
    } else {
      setVideos((prev) => prev.filter((v) => v.id !== videoId));
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 h-full text-white bg-black">
      <h1 className="text-3xl font-bold mb-4">{playlist.title}</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Updated {playlist.updated_at ? new Date(playlist.updated_at).toLocaleDateString() : "recently"}
      </p>

      {/* Add video input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Paste YouTube URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded"
        />
        <button
          onClick={handleAddVideo}
          disabled={addLoading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          {addLoading ? "Adding..." : "Add Video"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-zinc-800 rounded-xl overflow-hidden shadow relative">
            <img
              src={video.thumbnail || "https://via.placeholder.com/320x180?text=No+Thumbnail"}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h2 className="text-xl font-bold truncate">{video.title || "Untitled Video"}</h2>
              <p className="text-lg font-semibold text-zinc-400">{video.duration || "Unknown duration"}</p>
              <a
                href={video.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline mr-8"
              >
                Watch on YouTube
              </a>
              <div className="flex justify-between items-center mt-2">
                <button
                  className="block text-md bg-zinc-700 hover:bg-zinc-600 rounded mt-2 px-2"
                  onClick={() => handleShowChats(video)}
                >
                  💬 Chat & Details
                </button>
                <button
                  className="bg-red-600 hover:bg-red-500 rounded px-3 py-1 text-sm"
                  onClick={() => handleDeleteVideo(video.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* replaces the above code with this to get the chat fn in video */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <VideoChat 
            videoId={activeVideo?.id} 
            user={user} 
            onClose={() => setShowChatModal(false)} 
         />
        </div>
      )}


    </div>
  );
}

export default EachPlaylistVideo;