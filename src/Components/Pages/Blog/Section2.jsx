import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import LazyLoad from "react-lazyload";
import { Remove } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function Section2() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [supportiveImages, setSupportiveImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const maxChars = 500;
  const [charCount, setCharCount] = useState(0);
  const [measurement, setMeasurement] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [title, setTitle] = useState("");
   // Define the title state variable

  const onDropSupportiveImages = useCallback(
    (acceptedFiles) => {
      setSupportiveImages([...supportiveImages, ...acceptedFiles]);
    },
    [supportiveImages]
  );
  

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
    <div className="mt-[1rem]">
      <div className="w-full flex flex-col ml-[2rem]">
        <p className="w-full text-gray-600 text-lg max-md:max-w-full">
          <b>Section 2</b>
        </p>
        <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here.
        </div>
      </div>
      <div className="flex ml-[80%] space-x-5 -mt-8">
        <button className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl">
          Cancel
        </button>
        <button className="border-1 border-solid border-blue w-[5rem] text-white bg-blue-700 p-2 rounded-xl">
          Update
        </button>
      </div>
      <div className="flex">
        <label className="block text-lg font-semibold mt-[2rem] ml-[2rem] whitespace-nowrap">
          Section Title
        </label>
        <input
          className="mt-8 w-[25rem] border-2 border-black-500 border-solid p-3 ml-[16rem] rounded-lg"
          placeholder="Drive Into Our Latest"
          type="text"
        />
      </div>
      <div className="flex flex-row">
        <label className="block text-lg ml-[2rem] mt-[3rem] w-[15rem] font-semibold mb-1">
          Blogs Cards{" "}
          <HelpOutlineIcon
            style={{
              fontSize: 16,
              color: "gray",
              backgroundColor: "white",
            }}
          />
        </label>{" "}
        <div className=" flex">
          <div className="flex mt-[4rem]  gap-4">
            <div className="flex gap-10 flex-col ">
              <div className="flex flex-col gap-[4rem]">
                {supportiveImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      className="w-60 h-60 object-cover"
                      style={{ objectFit: "cover" }}
                    />
                    <IconButton
                      className="absolute top-1 flex right-0 m-2 bg-white"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                    <div className="flex flex-col items-start">
                      <div className="flex flex-row gap-6">
                        <input
                          type="text"
                          className="mt-8 w-[25rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                          placeholder="Tarun Singh"
                        />
                        <input
                          type="text"
                          className="mt-8 w-[25rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                          placeholder="18 Apr 2024"
                        />
                      </div>
                      <input
                        type="text"
                        className="mt-8 w-[51rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                        placeholder="this is a blog headline example text put in pl..."
                      />
                      <div className="flex mt-[4rem] gap-[10rem]">
                        
                        <div className="flex flex-col">
                          <ReactQuill
                            theme="snow"
                            placeholder="Write a short introduction."
                            style={{
                              height: "200px",
                              marginBottom: "40px",
                              width: "815px",
                            }}
                          />

                          <div className="text-sm ml-1 text-gray-600">{`${
                            maxChars - charCount
                          } characters left`}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                {...getRootPropsSupportiveImages()}
                className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center ml-[0rem]"
              >
                <input {...getInputPropsSupportiveImages()} />
                <img
                  src={uploadsvg}
                  alt="Upload Icon"
                  className=" w-16 h-12 mb-2"
                />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-600">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section2;
