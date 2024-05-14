import React, { useCallback, useEffect, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";
import CircularProgress from "@mui/material/CircularProgress";

export function Section1() {
  const [title, setTitle] = useState("");
  const [sectionData, setSectionData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}homescreen/getAllCollections`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.termsAndConditionsPage
        ) {
          const termsAndConditionsPage = response.data.data.termsAndConditionsPage;
          if (termsAndConditionsPage.section1) {
            const { section1 } = termsAndConditionsPage;
            setTitle(section1.title || "");
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
      setLoading(true);
      const requestData = new FormData();
      requestData.append("title", title);
      if (selectedImage) {
        requestData.append("backgroundImage", selectedImage);
      }
      const response = await axios.post(
        `${baseUrl}termsAndConditionsScreen/updateSection1`,
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
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (sectionData) {
      setTitle(sectionData.title);
      setSelectedImage(null);
      setResetMessage("Fields reset successfully");
      setTimeout(() => {
        setResetMessage("");
      }, 3000);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
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
        <button
          className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
          onClick={handleCancel}
        >
          Cancel
        </button>
        {resetMessage && (
          <div className="text-red-600 mt-[5rem] absolute ml-[80%]">
            {resetMessage}
          </div>
        )}
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <button
            className="border-1 border-solid border-blue w-[5rem] text-white bg-blue-700 p-2 rounded-xl "
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
        {error && (
          <div className="text-red-600 absolute mt-[5rem] ml-[87%]">
            Error: {error.message}
          </div>
        )}
      </div>

      <div className="flex flex-row">
        <label className="block text-lg font-semibold mt-[2rem] ml-[2rem] whitespace-nowrap">
          Hero Section Title
        </label>
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="TERM AND CONDITIONS"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mt-6">
          <div className="w-1/3">
            <label className="block text-lg ml-[2rem]  font-semibold mb-1">
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
            <div {...getRootProps()} className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center">
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
