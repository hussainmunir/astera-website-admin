import React, { useCallback, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";

export function Section1() {
  const [selectedImage, setSelectedImage] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Handler for the editor change
  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setCharCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
  };

  return (
    <div>
      <div className="w-full flex flex-col ml-[2rem] mt-8">
        <p className="w-full text-gray-600 text-lg max-md:max-w-full">
          <b>Section 1</b>
        </p>
        <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here.
        </div>
      </div>
      <div className="flex ml-[80%] gap-4 -mt-8">
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
          placeholder="PRIVACY POLICY"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mt-6">
          <div className="w-1/3">
            <label className="block text-lg ml-[2rem]  font-semibold mb-1">
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
          <div className="w-full mt-[4rem] ml-[5rem] flex justify-start">
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded"
                className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
              />

            )}
            <div
              {...getRootProps()}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
            >
              <input {...getInputProps()} />
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
          </div>
        </div>
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section1;
