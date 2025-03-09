import React, { useState, useRef, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

const ImageUpload = ({ closeModal, setProfilePicture }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateImage = (file) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return "Please select a valid image file (JPEG, PNG, or GIF)";
    }
    
    // Check file size (3MB limit)
    if (file.size > 3 * 1024 * 1024) {
      return "Image size should be less than 3MB";
    }
    
    return null;
  };

  const handleImageChange = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);
    setSelectedImage(file);
  }, []);

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      const validationError = validateImage(file);
      
      if (validationError) {
        setError(validationError);
        return;
      }
      
      setError(null);
      setSelectedImage(file);
    }
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleRemoveImage = useCallback(() => {
    setSelectedImage(null);
    fileInputRef.current.value = "";
  }, []);

  const handleUpload = useCallback(() => {
    if (!selectedImage) return;
    
    setIsUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create object URL for the selected image
      const imageUrl = URL.createObjectURL(selectedImage);
      
      // Call the parent component's function to set the profile picture
      setProfilePicture(imageUrl);
      
      setIsUploading(false);
      closeModal();
    }, 1000);
  }, [selectedImage, setProfilePicture, closeModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl mx-4">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Upload Profile Picture</h1>
          <button 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <IoMdClose className="text-gray-600 w-6 h-6" />
          </button>
        </div>
        
        <div 
          className={`flex flex-col justify-center items-center border-2 border-dashed rounded-lg p-8 h-64 transition-colors ${
            error ? 'border-red-400 bg-red-50' : 'border-blue-300 hover:border-blue-500 bg-blue-50'
          }`}
          onClick={!selectedImage ? handleBrowseClick : undefined}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedImage ? (
            <div className="relative w-full h-full flex justify-center">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="max-h-full object-contain rounded"
              />
              <button 
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                onClick={handleRemoveImage}
                aria-label="Remove image"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
              <p className="absolute bottom-0 left-0 text-sm text-gray-500 bg-white bg-opacity-75 p-1 rounded">
                {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center cursor-pointer text-center">
              <MdOutlineFileUpload className="w-16 h-16 text-blue-500 mb-2" />
              <p className="text-gray-600 mb-2">Drag and drop your image here or</p>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={handleBrowseClick}
              >
                Browse Files
              </button>
              <p className="mt-3 text-sm text-gray-500">
                Supports: JPG, PNG, GIF (Max: 3MB)
              </p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/jpeg,image/png,image/gif"
          />
        </div>
        
        {error && (
          <div className="mt-2 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded transition-colors"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 bg-blue-600 text-white font-medium rounded transition-colors ${
              !selectedImage || isUploading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700'
            }`}
            onClick={handleUpload}
            disabled={!selectedImage || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;