import { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import { useDropzone } from "react-dropzone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Switch } from "@mui/material";

export function Section1() {
  const maxChars = 500;
  const [charCount, setCharCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputEnabled, setInputEnabled] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleToggleChange = () => {
    setInputEnabled(!inputEnabled); // Toggle the input field enable/disable state
  };

  return (
    <div className="">
      <div className="flex flex-col mt-[2rem] ml-[2rem]">
        <p className="w-full text-gray-600 text-lg ">
          <b>Section 1</b>
        </p>
        <p className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here
        </p>
      </div>
      <div className="flex gap-6 ml-[75%]">
        <button className="p-2 text-black bg-white border-2 border-black rounded-xl ">
          Cancel
        </button>
        <button className="text-white bg-purple-600 rounded-lg px-5 py-2.5">
          Save
        </button>
      </div>
      <div className="flex mt-[2rem] ml-[2rem] gap-[10rem]">
        <p className=" text-lg text-black-800 font-bold">Hero Section Title</p>
        <input
          className="mt-0 p-2 w-[28rem] rounded-lg border-gray border-2"
          placeholder="BLOGS"
        />
      </div>
      <div className="flex mt-[4rem] gap-[10rem]">
        <label
          htmlFor="bio"
          className="text-lg font-medium text-gray-900 ml-[2rem]"
        >
          Description
          <br />
          <span className="font-light text-sm whitespace-nowrap">
            Write a short introduction.
          </span>
        </label>
        <div className="flex flex-col">
          <ReactQuill
            theme="snow"
            placeholder="Write a short introduction."
            style={{ height: "200px", marginBottom: "40px", width: "600px" }}
          />

          <div className="text-sm ml-1 text-gray-600">{`${
            maxChars - charCount
          } characters left`}</div>
        </div>
      </div>

      <div className="flex mt-[2rem]">
        <div className="w-1/3">
          <label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1">
            Image{" "}
            <HelpOutlineIcon
              style={{ fontSize: 16, color: "gray", backgroundColor: "white" }}
            />
          </label>
          <p className="text-xs text-gray-500 mb-2 ml-[2rem] whitespace-nowrap">
            This will be displayed on your Hero Section.
          </p>
        </div>
        <div className="w-auto mt-[2rem] -ml-[8rem] flex">
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              className="w-auto h-40 object-cover rounded-lg mr-2"
            />
          )}
          <div
            {...getRootProps()}
            className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
          >
            <input {...getInputProps()} />
            <img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
      </div>
      <div className="flex mt-[4rem] items-center">
        <div className="ml-[2rem]">
          <span className="mb-0 ml-2 font-extrabold whitespace-nowrap">
            Add Button
          </span>
          <Switch
            checked={inputEnabled}
            onChange={handleToggleChange}
            color="primary"
          />
          <span></span>
        </div>
        <div className="relative flex items-center">
          <input
            type="text"
            className="border ml-[10rem] border-gray-300 rounded-lg px-3 py-2 "
            placeholder={inputEnabled ? "VIEW ALL BLOGS" : "VIEW ALL BLOGS"}
            disabled={!inputEnabled}
          />
        </div>
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}
