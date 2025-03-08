"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      name: "Home",
      icon: <HiOutlineHome className="text-[28px]" />,
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
      icon: <CircleDollarSign className="text-[28px]" />,
      link: "/budget",
    },
    {
      name: "Expenses",
      icon: <HandCoins className="text-[28px]" />,
      link: "/expenses",
    },
    {
      name: "Investments",
      icon: <Bitcoin className="text-[28px]" />,
      link: "/investment",
    },
    {
      name: "Learn",
      icon: <NotebookText className="text-[28px]" />,
      link: "/learn",
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline className="text-[28px]" />,
      link: "/settings",
    },
  ];

  return (
    <div className="relative p-2 mt-2">
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
            className="rounded-full object-cover w-11 h-11"
          />
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
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

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              onClick={toggleMenu}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

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
