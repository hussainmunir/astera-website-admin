import React, { useCallback, useEffect, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import arrow from "../../../assets/rightArrow.jpeg";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";

export function Section1() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}notFoundScreen/getNotFoundPage`
        );
        console.log("response", response);
        if (
          response.data &&
          response.data.data &&
          response.data.data.section1
        ) {
          const notFoundData = response.data.data.section1;
          if (notFoundData) {
            setTitle(notFoundData.title);
            setSubTitle(notFoundData.subTitle);
            setDescription(notFoundData.description);
            setSectionData(notFoundData);
            setSelectedImage(notFoundData.backgroundImageUrl);
            console.log("notFoundData", notFoundData);
          }
        }
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleCancel = () => {
    if (sectionData) {
      setTitle(sectionData.title);
      setSubTitle(sectionData.subTitle);
      setDescription(sectionData.description);
      setSelectedImage(sectionData.backgroundImageUrl);
    }
    setResetMessage("Fields reset successfully");

    // Clear reset message after 3 seconds
    setTimeout(() => {
      setResetMessage("");
    }, 3000);
  };

  const handleSave = async () => {
    try {
      const requestData = new FormData();
      requestData.append("title", title);
      requestData.append("subTitle", subTitle);
      requestData.append("description", description);

      if (selectedImage) {
        requestData.append("backgroundImage", selectedImage);
      }
      console.log("selectedImage",selectedImage)
      const response = await axios.post(
        `${baseUrl}notFoundScreen/updateSection`,
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("save response", response);
    } catch (error) {
      console.log("post error:", error);
    }
  };

  return (
    <div>
      <div className="flex ml-[80%] gap-4 mt-8">
        <button
          className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
          onClick={handleCancel}
        >
          Cancel
        </button>
        {resetMessage && (
          <div className="text-red-600 mt-2 absolute top-[45rem] ml-[85%]">
            {resetMessage}
          </div>
        )}
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <button
            className="border-1 border-solid border-blue w-[5rem] text-white bg-blue-700 p-2 rounded-xl"
            onClick={handleSave}
          >
            Save
          </button>
        )}
        {saveSuccess && (
          <div className="text-green-600 mt-2 absolute top-[45rem] ml-[85%]">
            Save successful!
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="SUB-TITLE"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="DESCRIPTION"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="flex flex-row mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg text-gray-950">
          <b>GO TO HOMEPAGE</b>
          <img className="ml-[1rem] mt-1" src={arrow} alt="" />
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mt-6">
          <div className="w-full mt-[4rem] ml-[17rem] flex justify-start">
            {selectedImage && typeof selectedImage !== "string" ? (
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
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section1;
