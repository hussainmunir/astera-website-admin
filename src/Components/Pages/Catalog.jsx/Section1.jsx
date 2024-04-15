import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export function Section1() {
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="section1 mt-[5rem] ml-[6rem]">
      <div>
        <div className="flex items-center justify-between">
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
    </div>
  );
}
