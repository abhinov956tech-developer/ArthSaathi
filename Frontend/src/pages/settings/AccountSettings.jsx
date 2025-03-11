import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsUpload, BsCheckCircle } from "react-icons/bs";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import ImageUpload from "../../components/pop-up/ImageUpload";
import ChangePassword from "../../components/pop-up/ChangePassword";
import DeleteAccountConfirmation from "../../components/DeleteAccountConfirmation";
import { useRecoilState } from "recoil";
import { User } from "@/Atom/Atoms";

const AccountSettings = () => {
  const [user, setUser] = useRecoilState(User);

  // Local state to manage form inputs and UI behavior
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password:"",
    region: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // Fetch user data when the component mounts

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Update form state and Recoil state
    setFormData((prev) => ({ ...prev, [id]: value }));
    setUser((prev) => ({ ...prev, [id]: value }));

    setIsSaved(false);
  };

  // Handle profile picture update
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
      // Validate email (basic example)
      if (!formData.email || !formData.email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }
  
      // Update user state
      setUser({
        ...user, // Preserve existing user data
        email: formData.email,
        password: formData.password || "123456", // Use formData password or fallback
      });
  
      // Simulate an API call or async operation
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  
      // Show success message
      toast.success("Profile updated successfully");
      setIsSaved(true);
  
      // Reset saved state after 3 seconds
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      // Handle errors
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  const regionOptions = [
    { value: "", label: "Select region" },
    { value: "Tier_1", label: "Mumbai" },
    { value: "Tier_1", label: "Delhi" },
    { value: "Tier_1", label: "Bangalore" },
    { value: "Tier_1", label: "Chennai" },
    { value: "Tier_1", label: "Kolkata" },
    { value: "Tier_1", label: "Hyderabad" },
    { value: "Tier_2", label: "Pune" },
    { value: "Tier_2", label: "Jaipur" },
    { value: "Tier_2", label: "Ahmedabad" },
    { value: "Tier_2", label: "Lucknow" },
    { value: "Tier_2", label: "Kochi" },
    { value: "Tier_2", label: "Nagpur" },
    { value: "Tier_2", label: "Visakhapatnam" },
    { value: "Tier_2", label: "Coimbatore" },
    { value: "Tier_2", label: "Chandigarh" },
    { value: "Tier_2", label: "Thiruvananthapuram" },
    { value: "Tier_2", label: "Bhopal" },
    { value: "Tier_2", label: "Indore" },
    { value: "Tier_2", label: "Patna" },
    { value: "Tier_2", label: "Kanpur" },
    { value: "Tier_2", label: "Vadodara" },
    { value: "Tier_2", label: "Agra" },
    { value: "Tier_2", label: "Nashik" },
    { value: "Tier_2", label: "Surat" },
    { value: "Tier_2", label: "Ludhiana" },
    { value: "Tier_2", label: "Guwahati" },
    { value: "Tier_2", label: "Bhubaneswar" },
    { value: "Tier_2", label: "Mysore" },
    { value: "Tier_2", label: "Amritsar" },
    { value: "Tier_2", label: "Goa" }
  ];

  return (
    <div className="flex w-screen min-h-screen bg-gray-50">
      <SettingsSidebar />

      <div className="flex-1 p-8 md:ml-64">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account details, profile picture, and security settings.</p>

          <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="flex flex-col md:flex-row gap-4">
                <label htmlFor="fullName" className="w-[150px] text-gray-700 font-medium">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col md:flex-row gap-4">
                <label htmlFor="email" className="w-[150px] text-gray-700 font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Region */}
              <div className="flex flex-col md:flex-row gap-4">
                <label htmlFor="region" className="w-[150px] text-gray-700 font-medium">Region</label>
                <select
                  id="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  {regionOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Profile Picture */}
              <div className="flex flex-col md:flex-row gap-4">
                <label className="w-[150px] text-gray-700 font-medium">Profile Picture</label>
                <div className="flex items-center gap-4">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile" className="w-20 h-20 rounded-full border-2" />
                  ) : (
                    <button type="button" onClick={() => setIsImagePopupOpen(true)} className="w-20 h-20 bg-gray-100 border-2 border-dashed hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <BsUpload size={24} className="text-gray-500" />
                    </button>
                  )}
                </div>
              </div>

              {/* Save Changes Button */}
              <button type="submit" disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                {isLoading ? "Saving..." : isSaved ? <><BsCheckCircle /> Saved</> : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
