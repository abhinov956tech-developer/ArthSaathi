import React, { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";

const ImageUpload = ({ closeModal, setProfilePicture }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    console.log('Uploading image:', selectedImage);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[609px] h-[475px]">
        <div className="mt-1 flex justify-between items-center border-b mb-6">
          <h1 className="mb-4 text-xl font-semibold">Upload Profile Picture</h1>
          <IoMdClose
            className="cursor-pointer mb-4 text-black hover:text-gray-700 text-2xl w-[28px] h-[28px]"
            onClick={closeModal}
          />
        </div>
        <div className="flex ml-20 mt-14 justify-center w-[394px] h-[222px] items-center border-2 border-dashed border-gray-300 rounded-lg p-10">
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="max-w-full h-auto"
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={handleBrowseClick}
            >
              <MdOutlineFileUpload className="w-[48px] h-[48px] text-gray-500" />
              <p className="mt-4 text-gray-500">Upload Picture</p>
              <p className="text-blue-500 underline">Browse</p>
            </div>
          )}
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="mt-12 flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2"
            onClick={closeModal} // Close modal on cancel
          >
            Cancel
          </button>
          <button
            className="bg-black hover:bg-gray-900 cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
            disabled={!selectedImage}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
