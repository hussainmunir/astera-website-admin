import React, { useCallback, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import arrow from "../../../assets/rightArrow.jpeg";

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
      
      <div className="flex ml-[80%] gap-4 mt-8">
        <button className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl">
          Close
        </button>
        <button className="border-1 border-solid border-blue w-[5rem] text-white bg-blue-700 p-2 rounded-xl">
          Save
        </button>
      </div>

      <div className="flex flex-col">
        
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="TITLE"
        />
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="SUB-TITLE"
        />
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="DESCRIPTION"
        />
         <button
          className="flex flex-row mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg text-gray-950"
        ><b>GO TO HOMEPAGE</b><img className="ml-[1rem] mt-1" src={arrow} alt=""/></button>
      </div>

      <div>
        <div className="flex items-center justify-between mt-6">
          <div className="w-full mt-[4rem] ml-[17rem] flex justify-start">
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
