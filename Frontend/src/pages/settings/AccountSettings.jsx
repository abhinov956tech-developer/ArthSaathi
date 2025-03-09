import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsUpload, BsCheckCircle } from "react-icons/bs";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import ImageUpload from "../../components/pop-up/ImageUpload";
import ChangePassword from "../../components/pop-up/ChangePassword";
import DeleteAccountConfirmation from "../../components/DeleteAccountConfirmation";

const AccountSettings = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    region: "",
  });
  
  // State for UI controls
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) throw new Error('Failed to fetch user data');
        
        const userData = await response.json();
        setFormData({
          fullName: userData.fullName || '',
          email: userData.email || '',
          region: userData.region || '',
        });
        
        if (userData.profilePicture) {
          setPreviewUrl(userData.profilePicture);
        }
      } catch (error) {
        toast.error('Failed to load user data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setIsSaved(false);
  };

  // Handle profile picture upload
  const handleProfilePictureUpdate = (imageUrl) => {
    setProfilePicture(imageUrl);
    setPreviewUrl(imageUrl);
    setIsImagePopupOpen(false);
    setIsSaved(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profilePicture: profilePicture || previewUrl,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      
      toast.success('Profile updated successfully');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Region options
  const regionOptions = [
    { value: "", label: "Select region" },
    { value: "america", label: "America (UTC-5)" },
    { value: "europe", label: "Europe (UTC+1)" },
    { value: "asia", label: "Asia (UTC+8)" },
    { value: "australia", label: "Australia (UTC+10)" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SettingsSidebar />
      
      <div className="flex-1 p-8 md:ml-64">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your account details, profile picture, and security settings.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label htmlFor="fullName" className="w-[150px] text-gray-700 font-medium">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label htmlFor="email" className="w-[150px] text-gray-700 font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Region/Timezone */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label htmlFor="region" className="w-[150px] text-gray-700 font-medium">
                  Region
                </label>
                <select
                  id="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {regionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Profile Picture */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="w-[150px] text-gray-700 font-medium">Profile Picture</label>
                <div className="flex items-center gap-4">
                  {previewUrl ? (
                    <div className="relative">
                      <img 
                        src={previewUrl} 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" 
                      />
                      <button
                        type="button"
                        onClick={() => setIsImagePopupOpen(true)}
                        className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full text-xs"
                        title="Change picture"
                      >
                        <BsUpload size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsImagePopupOpen(true)}
                      className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                      <BsUpload size={24} className="text-gray-500" />
                    </button>
                  )}
                  <span className="text-sm text-gray-500">
                    Upload a square image for best results
                  </span>
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="w-[150px] text-gray-700 font-medium">Password</label>
                <button
                  type="button"
                  onClick={() => setIsPasswordPopupOpen(true)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Change Password
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 pt-4 border-t">
                <div className="w-[150px]"></div>
                <div className="flex flex-col md:flex-row gap-4 w-full md:justify-between">
                  <button
                    type="button"
                    onClick={() => setIsDeletePopupOpen(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete Account
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? "Saving..." : isSaved ? (
                      <>
                        <BsCheckCircle /> Saved
                      </>
                    ) : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popups */}
      {isImagePopupOpen && (
        <ImageUpload 
          closeModal={() => setIsImagePopupOpen(false)} 
          setProfilePicture={handleProfilePictureUpdate} 
        />
      )}
      
      {isPasswordPopupOpen && (
        <ChangePassword 
          closeModal={() => setIsPasswordPopupOpen(false)} 
        />
      )}
      
      {isDeletePopupOpen && (
        <DeleteAccountConfirmation 
          closeModal={() => setIsDeletePopupOpen(false)} 
        />
      )}
    </div>
  );
};

export default AccountSettings;