import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";

export function Section1() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [sectionData,setSectionData]=useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500; // Set the max characters allowed
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [id, setId] = useState(""); // Define id state if used in handleSave function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}homescreen/getAllCollections`);
        if (response.data && response.data.data && response.data.data.eventsPage) {
          const events = response.data.data.eventsPage;
          if (events.section1) {
            const { section1 } = events;
            setTitle(section1.title || "");
            setSubTitle(section1.subTitle || "");
            setEditorContent(section1.description || "");
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
    setLoading(true);

    const requestData = {
      title: title,
      subTitle: subTitle,
      description:editorContent,
      id:id,
    }
    if (selectedImage) {
      requestData.append("backgroundImage", selectedImage);
    }

    try {
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/eventsScreen/updateSection1",
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
    }
  };

  const handleCancel = () => {
   if(sectionData){
    setTitle(sectionData.title || "");
    setSubTitle(sectionData.subTitle || "");
    setEditorContent(sectionData.description || "");
    setSelectedImage(null);
   }
    // Set reset message
    setResetMessage("Fields reset successfully");

    // Clear reset message after 3 seconds
    setTimeout(() => {
      setResetMessage("");
    }, 3000);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedImage(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Handler for the editor change
  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setCharCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
  };

  // Quill modules to attach to editor
  // Add your desired modules here
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // Extend default configuration to handle pasted text
      matchVisual: false,
    },
  };

  // Quill formats to attach to editor
  // Add your desired formats here
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <div className="w-full flex flex-col ml-[2rem] mt-8">
        <p className="w-full text-gray-600 text-lg maxmd:max-w-full">
          <b>Section 1</b>
        </p>
        <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 maxmd:max-w-full">
          Update desired photo and details here.
        </div>
      </div>
      <div className="flex ml-[80rem] space-x-5 -mt-8">
        <button
          className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
          onClick={handleCancel}
        >
          Cancel
        </button>
        {resetMessage && (
          <div className="text-red-600 mt-2 absolute top-[25rem] ml-[85%]">
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
          <div className="text-green-600 mt-2 absolute top-[25rem] ml-[85%]">
            Save successful!
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
          placeholder="AMBIENTE 2024"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="mt-8 w-[25rem] ml-[1rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="JANUARY 26TH TO JANUARY 30TH"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </div>

      <div>
        <div className="max-w-lg ml-[2rem] mt-[2rem]">
          <div className="flex mt-[2rem]">
            <label
              htmlFor="bio"
              className="text-lg font-medium text-gray-900 mr-[24rem]"
            >
              Bio
              <br />
              <span className="font-light text-sm whitespace-nowrap">
                Write a short introduction.
              </span>
            </label>
            <div className="flex flex-col -ml-[8rem] mt-6">
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={handleEditorChange}
                modules={modules}
                formats={formats}
                placeholder="Write a short introduction."
                style={{
                  height: "200px",
                  marginBottom: "40px",
                  width: "600px",
                }}
              />
              <div className="text-sm ml-1 text-gray-600">
                {`${maxChars - charCount} characters left`}
              </div>
            </div>
          </div>
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
            <div className="w-full mt-[4rem] ml-[15rem] flex justify-start">
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
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section1;
