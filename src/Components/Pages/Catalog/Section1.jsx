import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import uploadsvg from "../../../Images/UploadIcons.png";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";

export const Section1 = () => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSubTitle, setSectionSubTitle] = useState("");
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}catalogsScreen/getCatalogsPage`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.section1
        ) {
          const section1Data = response.data.data.section1;
          setSectionData(section1Data);
          setSectionTitle(section1Data.title);
          setSectionSubTitle(section1Data.subTitle);
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
      }
    };

    fetchSectionData();
  }, []);



  const fetchSectionData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}catalogsScreen/getCatalogsPage`
      );
      if (
        response.data &&
        response.data.data &&
        response.data.data.section1
      ) {
        const section1Data = response.data.data.section1;
        setSectionData(section1Data);
        setSectionTitle(section1Data.title);
        setSectionSubTitle(section1Data.subTitle);
      }
    } catch (error) {
      console.error("Error fetching section data:", error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSave = async () => {
    setLoading(true);

    const requestData = {
      title: sectionTitle,
      subTitle: sectionSubTitle,
    };
    
    if (selectedImage) {
			requestData.backgroundImage = selectedImage;
		  }
    try {
      const response = await axios.post(
        `${baseUrl}catalogsScreen/updateSection1`,
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      setSaveSuccess(true);
    } catch (error) {
      console.error("Error updating section:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }fetchSectionData();
  };

  const handleCancel = () => {
    if (sectionData) {
      setSectionTitle(sectionData.title);
      setSectionSubTitle(sectionData.subTitle);
      setSelectedImage(null);

      setResetMessage("Fields reset successfully");

      setTimeout(() => {
        setResetMessage("");
      }, 3000);
    }
  };
  return (
    <div>
      <div className="max-w-lg ml-[2rem] mt-[2rem]">
        <div className="hidden md:flex items-center justify-between mb-[1rem] relative">
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
              className="text-white bg-purple-600 rounded-lg px-3 py-2 absolute ml-[87rem]"
              onClick={handleSave}
            >
              Update
            </button>
          )}
          {saveSuccess && (
            <div className="text-green-600 mt-2 absolute top-[25rem] ml-[85%]">
              Save successful!
            </div>
          )}
          <button
            className="text-black bg-white rounded-lg px-3 py-2 absolute ml-[81rem]"
            onClick={handleCancel}
          >
            Cancel
          </button>
          {resetMessage && (
            <div className="text-red-600 mt-2 absolute top-[25rem] ml-[85%]">
              {resetMessage}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <label className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap">
            Hero Section Title
          </label>
          <div className="flex gap-4 absolute ml-[35%]">
            <div className="flex">
              <input
                type="text"
                className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
                value={sectionTitle}
                placeholder="Title"
                onChange={(e) => setSectionTitle(e.target.value)}
              />
            </div>
            <div className="flex">
              <input
                type="text"
                className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
                value={sectionSubTitle}
                placeholder="Sub-Title"
                onChange={(e) => setSectionSubTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
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
