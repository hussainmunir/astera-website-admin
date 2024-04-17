import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import uploadsvg from "../../../Images/UploadIcons.png";

export function Section2() {
  const [imageTextPairs, setImageTextPairs] = useState([]);

  const handleSupportiveImageUpload = useCallback((acceptedFiles) => {
    const updatedPairs = acceptedFiles.map((file) => ({
      image: file,
      text: "",
    }));
    setImageTextPairs((prevPairs) => [...prevPairs, ...updatedPairs]);
  }, []);

  const handleDeletePair = (indexToRemove) => {
    setImageTextPairs((prevPairs) =>
      prevPairs.filter((pair, index) => index !== indexToRemove)
    );
  };

  const {
    getRootProps: getRootPropsSupportiveImages,
    getInputProps: getInputPropsSupportiveImages,
  } = useDropzone({
    onDrop: handleSupportiveImageUpload,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="Section2">
      <div className="flex flex-col gap-4 ml-[21rem]">
        <div
          {...getRootPropsSupportiveImages()}
          className="bg-white rounded-lg border border-gray-200 p-4 w-[18rem] h-[10rem] mt-[4rem] ml-[6.5rem] flex flex-col items-center"
        >
          <input {...getInputPropsSupportiveImages()} />
          <img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-600">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
        <div className="flex gap-10 -ml-[15rem]">
          {imageTextPairs.map((pair, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={URL.createObjectURL(pair.image)}
                alt={`Uploaded ${index}`}
                className="w-40 h-40 object-cover"
                style={{ marginBottom: "1rem" }}
              />

              <button className="mt-2 w-[12rem] h-[3rem]  border-2 border-black-500 border-solid p-3 rounded-lg text-gray-400">
                Download
              </button>
              <button className="mt-2 w-[12rem]  h-[3rem] border-2 border-black-500 border-solid p-3 rounded-lg text-gray-400">
                View
              </button>
              <IconButton
                className="mt-2 bg-white border border-black"
                onClick={() => handleDeletePair(index)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
