import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import MobileMenu from "./components/mobileMenu/MobileMenu";

// Import all components directly (no lazy loading)
import Landingpage from "./pages/Landingpage";
import Home from "./pages/Home";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";
import Learn from "./pages/Learn";
import Investment from "./pages/Investment";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
// Settings Pages
import AccountSettings from './pages/settings/AccountSettings';
import NotificationsSettings from './pages/settings/NotificationsSettings';
import PrivacySecuritySettings from './pages/settings/PrivacySecuritySettings';
import HelpandSupportSettings from './pages/settings/HelpandSupportSettings';


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
          <Route path="/landingpage" element={<Landingpage />} />
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/settings" element={<Settings />} />
            {/* Settings Sub-Routes */}
            <Route path="/settings-account" element={<AccountSettings />} />
            <Route path="/settings-notification" element={<NotificationsSettings />} />
            <Route path="/settings-privacy" element={<PrivacySecuritySettings />} />
            <Route path="/settings-help" element={<HelpandSupportSettings />} />
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
            className={`flex ${
              isSidebarExpanded ? "ml-[270px]" : "ml-24"
            } lg:bg-[#F3F3F3] bg-white transition-all duration-300`}
          >
            <Routes>
            <Route path="/landingpage" element={<Landingpage />} />
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/settings" element={<Settings />} />
              {/* Settings Sub-Routes */}
            <Route path="/settings-account" element={<AccountSettings />} />
            <Route path="/settings-notification" element={<NotificationsSettings />} />
            <Route path="/settings-privacy" element={<PrivacySecuritySettings />} />
            <Route path="/settings-help" element={<HelpandSupportSettings />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
