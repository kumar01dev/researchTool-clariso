// import { useRef, useState } from 'react';
// import { ArrowRight, Paperclip } from 'lucide-react';
// import { useLayout } from '../context/DashboardContext';

// export default function PromptSection() {
//   const textareaRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { setLayout, addMessages, messages } = useLayout();

//   // Auto-resize textarea
//   const handleInput = () => {
//     const el = textareaRef.current;
//     el.style.height = 'auto';
//     el.style.height = Math.min(el.scrollHeight, 160) + 'px';
//   };

//   // Handle sending prompt
//   const handleAsk = async () => {
//     if (!prompt.trim()) return;
//     setLoading(true);

//     // addMessages('user', prompt);
//     // setLayout("ai-chat");
//     // setPrompt("");

//           //to check first user prompt appears when aifullchat renders.
//     addMessages('user', prompt);

//     setTimeout(() => {
//       console.log("Messages before switching layout:", messages);
//       setLayout("ai-chat");
//     }, 2000);

//     setPrompt("");

//     try {
//       const res = await fetch("https://qtmefhasvxnihuxineuz.supabase.co/functions/v1/bright-handler", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       addMessages('ai', data.answer || "NO answer");
//       console.log("AI Response:", data); // <-- ADDED  this line for debugging
//     } catch (err) {
//       addMessages('ai', "Error: " + err.message);
//     }
//     setLoading(false);
//   };

//   // Handle file attachment
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     addMessages('user', `📎 Attached file: ${file.name}`);
//     // Optionally, upload the file to your server or Supabase Storage here
//   };

//   return (
//     <div className="w-[95%] max-w-4xl mx-auto p-2 flex flex-col">
//       {/* Scrollable Chat Feed */}
//       {/* <div className="flex-1 overflow-y-auto space-y-4"> */}
//         {/* {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`transition-all duration-200 px-4 py-3 rounded-lg border ${
//               msg.role === 'user'
//                 // ? 'border-[#2f2f2f] bg-[#232323] text-right self-end'
//                 ? 'border-[#2f2f2f] bg-pink-200 text-right self-end'
//                 : 'border-[#333] bg-zinc-500 text-left self-start'
//             }`}
//           > */}
//             {/* <strong className="inline-block mb-1 text-sm text-gray-400">
//               {msg.role === 'user' ? 'You' : 'AI'}
//             </strong>
//             <p className="text-white bg-yellow-200 whitespace-pre-wrap">{msg.text}</p> */}
//           {/* </div> */}
//           {/* ))} */}

//         {loading && (
//           <div className="px-4 py-3 rounded-lg border border-[#333] bg-[#1b1b1b] text-left self-start">
//             {/* <strong className="block mb-1 text-sm text-gray-400">AI</strong> */}
//             <p className="italic text-gray-400">Thinking...</p>
//           </div>
//         )}
//       {/* </div> */}

//       {/* Fixed Prompt Box at Bottom */}
//       <div className="sticky bottom-0 bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] shadow-md px-4 py-3 z-10">
//         <textarea
//           ref={textareaRef}
//           value={prompt}
//           onChange={e => setPrompt(e.target.value)}
//           placeholder="Ask about something ... "
//           onInput={handleInput}
//           onKeyDown={e => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleAsk();
//             }
//           }}
//           className="w-[80%] resize-none bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none text-base"
//           style={{ maxHeight: '160px' }}
//           rows={3}
//         />

//         {/* Toolbar */}
//         <div className="flex justify-between items-baseline mt-2">
//           {/* Paperclip triggers file input */}
//           <Paperclip
//             size={22}
//             className="cursor-pointer"
//             onClick={() => fileInputRef.current.click()}
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           <ArrowRight
//             size={29}
//             className="cursor-pointer bg-zinc-700 p-1 rounded-md"
//             onClick={handleAsk}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }











    // this code gives 1st user prompt and then fetches previous chats for that videoId

// import { useRef, useState } from 'react';
// import { ArrowRight, Paperclip } from 'lucide-react';
// import { useLayout } from '../context/DashboardContext';

// export default function PromptSection() {
//   const textareaRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { setLayout, addMessages, messages } = useLayout();

//   // Auto-resize textarea
//   const handleInput = () => {
//     const el = textareaRef.current;
//     el.style.height = 'auto';
//     el.style.height = Math.min(el.scrollHeight, 160) + 'px';
//   };

//   // Handle sending prompt
//   const handleAsk = async () => {
//     if (!prompt.trim()) return;
    
//     const currentPrompt = prompt.trim();
//     setLoading(true);
//     setPrompt(""); // Clear input immediately

//     // Add user message first
//     addMessages('user', currentPrompt);
    
//     // Switch layout immediately after adding message
//     setLayout("ai-chat");

//     try {
//       const res = await fetch("https://qtmefhasvxnihuxineuz.supabase.co/functions/v1/bright-handler", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: currentPrompt }),
//       });
//       const data = await res.json();
//       addMessages('ai', data.answer || "NO answer");
//       console.log("AI Response:", data);
//     } catch (err) {
//       addMessages('ai', "Error: " + err.message);
//       console.error("API Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle file attachment
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     addMessages('user', `📎 Attached file: ${file.name}`);
//   };

//   return (
//     <div className="w-[95%] max-w-4xl mx-auto p-2 flex flex-col">
//       {/* Show loading state when processing */}
//       {loading && (
//         <div className="px-4 py-3 rounded-lg border border-[#333] bg-[#1b1b1b] text-left mb-4">
//           <p className="italic text-gray-400">Thinking...</p>
//         </div>
//       )}

//       {/* Fixed Prompt Box at Bottom */}
//       <div className="sticky bottom-0 bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] shadow-md px-4 py-3 z-10">
//         <textarea
//           ref={textareaRef}
//           value={prompt}
//           onChange={e => setPrompt(e.target.value)}
//           placeholder="Ask about something ... "
//           onInput={handleInput}
//           onKeyDown={e => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleAsk();
//             }
//           }}
//           className="w-[80%] resize-none bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none text-base"
//           style={{ maxHeight: '160px' }}
//           rows={3}
//           disabled={loading}
//         />

//         {/* Toolbar */}
//         <div className="flex justify-between items-baseline mt-2">
//           {/* Paperclip triggers file input */}
//           <Paperclip
//             size={22}
//             className={`cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             onClick={() => !loading && fileInputRef.current.click()}
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             onChange={handleFileChange}
//             disabled={loading}
//           />
//           <ArrowRight
//             size={29}
//             className={`cursor-pointer p-1 rounded-md ${
//               loading || !prompt.trim() 
//                 ? 'bg-zinc-800 opacity-50 cursor-not-allowed' 
//                 : 'bg-zinc-700 hover:bg-zinc-600'
//             }`}
//             onClick={() => !loading && handleAsk()}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };








      // to add chat fn. in videos.
import { useRef, useState } from 'react';
import { ArrowRight, Paperclip } from 'lucide-react';
import { useLayout } from '../context/DashboardContext';

export default function PromptSection({ onSend, videoContext = false }) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const { setLayout, addMessages, messages } = useLayout();

  // Auto-resize textarea
    const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    const currentPrompt = prompt.trim();

    setLoading(true);
    setPrompt("");
    addMessages?.("user", currentPrompt); // use context fallback
    setLayout?.("ai-chat");

    try {
      const res = await fetch("https://qtmefhasvxnihuxineuz.supabase.co/functions/v1/bright-handler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      const data = await res.json();
      const aiReply = data.answer || "No answer";

      addMessages?.("ai", aiReply);

        // 🔥 Call external onSend (used in VideoChat)
      if (onSend && videoContext) {
        await onSend(currentPrompt, aiReply);
      }
    } catch (err) {
      const errMsg = "Error: " + err.message;
      addMessages?.("ai", errMsg);
      if (onSend && videoContext) {
        await onSend(currentPrompt, errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle file attachment
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    addMessages('user', `📎 Attached file: ${file.name}`);
  };

  return (
    <div className="w-[95%] max-w-4xl mx-auto p-2 flex flex-col custom-scrollbar">
      {/* Show loading state when processing */}
      {loading && (
        <div className="px-4 py-3 rounded-lg border border-[#333] bg-[#1b1b1b] text-left mb-4">
          <p className="italic text-gray-400">Thinking...</p>
        </div>
      )}

      {/* Fixed Prompt Box at Bottom */}
      <div className="sticky bottom-0 bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] shadow-md px-4 py-3 z-10">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Ask about something ... "
          onInput={handleInput}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAsk();
            }
          }}
          className="w-[80%] resize-none bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none text-base"
          style={{ maxHeight: '160px' }}
          rows={3}
          disabled={loading}
        />

        {/* Toolbar */}
        <div className="flex justify-between items-baseline mt-2">
          {/* Paperclip triggers file input */}
          <Paperclip
            size={22}
            className={`cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !loading && fileInputRef.current.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
          <ArrowRight
            size={29}
            className={`cursor-pointer p-1 rounded-md ${
              loading || !prompt.trim() 
                ? 'bg-zinc-800 opacity-50 cursor-not-allowed' 
                : 'bg-zinc-700 hover:bg-zinc-600'
            }`}
            onClick={() => !loading && handleAsk()}
          />
        </div>
      </div>
    </div>
  );
};