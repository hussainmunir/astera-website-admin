import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function Section1() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [supportiveImages, setSupportiveImages] = useState([]);
  
  const onDropImage1 = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const onDropSupportiveImages = useCallback(
    (acceptedFiles) => {
      setSupportiveImages((prevImages) => [...prevImages, ...acceptedFiles]);
    },
    [] // No dependencies, as the state update is based only on acceptedFiles
  );

  
  const {
    getRootProps: getRootPropsImage1,
    getInputProps: getInputPropsImage1,
  } = useDropzone({
    onDrop: onDropImage1,
    accept: "image/*",
    multiple: false,
  });

  const {
    getRootProps: getRootPropsSupportiveImages,
    getInputProps: getInputPropsSupportiveImages,
  } = useDropzone({
    onDrop: onDropSupportiveImages,
    accept: "image/*",
    multiple: true,
  });

  const handleDeleteImage = (indexToRemove) => {
    setSupportiveImages((prevImages) =>
      prevImages.filter((image, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col  ml-[2.5rem]">
        <p className=" text-gray-600 text-lg ">
          <b>Section 2</b>
        </p>
        <p className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here
        </p>
      </div>
      <div className="flex ml-[80rem] -mt-8 space-x-5">
        <button className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl">
          Close
        </button>
        <button className="border-1 border-solid border-blue w-[5rem] text-white bg-blue-700 p-2 rounded-xl">
          Save
        </button>
      </div>
      <div className="flex flex-row">
        <label className="block text-lg ml-[2.5rem]  font-semibold mb-1">
          SlideShow Images{" "}
          <HelpOutlineIcon
            style={{
              fontSize: 16,
              color: "gray",
              backgroundColor: "white",
            }}
          />
        </label>{" "}
        {/* Supportive Images */}
        <div className="flex flex-row ">
          <div className=" mt-[2rem] ml-[8rem] flex justify-start gap-8">
            <div
              {...getRootPropsSupportiveImages()}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center ml-0"
            >
              <input {...getInputPropsSupportiveImages()} />
              <img
                src={uploadsvg}
                alt="Upload Icon"
                className="w-12 h-12 mb-2"
              />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-600">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
            <div className="flex gap-4">
              {supportiveImages.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-40 h-40 object-cover gap-3"
                    style={{ objectFit: "cover" }}
                  />
                  <IconButton
                    className="absolute top-1 right-0 m-2 bg-white"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section1;
