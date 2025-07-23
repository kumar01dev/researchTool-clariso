// component for chat functionality in video dashboard

import { useEffect, useState, useRef } from "react";
import { supabase } from "../../utlis/SupabaseClient";
import PromptSection from "./PromptSection"; // keep using your original

export default function VideoChat({ videoId, user, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing chats
  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase
        .from("chats")
        .select("role, message, created_at")
        .eq("video_id", videoId)
        .order("created_at", { ascending: true });

      if (data && !error) {
        const formatted = data.map((c) => ({
          role: c.role,
          text: c.message,
          created_at: c.created_at,
        }));
        setMessages(formatted);
      } else {
        setMessages([]);
      }

      setLoading(false);
    };

    if (videoId) fetchChats();
  }, [videoId]);

  // Add message and save to Supabase
  const addMessage = async (role, text) => {
    const newMessage = { role, text };
    setMessages((prev) => [...prev, newMessage]);

    if (!user || !videoId) return;

    const { error } = await supabase.from("chats").insert({
      user_id: user.id,
      video_id: videoId,
      role,
      message: text,
    });

    if (error) console.error("Failed to save chat message:", error);
  };

  if (loading) return <div className="text-white p-4">Loading chat...</div>;

  return (
    <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        onClick={onClose}
      >
        ✖
      </button>
      <h2 className="text-xl font-bold mb-4">Chat</h2>

      {/* Chat Messages */}
      <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
        {messages.length === 0 ? (
          <p className="text-zinc-400">No chats for this video.</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 rounded-md text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-zinc-800 text-right ml-auto"
                  : "bg-zinc-800 text-left mr-auto"
              }`}
            >
              {msg.text}
              <div className="text-xs text-zinc-500 mt-1">{new Date(msg.created_at).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>

      {/* PromptSection for new input */}
      <div className="mt-4">
        <PromptSection
          onSend={async (userPrompt, aiResponse) => {
            await addMessage("user", userPrompt);
            await addMessage("ai", aiResponse);
          }}
          videoContext={true}
        />
      </div>
    </div>
  );
};