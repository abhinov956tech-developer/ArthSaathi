import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import MobileMenu from "./components/mobileMenu/MobileMenu";

// Import all components directly (no lazy loading)
import Home from "./pages/Home";
import AddAccounts from "./pages/Accounts/AddAccounts";
import AllAccounts from "./pages/Accounts/AllAccounts";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";
import Learn from "./pages/Learn";
import Investment from "./pages/Investment";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initial check for mobile screen

  // Hook to handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update state on resize
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div>
      {/* Show Mobile Menu for small screens */}
      {isMobile ? (
        <>
          <MobileMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/add-new-account" element={<AddAccounts />} />
            <Route path="/all-accounts" element={<AllAccounts />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </>
      ) : (
        <div className="min-h-screen flex bg-white lg:bg-[#F3F3F3]">
          {/* Sidebar for larger screens */}
          <Sidebar
            isExpanded={isSidebarExpanded}
            toggleSidebar={toggleSidebar}
          />
          {/* Main content area */}
          <div
            className={`flex flex-1 ${
              isSidebarExpanded ? "ml-[270px]" : "ml-24"
            } lg:bg-[#F3F3F3] bg-white transition-all duration-300`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/add-new-account" element={<AddAccounts />} />
              <Route path="/all-accounts" element={<AllAccounts />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
