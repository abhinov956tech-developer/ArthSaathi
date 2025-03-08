import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import ImageUpload from "../../components/pop-up/ImageUpload";
import ChangePassword from "../../components/pop-up/ChangePassword";

const AccountSettings = () => {
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleUploadProfilePicture = () => setIsPopupOpen(true); // Open the modal
  const handleClosePopup = () => setIsPopupOpen(false); // Close the modal

  const handleOpenPasswordPopup = () => setIsPasswordPopupOpen(true);
  const handleClosePasswordPopup = () => setIsPasswordPopupOpen(false);

  return (
    <div className="flex">
      <div>
        <SettingsSidebar />
      </div>

      <div className="mt-28 ml-9">
        <div className="mb-8">
          <h1 className="text-[18px] font-semibold">Account</h1>
          <p className="text-[14px] text-[#727272]">
            Change your operator name, add your profile picture, change your profile picture, change your email address and password, and adjust your region so that your time zone will be displayed correctly.
          </p>
        </div>

        <form className="space-y-6">
          {/* Full Name */}
          <div className="flex items-center">
            <label className="w-[150px] text-gray-700 font-medium">Full Name</label>
            <input
              id="fullName"
              type="text"
              className="w-[407px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Address */}
          <div className="flex items-center">
            <label className="w-[150px] text-gray-700 font-medium">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-[407px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter your email address"
            />
          </div>

          {/* Profile Picture */}
          <div className="flex items-center">
            <label className="w-[150px] text-gray-700 font-medium">Profile Picture</label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-black text-white rounded-full w-[76px] h-[76px] flex items-center justify-center"
                onClick={handleUploadProfilePicture}
              >
                <BsUpload />
              </button>
              {profilePicture && (
                <img src={profilePicture} alt="Profile" className="w-[76px] h-[76px] rounded-full" />
              )}
            </div>
          </div>

          {/* Other Form Fields */}
          <div className="flex items-center">
            <label className="w-[150px] text-gray-700 font-medium">Password</label>
            <button
              type="button"
              className=" py-2 text-blue-600"
              onClick={handleOpenPasswordPopup}
            >
              Change Password
            </button>
          </div>

          {/* Delete Account */}
          <div className="flex items-center">
            <label className="w-[150px] text-gray-700 font-medium">Account</label>
            <span className="flex flex-row gap-4">
              <button
                type="button"
                className="px-4 py-2 bg-[#F14242] w-[184px] text-white rounded-md font-semibold hover:bg-red-600"
              >
                Delete Account
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-black w-[184px] text-white rounded-md font-semibold hover:bg-gray-800"
              >
                Save Details
              </button>
            </span>
          </div>
        </form>
      </div>

      {isPopupOpen && (
        <ImageUpload closeModal={handleClosePopup} setProfilePicture={setProfilePicture} />
      )}
       {isPasswordPopupOpen && <ChangePassword closeModal={handleClosePasswordPopup} />}
    </div>
  );
};

export default AccountSettings;