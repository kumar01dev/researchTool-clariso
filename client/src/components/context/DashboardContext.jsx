import React, { useState, createContext, useContext } from 'react';

export const LayoutContext = createContext();

export const DashboardContext = ({ children }) => {
  const [layout, setLayout] = useState("DashboardHomePage");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  const addMessages = (role, text) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  return (
    <LayoutContext.Provider
      value={{
        layout,
        setLayout,
        messages,
        setMessages,
        showModal,
        setShowModal,
        videoUrl,
        setVideoUrl,
        newPlaylistName,
        setNewPlaylistName,
        selectedPlaylist,
        setSelectedPlaylist,
        addMessages
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within DashboardContext");
  }
  return context;
};