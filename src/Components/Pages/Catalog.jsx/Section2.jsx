import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import uploadsvg from "../../../Images/UploadIcons.png";

export function Section2() {
  const [imageTextPairs, setImageTextPairs] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [title, setTitle] = useState("");

  const handleRegularImageUpload = (event) => {
    const files = event.target.files;
    const updatedNewImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result;
        updatedNewImages.push({
          id: i,
          dataUrl: imageDataUrl,
          title: "",
          subtitle: "",
        });
        setNewImages((prevImages) => [...prevImages, ...updatedNewImages]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSupportiveImageUpload = useCallback((acceptedFiles) => {
    const updatedPairs = acceptedFiles.map((file) => ({
      image: file,
      text: "", // Initialize text as empty
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

  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="Section2">
      <div className="input-field ml-[29rem] mr-[54rem] mt-[5rem] flex flex-col gap-6">
        <input
          type="text"
          className="border border-gray-300 text-center rounded-lg px-7 py-4 focus:outline-none focus:border-black"
          placeholder="Title"
        />
        <button className="border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:border-black">
          View
        </button>
        <button className="border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:border-black">
          Download
        </button>
      </div>
      <div
        {...getRootPropsSupportiveImages()}
        className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center w-[20rem] ml-[27rem] mt-[4rem]"
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
      <div className="flex flex-wrap mt-8">
        {imageTextPairs.map((pair, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            style={{ width: "10rem", marginLeft:"10rem"}}
          >
            <img
              src={URL.createObjectURL(pair.image)}
              alt={`Uploaded ${index}`}
              className="w-full h-auto object-cover"
              style={{ marginBottom: "1rem" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
