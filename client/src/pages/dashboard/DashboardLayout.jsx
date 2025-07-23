import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex " >
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main
        className={`min-h-screen transition-all duration-300 ease-in-out
          ${isSidebarOpen
          ? "ml-[9.6rem] lg:ml-[14.4rem] w-[calc(100%-9.6rem)] lg:w-[calc(100%-14.4rem)]"
          : "ml-[3.2rem] w-[calc(100%-3.2rem)]"
          }
        `}
      >
        <Outlet />
      </main>
      
    </div>
  );
}