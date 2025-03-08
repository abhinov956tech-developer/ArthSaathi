import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const ChangePassword = ({ closeModal }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle password change logic
    console.log("Password changed successfully!");
    closeModal(); // Close the modal after successful submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[609px]">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h1 className="text-xl font-semibold">Change Password</h1>
          <IoMdClose
            className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl"
            onClick={closeModal}
          />
        </div>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
            onClick={handlePasswordChange}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
