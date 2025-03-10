import { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import all components
import Home from "./pages/Home";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";
import Learn from "./pages/Learn";
import Investment from "./pages/Investment";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";

// Settings Pages
import AccountSettings from "./pages/settings/AccountSettings";
import NotificationsSettings from "./pages/settings/NotificationsSettings";
import PrivacySecuritySettings from "./pages/settings/PrivacySecuritySettings";
import HelpandSupportSettings from "./pages/settings/HelpandSupportSettings";

// Auth Pages
import Login from "./landing/Login";
import VerifyEmail from "./landing/VerifyEmail";
import ResetPassword from "./landing/ResetPassword";
import HomeLand from "./landing/Home";

const App = () => {
  const { isLoggedin } = useContext(AppContext);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen flex bg-white lg:bg-[#F3F3F3]">
      {isLoggedin && <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} />}

      <div className={`flex ${isLoggedin ? (isSidebarExpanded ? "ml-[270px]" : "ml-24") : "ml-0"} lg:bg-[#F3F3F3] bg-white transition-all duration-300`}>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={<HomeLand />} />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/accounts" element={<ProtectedRoute element={<Accounts />} />} />
          <Route path="/budget" element={<ProtectedRoute element={<Budget />} />} />
          <Route path="/expenses" element={<ProtectedRoute element={<Expenses />} />} />
          <Route path="/learn" element={<ProtectedRoute element={<Learn />} />} />
          <Route path="/investment" element={<ProtectedRoute element={<Investment />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/settings-account" element={<ProtectedRoute element={<AccountSettings />} />} />
          <Route path="/settings-notification" element={<ProtectedRoute element={<NotificationsSettings />} />} />
          <Route path="/settings-privacy" element={<ProtectedRoute element={<PrivacySecuritySettings />} />} />
          <Route path="/settings-help" element={<ProtectedRoute element={<HelpandSupportSettings />} />} />

          {/* Redirect all unknown routes */}
          <Route path="*" element={<Navigate to={isLoggedin ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;