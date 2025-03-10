import { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import all components directly (no lazy loading)
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
  const { isLoggedin } = useContext(AppContext);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div>
      {/* Show Mobile Menu for small screens */}
      {isMobile ? (
        <>
          <MobileMenu />
          <Routes>
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