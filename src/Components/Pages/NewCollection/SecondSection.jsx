import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import { baseUrlImage, baseUrl } from "../../../api/base_urls";
import CircularProgress from "@mui/material/CircularProgress";

export function SecondSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}homescreen/getAllCollections`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.whatsnewCollection
        ) {
          const whatsnewCollection = response.data.data.whatsnewCollection;
          if (whatsnewCollection.section1) {
            const { section1 } = whatsnewCollection;
            setTitle(section1.title || "");
            setSubTitle(section1.subTitle || "");
            setSectionData(section1);
          } else {
            console.log("section 1 value not available");
          }
        } else {
          console.log("No data or collectionPage found in response");
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const requestData = {
        title: title,
        subTitle: subTitle,
      };
      if (selectedImage) {
        requestData.backgroundImage = selectedImage;
        }
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/whatsnewCollectionScreen/updateSection1",
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Save successful:", response.data);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess("");
      }, 3000);
      // Optionally add logic to display a success message or perform other actions
    } catch (error) {
      console.error("Error saving data:", error);
      // Handle error scenarios, e.g., display an error message to the user
    }
  };

  const handleCancel = () => {
    if (sectionData) {
      setTitle(sectionData.title);
      setSubTitle(sectionData.subTitle);
      setSelectedImage(null);

      setResetMessage("Fields reset successfully");

      setTimeout(() => {
        setResetMessage("");
      }, 3000);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div className="max-w-lg ml-[2rem] mt-[2rem]">
        <div className="hidden md:flex items-center justify-between mb-[1rem]">
          <div className="w-full flex flex-col">
            <div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
              Section 1
            </div>
            <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
              Update desired photo and details here.
            </div>
          </div>
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <button
              className="text-white bg-purple-600 rounded-lg px-3 py-2 absolute ml-[87%] "
              onClick={handleSave}
            >
              Save
            </button>
          )}
          {saveSuccess && (
            <div className="text-green-600 absolute mt-[5rem] ml-[87%]">
              Save successful!
            </div>
          )}
          <button
            className="text-black bg-white rounded-lg px-3 py-2 absolute ml-[80%] "
            onClick={handleCancel}
          >
            Cancel
          </button>
          {resetMessage && (
            <div className="text-red-600 mt-[5rem] absolute ml-[80%]">
              {resetMessage}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <label className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap">
            Title
          </label>
          <div className="flex">
            <input
              type="text"
              className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black mr-[2rem]"
              placeholder="HEADING"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
              placeholder="PARAGRAPH"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="w-1/3">
            <label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1">
              Image{" "}
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
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded"
                className="w-auto h-40 object-cover rounded-lg mr-2"
              />
            ) : sectionData && sectionData.backgroundImageUrl ? (
              <img
                src={`${baseUrlImage}${sectionData.backgroundImageUrl}`}
                alt="Initial Image"
                className="w-auto h-40 object-cover rounded-lg mr-2"
              />
            ) : null}
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
    </div>
  );
}

export default SecondSection;
