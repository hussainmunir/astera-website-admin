import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Section1 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div className="max-w-lg ml-[2rem] mt-[2rem]">
        <div className="hidden md:flex items-center justify-between mb-[1rem] relative">
          <div className="w-full flex flex-col">
            <div className="w-full text-lg font-bold leading-7 text-gray-900 max-md:max-w-full">
              Section 2
            </div>
            <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
              Update desired photo and details here.
            </div>
          </div>
        </div>
        <button className="text-white bg-purple-600 rounded-lg px-3 py-2 absolute ml-[87%] -mt-[7rem] ">
          Save
        </button>
        <button className="text-black bg-white rounded-lg px-3 py-2 absolute ml-[80%] -mt-[7rem]">
          Cancel
        </button>

        {/* <div className="flex items-center">
					<label className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap">
						Hero Section Title
					</label>
					<div className="flex">
						<input
							type="text"
							className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black mr-[2rem]"
							placeholder="HEADING"
						/>
						<input
							type="text"
							className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
							placeholder="PARAGRAPH"
						/>
					</div>
				</div> */}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="w-1/3">
            <label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1">
              Hero Image{" "}
              <HelpOutlineIcon
                style={{
                  fontSize: 16,
                  color: "gray",
                  backgroundColor: "white",
                }}
              />
            </label>
            <p className="text-xs text-gray-500 mb-2 ml-[2rem]">
              This will be displayed on your Hero Section.
            </p>
          </div>
          <div className="w-full mt-[2rem] ml-[22rem] flex justify-start">
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded"
                className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
              />
            )}
            <div
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <img
                src={uploadsvg} // Replace with your upload icon path
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
          </div>
        </div>
      </div>
      <div className="border border-l border-black m-[2rem] "></div>
    </div>
  );
};

export default Section1;
