// import { useState } from "react";
// import { ReminderModal } from "./ReminderModal";


// export default function Reminders() {
//   const [reminders, setReminders] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("pending");

//   const handleAddReminder = (reminder) => {
//     setReminders((prev) => [...prev, reminder]);
//   };

//   const toggleComplete = (index) => {
//     const updated = [...reminders];
//     updated[index].completed = !updated[index].completed;
//     setReminders(updated);
//   };

//   const getDateTime = (date, time) => new Date(`${date}T${time}`);

//   const now = new Date();

//   const filteredReminders = reminders.filter((r) => {
//     const reminderDateTime = getDateTime(r.date, r.time);
//     if (activeTab === "pending") return !r.completed;
//     if (activeTab === "completed") return r.completed;
//     if (activeTab === "upcoming") return !r.completed && reminderDateTime > now;
//     return true;
//   });

//   return (
//     // <div className="p-6 max-w-5xl mx-auto">
//     <div className="p-4 sm:p-6 w-full max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto overflow-x-auto">
//       {/* Header */}
//       <div className="flex flex-col justify-center items-center mb-6">
//         {/* <h1 className="text-3xl font-semibold text-[#1e1e1e]">Video Reminders</h1> */}
//         <button
//           className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800"
//           onClick={() => setShowModal(true)}
//         >
//           Add Reminder
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         {["pending", "completed", "upcoming"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`capitalize px-4 py-2 rounded ${
//               activeTab === tab
//                 ? "bg-black text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Reminder List */}
//       {filteredReminders.length === 0 ? (
//         <div className="text-gray-600 text-sm p-6 border border-dashed border-gray-300 rounded-xl text-center">
//           No {activeTab} reminders. Please add one!
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {filteredReminders.map((r, i) => (
//             <div key={i} className="p-4 bg-white border rounded-xl shadow-sm">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold">
//                   {r.title}
//                   {!r.completed && (
//                     <span className="text-sm text-blue-600 ml-2">Upcoming</span>
//                   )}
//                 </h3>
//                 <label className="flex items-center gap-2 text-sm text-gray-700">
//                   <input
//                     type="checkbox"
//                     checked={r.completed}
//                     onChange={() => toggleComplete(reminders.indexOf(r))}
//                   />
//                   Mark Complete
//                 </label>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">{r.note}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 📅 {r.date} at {r.time}
//               </p>
//               <div className="mt-2 space-y-1">
//                 {r.timestamps.map((t, idx) => (
//                   <div key={idx} className="text-sm text-blue-700 underline">
//                     ⏱ {t.time} - {t.note}
//                   </div>
//                 ))}
//               </div>
//               <a
//                 href={r.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block mt-2 text-sm text-blue-500 underline"
//               >
//                 {r.url}
//               </a>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <ReminderModal onClose={() => setShowModal(false)} onSave={handleAddReminder} />
//       )}
//     </div>
//   );
// }








  //      creating reminder donoot work with this code as no user_id is there.

// import { useEffect, useState } from "react";
// import ReminderModal from "./ReminderModal";
// import { fetchYouTubeMetadata } from "../../utlis/fetchYouTubeMetadata";
// import { supabase } from "../../utlis/SupabaseClient.js";

// export default function Reminders() {
//   const [reminders, setReminders] = useState([]);
//   const [activeTab, setActiveTab] = useState("pending");
//   const [showModal, setShowModal] = useState(false);
//   const [editingReminder, setEditingReminder] = useState(null);
//   const [videoMetaMap, setVideoMetaMap] = useState({});

//   useEffect(() => {
//     fetchReminders();
//   }, []);

//   useEffect(() => {
//     const loadMetadata = async () => {
//       const meta = {};
//       for (const reminder of reminders) {
//         if (reminder.url && !videoMetaMap[reminder.url]) {
//           const data = await fetchYouTubeMetadata(reminder.url);
//           if (data) meta[reminder.url] = data;
//         }
//       }
//       setVideoMetaMap((prev) => ({ ...prev, ...meta }));
//     };

//     if (reminders.length > 0) loadMetadata();
//   }, [reminders]);

//   const fetchReminders = async () => {
//     const { data, error } = await supabase.from("reminders").select("*");
//     if (error) console.error("Error fetching reminders:", error.message);
//     else setReminders(data);
//   };

//   const updateCompletion = async (id, completed) => {
//     await supabase.from("reminders").update({ completed }).eq("id", id);
//     fetchReminders();
//   };

//   const deleteReminder = async (id) => {
//     await supabase.from("reminders").delete().eq("id", id);
//     fetchReminders();
//   };

//   const filteredReminders = reminders
//     .filter((r) => (activeTab === "pending" ? !r.completed : r.completed))
//     .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

//   return (
//     <div className="p-5 bg-black text-white min-h-screen">
//       <div className="flex justify-between my-5">
//         <div className="space-x-2">
//           <button
//             onClick={() => setActiveTab("pending")}
//             className={`px-4 py-2 rounded ${activeTab === "pending" ? "bg-blue-600" : "bg-gray-300 text-black"}`}
//           >
//             Pending
//           </button>
//           <button
//             onClick={() => setActiveTab("completed")}
//             className={`px-4 py-2 rounded ${activeTab === "completed" ? "bg-blue-600" : "bg-gray-300 text-black"}`}
//           >
//             Completed
//           </button>
//         </div>
//         <button
//           onClick={() => {
//             setEditingReminder(null);
//             setShowModal(true);
//           }}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           + Add Reminder
//         </button>
//       </div>

//       {filteredReminders.length === 0 ? (
//         <p className="text-gray-400">No reminders available.</p>
//       ) : (
//         filteredReminders.map((reminder) => {
//           const meta = videoMetaMap[reminder.url] || {};
//           return (
//             <div key={reminder.id} className="bg-white text-black rounded-lg p-2 mb-7 shadow flex gap-4 items-start">
//               {meta.thumbnail ? (
//                 <img src={meta.thumbnail} alt="thumbnail" className="w-40 h-48 object-cover rounded-md" />
//               ) : (
//                 <div className="w-32 h-20 bg-gray-300 rounded-md flex items-center justify-center text-xs">Loading...</div>
//               )}

//               <div className="flex-1">
//                 <div className="font-semibold text-lg">{meta.title || "Loading..."}</div>
//                 <div className="text-sm font-semibold text-gray-600">
//                   {meta.duration ? `Total Duration: ${meta.duration}` : ""}
//                 </div>

//                 <p className="mt-1 text-md text-gray-800">{reminder.note}</p>

//                 {reminder.timestamps?.length > 0 && (
//                   <ul className="mt-2 text-xs text-gray-600 list-disc ml-5 space-y-1">
//                     {reminder.timestamps.map((t, idx) => (
//                       <li key={idx}>⏱ {t.time} — {t.note}</li>
//                     ))}
//                   </ul>
//                 )}

//                 <div className="text-sm text-gray-500 mt-2">
//                   Scheduled: {reminder.date} at {reminder.time}
//                 </div>

//                 {reminder.url && (
//                   <a href={reminder.url} target="_blank" rel="noreferrer" className="inline-block mt-2 text-blue-600 hover:underline text-sm">
//                     ⏯ Watch on YouTube
//                   </a>
//                 )}

//                 <div className="mt-3 flex gap-3 text-sm">
//                   <button
//                     onClick={() => updateCompletion(reminder.id, !reminder.completed)}
//                     className={`hover:underline ${reminder.completed ? "text-yellow-600" : "text-green-600"}`}
//                   >
//                     {reminder.completed ? "Mark Incomplete" : "Mark Done"}
//                   </button>
//                   <button
//                     onClick={() => {
//                       setEditingReminder(reminder);
//                       setShowModal(true);
//                     }}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button onClick={() => deleteReminder(reminder.id)} className="text-red-600 hover:underline">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       )}

//       {showModal && (
//         <ReminderModal
//           key={editingReminder?.id || "new"}
//           onClose={() => {
//             setShowModal(false);
//             setEditingReminder(null);
//             fetchReminders();
//           }}
//           existingReminder={editingReminder}
//         />
//       )}
//     </div>
//   );
// };








import { useEffect, useState } from "react";
import ReminderModal from "./ReminderModal";
import { fetchYouTubeMetadata } from "../../utlis/fetchYouTubeMetadata";
import { supabase } from "../../utlis/SupabaseClient.js";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [showModal, setShowModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [videoMetaMap, setVideoMetaMap] = useState({});

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    const loadMetadata = async () => {
      const meta = {};
      for (const reminder of reminders) {
        if (reminder.url && !videoMetaMap[reminder.url]) {
          const data = await fetchYouTubeMetadata(reminder.url);
          if (data) meta[reminder.url] = data;
        }
      }
      setVideoMetaMap((prev) => ({ ...prev, ...meta }));
    };

    if (reminders.length > 0) loadMetadata();
  }, [reminders]);

  const fetchReminders = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("User fetch error:", userError.message);
      return;
    }

    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .eq("user_id", user.id);

    if (error) console.error("Error fetching reminders:", error.message);
    else setReminders(data);
  };

  const updateCompletion = async (id, completed) => {
    await supabase.from("reminders").update({ completed }).eq("id", id);
    fetchReminders();
  };

  const deleteReminder = async (id) => {
    await supabase.from("reminders").delete().eq("id", id);
    fetchReminders();
  };

  const filteredReminders = reminders
    .filter((r) => (activeTab === "pending" ? !r.completed : r.completed))
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  return (
    <div className="p-4 sm:p-6 bg-black text-white min-h-screen">
      {/* Header Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4 my-5">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-2 py-2 rounded ${activeTab === "pending" ? "bg-blue-600" : "bg-gray-300 text-black"}`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-2 py-2 rounded ${activeTab === "completed" ? "bg-blue-600" : "bg-gray-300 text-black"}`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => {
            setEditingReminder(null);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Reminder
        </button>
      </div>

      {/* Reminders List */}
      {filteredReminders.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No reminders available.</p>
      ) : (
        filteredReminders.map((reminder) => {
          const meta = videoMetaMap[reminder.url] || {};

          return (
            <div
              key={reminder.id}
              className="bg-zinc-300 text-black rounded-lg p-3 mb-5 shadow flex flex-col sm:flex-row gap-4 items-start"
            >
              {/* Thumbnail */}
              {meta.thumbnail ? (
                <img
                  src={meta.thumbnail}
                  alt="thumbnail"
                  className="w-full sm:w-48 h-40 object-cover rounded-md"
                />
              ) : (
                <div className="w-full sm:w-48 h-40 bg-gray-300 rounded-md flex items-center justify-center text-xs">
                  Loading...
                </div>
              )}

              {/* Content */}
              <div className="flex-1 w-full space-y-2">
                <div className="font-semibold text-lg">{meta.title || "Loading..."}</div>

                {meta.duration && (
                  <div className="text-sm font-semibold text-gray-800">
                    Total Duration: {meta.duration}
                  </div>
                )}

                {reminder.note && (
                  <p className="text-md text-gray-800">{reminder.note}</p>
                )}

                {reminder.timestamps?.length > 0 && (
                  <ul className="text-xs text-gray-700 list-disc ml-5 space-y-1">
                    {reminder.timestamps.map((t, idx) => (
                      <li key={idx}>⏱ {t.time} — {t.note}</li>
                    ))}
                  </ul>
                )}

                <div className="text-sm text-gray-500">
                  Scheduled: {reminder.date} at {reminder.time}
                </div>

                {reminder.url && (
                  <a
                    href={reminder.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-1 text-blue-600 hover:underline text-sm"
                  >
                    ⏯ Watch on YouTube
                  </a>
                )}

                {/* Action Buttons */}
                <div className="mt-2 flex flex-wrap gap-4 text-sm">
                  <button
                    onClick={() => updateCompletion(reminder.id, !reminder.completed)}
                    className={`hover:underline ${reminder.completed ? "text-yellow-600" : "text-green-600"}`}
                  >
                    {reminder.completed ? "Mark Incomplete" : "Mark Done"}
                  </button>
                  <button
                    onClick={() => {
                      setEditingReminder(reminder);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Modal */}
      {showModal && (
        <ReminderModal
          key={editingReminder?.id || "new"}
          onClose={() => {
            setShowModal(false);
            setEditingReminder(null);
            fetchReminders();
          }}
          existingReminder={editingReminder}
        />
      )}
    </div>
  );
};