import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi2";
import { IoIosSearch, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Bitcoin, CircleArrowLeft, CircleArrowRight, CircleDollarSign, CircleUserRound, HandCoins, LogOut, NotebookText } from "lucide-react";

const Sidebar = ({ isExpanded, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSubmenu = (menuName) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  const menuItems = [
    {
      name: "Home",
      icon: (
        <span className="text-[28px]">
          <HiOutlineHome />
        </span>
      ),
      link: "/",
    },
    {
      name: "Accounts",
      icon: (
      <span className="text-[28px]">
        <CircleUserRound />
      </span>
      ),
      link: "/accounts",
    },
    {
        name: "Budget",
        icon: (
          <span className="text-[28px]">
            <CircleDollarSign />
          </span>
        ),
        link: "/budget",
      },
      {
        name: "Expenses",
        icon: (
          <span className="text-[28px]">
            <HandCoins />
          </span>
        ),
        link: "/expenses",
      },
      {
        name: "Investments",
        icon: (
          <span className="text-[28px]">
            <Bitcoin />
          </span>
        ),
        link: "/investment",
      },
      {
        name: "Learn",
        icon: (
          <span className="text-[28px]">
            <NotebookText />
          </span>
        ),
        link: "/learn",
      },
    {
      name: "Settings",
      icon: (
        <span className="text-[28px]">
          <IoSettingsOutline />
        </span>
      ),
      link: "/settings",
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`fixed rounded-md h-full bg-white shadow-lg ${
        isExpanded ? "w-64" : "w-20"
      } flex flex-col justify-between transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div
        className={`px-4 flex items-center mt-4 ${
          isExpanded ? "justify-start ml-2" : "justify-center"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-black transition-colors"
        >
          {isExpanded ? (
            <span className="text-[20px]">
              <CircleArrowLeft />
            </span>
          ) : (
            <span className="text-[20px]">
              <CircleArrowRight />
            </span>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center mt-5">
        <div className="flex items-center space-x-4">
          <img
            src="https://image.lexica.art/full_webp/0141d1f8-c79e-45da-8644-08f40a167e2f"
            alt="User Avatar"
            className={`rounded-full object-cover ${
              isExpanded ? "w-11 h-11" : "w-11 h-11"
            }`}
          />
          {isExpanded && (
            <div className="flex flex-row items-center">
              <span className="flex flex-col">
                <h3 className="text-[16px] font-semibold">Deepmoina</h3>
                <p className="text-[12px] text-gray-600">deepmoina34@gmail.com</p>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-center mt-3">
        {isExpanded ? (
          <div className="flex items-center border w-56 h-9 border-slate-300 rounded-md">
            <IoIosSearch className="text-gray-500 text-[24px] ml-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 bg-transparent text-black placeholder-gray-400 focus:outline-none w-full"
            />
          </div>
        ) : (
          <button className="p-2 rounded-md hover:bg-[#F3F3F3] text-[28px] justify-center">
            <IoIosSearch className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Menu */}
      <div className="flex-grow overflow-auto mt-3 justify-center">
        <div
          className={`space-y-2 px-4 ${
            !isExpanded && "items-center flex flex-col justify-center w-auto"
          }`}
        >
          {filteredMenuItems.map((item) => {
            const isActiveParent =
              location.pathname === item.link ||
              (item.hasSubmenu &&
                item.submenuItems.some(
                  (subItem) => location.pathname === subItem.link
                ));

            return (
              <div key={item.name} className="relative">
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => navigate(item.link)}
                      className={`flex items-center w-full px-4 py-2 rounded ${
                        isActiveParent
                          ? "bg-[#F3F3F3] font-semibold"
                          : "hover:bg-[#F3F3F3]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[28px]">{item.icon}</span>
                        {isExpanded && <span>{item.name}</span>}
                      </span>
                      {isExpanded && (
                        <span
                        className="ml-16"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubmenu(item.name);
                          }}
                        >
                          {activeSubmenu === item.name ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </span>
                      )}
                    </button>

                    {/* Submenu */}
                  
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    className={`flex items-center gap-2 px-4 py-2 rounded ${
                      location.pathname === item.link
                        ? "bg-[#F3F3F3] font-semibold"
                        : "hover:bg-[#F3F3F3]"
                    }`}
                  >
                    {item.icon}
                    {isExpanded && item.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-2">
        <div className="flex items-end justify-center pb-4 border-t">
          <div className="flex items-center space-x-4 flex-row mt-2 justify-center">
          <LogOut />
            {isExpanded && (
              <footer className="flex flex-row gap-2">
                <span>
                  <button className="text-black font-semibold">Logout</button>
                </span>
              </footer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;