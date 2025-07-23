// import { useState } from "react";
// import { X } from "lucide-react";

// export function ReminderModal({ onClose, onSave }) {
//   const [url, setUrl] = useState("");
//   const [note, setNote] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("09:00");
//   const [timestamps, setTimestamps] = useState([]);
//   const [tempTime, setTempTime] = useState("");
//   const [tempNote, setTempNote] = useState("");

//   const addTimestamp = () => {
//     if (tempTime && tempNote) {
//       setTimestamps([...timestamps, { time: tempTime, note: tempNote }]);
//       setTempTime("");
//       setTempNote("");
//     }
//   };

//   const handleSubmit = () => {
//     if (!url || !note || !date) return;
//     const newReminder = {
//       title: extractTitle(url),
//       note,
//       date,
//       time,
//       url,
//       timestamps,
//       completed: false,
//     };
//     onSave(newReminder);
//     onClose();
//   };

//   const extractTitle = (url) => {
//     try {
//       const id = new URL(url).searchParams.get("v");
//       return id ? `Video - ${id.slice(0, 5)}...` : "New Video";
//     } catch {
//       return "New Video";
//     }
//   };

//   const getRelativeDate = (days) => {
//     const date = new Date();
//     date.setDate(date.getDate() + days);
//     return date.toISOString().split("T")[0];
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//       <div className="bg-green-200 w-full max-w-lg rounded-lg shadow-lg p-6 relative text-black">
//         <button onClick={onClose} className="absolute top-3 right-3 text-black">
//           <X />
//         </button>
//         <h2 className="text-xl font-semibold mb-4">Add Video Reminder</h2>

//         <input
//           className="w-full p-2 border rounded mb-3"
//           placeholder="The URL"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />

//         {/* Timestamps */}
//         <div className="flex gap-2 mb-2">
//           <input
//             type="text"
//             placeholder="00:00"
//             className="w-1/3 p-2 border rounded"
//             value={tempTime}
//             onChange={(e) => setTempTime(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Note for this timestamp..."
//             className="w-2/3 p-2 border rounded"
//             value={tempNote}
//             onChange={(e) => setTempNote(e.target.value)}
//           />
//           <button
//             onClick={addTimestamp}
//             className="px-3 py-1 bg-indigo-600 rounded hover:bg-indigo-700"
//           >
//             +
//           </button>
//         </div>
//         <div className="text-sm mb-3 space-y-1">
//           {timestamps.map((t, i) => (
//             <div key={i}>⏱ {t.time} - {t.note}</div>
//           ))}
//         </div>

//         <textarea
//           rows={3}
//           className="w-full p-2 border rounded mb-3"
//           placeholder="What do you want to be reminded about this video?"
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//         />

//         {/* Quick Buttons */}
//         <div className="flex gap-3 mb-3">
//           <button onClick={() => setDate(new Date().toISOString().split("T")[0])} className="px-3 py-1 border rounded hover:bg-gray-100">
//             Today
//           </button>
//           <button onClick={() => setDate(getRelativeDate(1))} className="px-3 py-1 border rounded hover:bg-gray-100">
//             Tomorrow
//           </button>
//           <button onClick={() => setDate(getRelativeDate(7))} className="px-3 py-1 border rounded hover:bg-gray-100">
//             Next Week
//           </button>
//         </div>

//         <div className="flex gap-3 mb-3">
//           <input
//             type="date"
//             className="p-2 border rounded w-1/2"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//           <input
//             type="time"
//             className="p-2 border rounded w-1/2"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//           />
//         </div>

//         <button
//           className="w-full bg-white py-2 rounded hover:bg-gray-200"
//           onClick={handleSubmit}
//         >
//           Save Reminder
//         </button>
//       </div>
//     </div>
//   );
// }







    //       creating reminder donoot work with this code as no used_id is there.

// import { useState, useEffect } from "react";
// import { supabase } from "../../utlis/SupabaseClient";

// export default function ReminderModal({ onClose, existingReminder }) {
//   const [url, setUrl] = useState("");
//   const [note, setNote] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [timestamps, setTimestamps] = useState([{ time: "", note: "" }]);

//   useEffect(() => {
//     if (existingReminder) {
//       setUrl(existingReminder.url || "");
//       setNote(existingReminder.note || "");
//       setDate(existingReminder.date || "");
//       setTime(existingReminder.time || "");
//       setTimestamps(existingReminder.timestamps?.length > 0 ? existingReminder.timestamps : [{ time: "", note: "" }]);
//     }
//   }, [existingReminder]);

//   const handleSubmit = async () => {
//     if (!url || !note || !date || !time) return alert("All fields required");

//     const reminderData = { url, note, date, time, timestamps };

//     if (existingReminder) {
//       await supabase.from("reminders").update(reminderData).eq("id", existingReminder.id);
//     } else {
//       await supabase.from("reminders").insert(reminderData);
//     }

//     onClose();
//   };

//   const updateTimestamp = (index, key, value) => {
//     setTimestamps((prev) => {
//       const updated = [...prev];
//       updated[index][key] = value;
//       return updated;
//     });
//   };

//   const addTimestamp = () => setTimestamps([...timestamps, { time: "", note: "" }]);
//   const removeTimestamp = (index) => setTimestamps(timestamps.filter((_, i) => i !== index));

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white text-black p-6 rounded-md w-[90%] max-w-xl">
//         <h2 className="text-lg font-bold mb-4">{existingReminder ? "Edit Reminder" : "New Reminder"}</h2>
        
//         <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="YouTube Video URL" className="w-full mb-2 p-2 border rounded" />
//         <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Reminder note" className="w-full mb-2 p-2 border rounded" />
        
//         <div className="flex gap-2 mb-2">
//           <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-1 p-2 border rounded" />
//           <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="flex-1 p-2 border rounded" />
//         </div>

//         <div className="mb-2">
//           <p className="font-medium mb-1">Timestamps:</p>
//           {timestamps.map((ts, idx) => (
//             <div key={idx} className="flex items-center gap-2 mb-2">
//               <input value={ts.time} onChange={(e) => updateTimestamp(idx, "time", e.target.value)} placeholder="Time (e.g. 03:21)" className="p-2 border rounded w-1/3" />
//               <input value={ts.note} onChange={(e) => updateTimestamp(idx, "note", e.target.value)} placeholder="Note" className="p-2 border rounded flex-1" />
//               <button onClick={() => removeTimestamp(idx)} className="text-red-500 text-sm">✕</button>
//             </div>
//           ))}
//           <button onClick={addTimestamp} className="text-blue-600 text-sm hover:underline">+ Add Timestamp</button>
//         </div>

//         <div className="flex justify-end gap-3 mt-4">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
//           <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
//             {existingReminder ? "Update" : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };









import { useState, useEffect } from "react";
import { supabase } from "../../utlis/SupabaseClient";

export default function ReminderModal({ onClose, existingReminder }) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timestamps, setTimestamps] = useState([{ time: "", note: "" }]);

  useEffect(() => {
    if (existingReminder) {
      setUrl(existingReminder.url || "");
      setNote(existingReminder.note || "");
      setDate(existingReminder.date || "");
      setTime(existingReminder.time || "");
      setTimestamps(existingReminder.timestamps?.length > 0 ? existingReminder.timestamps : [{ time: "", note: "" }]);
    }
  }, [existingReminder]);

  const handleSubmit = async () => {
    if (!url || !note || !date || !time) return alert("All fields required");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("User fetch error:", userError.message);
      return;
    }

    const reminderData = {
      url,
      note,
      date,
      time,
      timestamps,
      user_id: user.id,
    };

    if (existingReminder) {
      await supabase.from("reminders").update(reminderData).eq("id", existingReminder.id);
    } else {
      const { error } = await supabase.from("reminders").insert(reminderData);
      if (error) console.error("Insert failed:", error.message);
    }

    onClose();
  };

  const updateTimestamp = (index, key, value) => {
    setTimestamps((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  const addTimestamp = () => setTimestamps([...timestamps, { time: "", note: "" }]);
  const removeTimestamp = (index) => setTimestamps(timestamps.filter((_, i) => i !== index));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2">
      <div className="bg-white text-black p-6 rounded-md w-full max-w-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-bold mb-4">{existingReminder ? "Edit Reminder" : "New Reminder"}</h2>

        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="YouTube Video URL" className="w-full mb-2 p-2 border rounded" />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Reminder note" className="w-full mb-2 p-2 border rounded" />

        <div className="flex flex-col md:flex-row gap-2 mb-2">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div className="mb-2">
          <p className="font-medium mb-1">Timestamps:</p>
          {timestamps.map((ts, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-stretch gap-2 mb-2">
              <input value={ts.time} onChange={(e) => updateTimestamp(idx, "time", e.target.value)} placeholder="Time (e.g. 03:21)" className="p-2 border rounded w-full sm:w-1/3" />
              <input value={ts.note} onChange={(e) => updateTimestamp(idx, "note", e.target.value)} placeholder="Note" className="p-2 border rounded w-full" />
              <button onClick={() => removeTimestamp(idx)} className="text-red-500 text-sm">✕</button>
            </div>
          ))}
          <button onClick={addTimestamp} className="text-blue-600 text-sm hover:underline">+ Add Timestamp</button>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded w-full sm:w-auto">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto">
            {existingReminder ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};