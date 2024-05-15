

// export default Section2;
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { CircularProgress, Switch } from "@mui/material";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";

export const Section2 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [inputText, setInputText] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [originalData, setOriginalData] = useState(null);
  const [addButton,setAddButton]=useState(""); // Store original fetched data

  const maxChars = 500;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}homescreen/getAllCollections`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.homePage &&
          response.data.data.homePage.section2
        ) {
          const section2Data = response.data.data.homePage.section2;
          setTitle(section2Data.title);
          setSubtitle(section2Data.subtitle);
          setDescription(section2Data.description);
          setButtonText(section2Data.buttonText);
          
          if (section2Data.addButton === true) {
            setInputEnabled(true);
          } else {
            setInputEnabled(false);
          }
          
          setSelectedImage(
            `${baseUrlImage}${section2Data.backgroundImageUrl}`
          );
          setOriginalData(section2Data); // Store original fetched data
          setEditorContent(section2Data.description);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setCharCount(editor.getLength() - 1);
  };

  const handleCancel = () => {
    if (originalData) {
      setTitle(originalData.title);
      setSubtitle(originalData.subtitle);
      setDescription(originalData.description);
      setButtonText(originalData.buttonText);
      setEditorContent(originalData.description);
      setSelectedImage(
        `https://backend.asteraporcelain.com/${originalData.backgroundImageUrl}`
      );

      // Set reset message
      setResetMessage("Fields reset successfully");

      // Clear reset message after 3 seconds
      setTimeout(() => {
        setResetMessage("");
      }, 3000);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("backgroundImage", selectedImage);
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("description", description);
      formData.append("buttonText", buttonText); // Use buttonText directly
      formData.append("addButton", inputEnabled); // Use inputEnabled directly
      const response = await axios.post(
        `${baseUrl}homescreen/updateSection2`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Save successful:", response.data);

      setSaveSuccess(true); // Set save success message
      setTimeout(() => {
        setSaveSuccess(false); // Reset save success message
      }, 3000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleToggleChange = () => {
    setInputEnabled(!inputEnabled); // Toggle the input field enable/disable state
    if (!inputEnabled) {
      // Set input text to current buttonText when enabling input
      setInputText(buttonText);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value); 
    setButtonText(inputText);
  };


  return (
    <div className="max-w-lg ml-[2rem] mt-[2rem]">
      <div className="flex items-center justify-between mb-[1rem]">
        <div className="w-full flex flex-col">
          <div className="w-full text-lg font-semibold leading-7 text-gray-900">
            Section 2
          </div>
          <div className="mt-1 w-full text-sm leading-5 text-slate-600">
            Update desired photo and details here.
          </div>
        </div>
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <button
            className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute top-[247rem] ml-[90%]"
            onClick={handleSave}
          >
            Save
          </button>
        )}
        {saveSuccess && (
          <div className="text-green-600 mt-2 absolute top-[250rem] ml-[85%]">
            Save successful!
          </div>
        )}
        <button
          className="text-black bg-white border-2 border-black rounded-2xl px-3 py-2 absolute top-[247rem] ml-[85%]"
          onClick={handleCancel}
        >
          Cancel
        </button>
        {resetMessage && (
          <div className="text-red-600 mt-2 absolute top-[265rem] ml-[85%]">
            {resetMessage}
          </div>
        )}
      </div>

      <div className="flex items-center">
        <label className="block text-lg font-semibold mb-1 mr-[32rem]">
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
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
      </div>

      <div className="flex mt-[2rem]">
        <label
          htmlFor="bio"
          className="text-lg font-medium text-gray-900 mr-[24rem]"
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
            value={editorContent}
            onChange={handleEditorChange}
            placeholder="Write a short introduction."
            style={{ height: "200px", marginBottom: "40px", width: "600px" }}
          />

          <div className="text-sm ml-1 text-gray-600">{`${
            maxChars - charCount
          } characters left`}</div>
        </div>
      </div>
      <div className="flex mt-4 items-center">
        <div className="flex mt-4 items-center">
          <div className="mr-4">
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
              className="border ml-[28rem] border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
              placeholder={inputEnabled ? "Input Field" : "Button Text"}
              value={inputEnabled ? inputText : inputText} // Use inputText when editing, otherwise use buttonText
              onChange={handleInputChange}
              disabled={!inputEnabled}
            />
          </div>
          {inputEnabled && (
            <div className="bg-black text-white px-3 py-2 border whitespace-nowrap rounded-lg ml-[2rem]">
              {inputText}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-[2rem]">
        <div className="w-1/3">
          <label className="block text-lg ml-[0rem] mt-[2rem] font-semibold mb-1">
            Image{" "}
            <HelpOutlineIcon
              style={{ fontSize: 16, color: "gray", backgroundColor: "white" }}
            />
          </label>
          <p className="text-xs text-gray-500 mb-2 ml-[0rem] whitespace-nowrap">
            This will be displayed on your Hero Section.
          </p>
        </div>
        <div className="w-auto mt-[2rem] ml-[22rem] flex">
          {selectedImage ? (
            <img
			src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
            />
          ) : (
            originalData &&
            originalData.backgroundImageUrl(
              <img
                src={`${baseUrlImage}${originalData.backgroundImageUrl}`}
                alt="Uploaded"
                className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
              />
            )
          )}
          <div
            {...getRootProps()}
            className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
          >
            <input {...getInputProps()} />
            <img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
            <p className="text-sm text-gray-600 mb-2 ">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
      </div>
      <hr
        className="my-4 border-black border-empty border-1"
        style={{ width: "350%" }}
      />
    </div>
  );
};

// export default Section2;