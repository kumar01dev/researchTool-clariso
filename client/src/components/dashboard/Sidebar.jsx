import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBook, FaBell, FaUserCog, FaCog, FaTrash, FaFolder, FaPen, FaCloudUploadAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";


const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: <FaHome />, label: "Home" },
    { to: "/dashboard/library", icon: <FaBook />, label: "Library" },
    { to: "/dashboard/reminders", icon: <FaBell />, label: "Reminders" },
    { to: "/logout", icon: <IoLogOut />, label: "Logout" },
    // { icon: <FaUserCog />, label: "Account" },
    // { icon: <FaCog />, label: "Settings" },
    // { icon: <FaTrash />, label: "Trash" },
  ];

  const activeClass = (path) =>
    location.pathname === path ? "text-white font-bold" : "text-gray-300";

  return (
    <div
      className={`h-full bg-zinc-800 fixed top-0 left-0 z-50 shadow-lg transition-all duration-300 flex flex-col justify-between
        ${isSidebarOpen
        ? "w-[9.6rem] lg:w-[14.4rem]"  
        : "w-[3.2rem]"            
        }
      `}
    >
      <div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          // className="absolute top-4 left-3 bg-zinc-800 rounded-full p-1 z-50 "
          className={`absolute top-4 ${isSidebarOpen ? "right-3" : "left-3"} bg-zinc-800 rounded-full p-1 z-50`}
        >
          {isSidebarOpen ? (
            <MdKeyboardDoubleArrowLeft className="text-white text-xl " />
          ) : (
            <MdKeyboardDoubleArrowRight className="text-white text-xl " />
          )}
        </button>

        {/* Nav Items */}
        <nav className="mt-14 px-2 space-y-2">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.to ? (
                <Link
                  to={item.to}
                  className={`flex items-center gap-4 px-2 py-2 rounded hover:bg-zinc-700 transition-all ${activeClass(item.to)}`}
                >
                  {item.icon}
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              ) : (
                <div className="text-gray-300 px-2 py-2">
                  <div className="flex items-center gap-4">
                    {item.icon}
                    {isSidebarOpen && <span>{item.label}</span>}
                  </div>
                  {isSidebarOpen && item.children && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer">
                          {child.icon}
                          <span>{child.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;