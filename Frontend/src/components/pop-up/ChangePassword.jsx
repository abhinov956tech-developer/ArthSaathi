import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const ChangePassword = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    
    // Calculate password strength if changing new password
    if (name === "newPassword") {
      calculatePasswordStrength(value);
    }
  };

  const toggleVisibility = (field) => {
    setVisibility({ ...visibility, [field]: !visibility[field] });
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Medium";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.oldPassword.trim()) {
      newErrors.oldPassword = "Current password is required";
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    if (formData.newPassword === formData.oldPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Password change logic would go here
      console.log("Password changed successfully!");
      
      // Show success feedback
      alert("Password changed successfully!");
      closeModal();
    } catch (error) {
      setErrors({ 
        general: "Failed to change password. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 animate-fadeIn">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
          <div className="flex items-center">
            <RiLockPasswordLine className="text-blue-600 w-6 h-6 mr-2" />
            <h1 className="text-xl font-semibold text-gray-800">Change Password</h1>
          </div>
          <button 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <IoMdClose className="text-gray-600 w-6 h-6" />
          </button>
        </div>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={visibility.oldPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Enter your current password"
                className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.oldPassword ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.oldPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => toggleVisibility("oldPassword")}
                aria-label={visibility.oldPassword ? "Hide password" : "Show password"}
              >
                {visibility.oldPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.oldPassword}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={visibility.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter your new password"
                className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.newPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => toggleVisibility("newPassword")}
                aria-label={visibility.newPassword ? "Hide password" : "Show password"}
              >
                {visibility.newPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.newPassword ? (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            ) : formData.newPassword ? (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs font-medium">
                    Password strength: <span className={`font-semibold ${
                      passwordStrength <= 2 ? "text-red-600" : 
                      passwordStrength <= 4 ? "text-yellow-600" : "text-green-600"
                    }`}>{getStrengthLabel()}</span>
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getStrengthColor()} transition-all duration-300 ease-in-out`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <ul className="mt-2 text-xs text-gray-600 space-y-1 pl-5 list-disc">
                  <li className={formData.newPassword.length >= 8 ? "text-green-600" : ""}>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(formData.newPassword) ? "text-green-600" : ""}>
                    At least one uppercase letter
                  </li>
                  <li className={/[0-9]/.test(formData.newPassword) ? "text-green-600" : ""}>
                    At least one number
                  </li>
                  <li className={/[^A-Za-z0-9]/.test(formData.newPassword) ? "text-green-600" : ""}>
                    At least one special character
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={visibility.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your new password"
                className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => toggleVisibility("confirmPassword")}
                aria-label={visibility.confirmPassword ? "Hide password" : "Show password"}
              >
                {visibility.confirmPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded transition-colors"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white font-medium rounded transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;