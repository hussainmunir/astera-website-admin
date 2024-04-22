import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function Section2() {
  const [newImages, setNewImages] = useState([]);
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

  return (
    <div className=" h-[100vh]">
      <div className="w-full flex flex-col ml-[2rem] ">
        <p className="w-full text-gray-600 text-lg max-md:max-w-full">
          <b>Section 3</b>
        </p>
        <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here.
        </div>
      </div>
      <div className="flex ml-[80rem] space-x-5 -mt-8 ">
          <button className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl">
            Close
          </button>
          <button className="border-1 border-solid border-blue w-[5rem] text-white bg-blue-700 p-2 rounded-xl">
            Save
          </button>
        </div>
      <div className="flex flex-row">
        <label className="block text-lg font-semibold mt-[2rem] ml-[2rem] whitespace-nowrap">
          Hero Section Title
        </label>
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="BURGEN BLUE"
        />

        <input
          type="text"
          className="mt-8 w-[25rem] ml-[1rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="ASTERA COLORED RANGES"
        />
      </div>
      <div className="flex flex-row">
      <label className="block text-lg ml-[2rem] mt-[3rem] w-[15rem] font-semibold mb-1">
          Product Images{" "}
          <HelpOutlineIcon
            style={{
              fontSize: 16,
              color: "gray",
              backgroundColor: "white",
            }}
          />
        </label>{" "}
      <div className="w-full flex justify-start">
        <div className="flex mt-[4rem] ml-[7rem] gap-4">
          <div
            {...getRootPropsSupportiveImages()}
            className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center ml-4"
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
          {imageTextPairs.map((pair, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={URL.createObjectURL(pair.image)}
                alt={`Uploaded ${index}`}
                className="w-40 h-40 object-cover"
                style={{ marginBottom: "1rem" }}
              />
              <input
                type="text"
                className="border-2 border-gray-300 p-2 rounded-lg"
                placeholder="BURGEN BLUE DESERT...."
              />
              <div className="mt-2">
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  placeholder="21 CM"
                />
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  placeholder="SR No. : BN00111022M3AW19"
                />
              </div>
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
      </div><div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}
export default Section2;
