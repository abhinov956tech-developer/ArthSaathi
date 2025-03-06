import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiStickyNote } from "react-icons/ci";
import { Bitcoin, CircleDollarSign, CircleUserRound, HandCoins, NotebookText } from "lucide-react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

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
      icon: <CircleUserRound />,
      link: "/accounts",
      hasSubmenu: true,
      submenuItems: [
        { name: "All Accounts", link: "/all-account", icon: <CiStickyNote /> },
        {
          name: "Add New Account",
          link: "/add-new-account",
          icon: <AiOutlinePlus className="text-blue-600" />,
          textClass: "text-blue-600",
        },
      ],
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

  return (
    <div className="relative p-2 mt-2">
      {/* Toggle button */}
      <div className="flex flex-row justify-between items-center">
        <button
          onClick={toggleMenu}
          className="text-2xl p-2 text-gray-800 rounded-md lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        <div className="flex items-center space-x-4">
          <img
            src="https://image.lexica.art/full_webp/0141d1f8-c79e-45da-8644-08f40a167e2f"
            alt="User Avatar"
            className="rounded-full object-cover w-11 h-11" // Corrected class name
          />
        </div>
      </div>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Search Bar */}
        <div className="px-4 py-3 mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
            <IoIosSearch className="absolute top-2.5 left-3 text-gray-500 text-xl" />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              onClick={toggleMenu} // Close menu on navigation
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}
    </div>
  );
};

export default MobileMenu;
