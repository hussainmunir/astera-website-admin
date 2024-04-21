import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CircularProgress from "@mui/material/CircularProgress";
import uploadsvg from "../../../Images/UploadIcons.png";
import { useCollections } from "../../../CollectionsContext";

export function Discoversection1() {
  const collections = useCollections();
  const [sectionData, setSectionData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const maxChars = 500;

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await axios.get(
          "https://backend.asteraporcelain.com/api/v1/homescreen/getAllCollections"
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.discoverPage &&
          response.data.data.discoverPage.section1
        ) {
          const { section1 } = response.data.data.discoverPage;
          setSectionData(section1);
          setEditorContent(section1.description);
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
      }
    };

    fetchSectionData();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Update selectedImage with the dropped file
      setSelectedImage(acceptedFiles[0]);
    },
  });

  const handleSave = async () => {
    setLoading(true); // Start loading indicator
  
    const formData = new FormData();
    formData.append("subtitle", sectionData.subtitle);
    formData.append("subtitleBold", sectionData.subtitleBold);
  
    // Extract plain text from the HTML content of the editor
    const plainTextDescription = editorContent.replace(/<\/?[^>]+(>|$)/g, "");
  
    formData.append("description", plainTextDescription);
  
    if (selectedImage) {
      formData.append("backgroundImage", selectedImage);
    }
  
    try {
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/discoverScreen/updateSection1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("Error updating section:", error);
    } finally {
      setLoading(false); // Stop loading indicator regardless of success or failure
    }
  };
  

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setCharCount(editor.getLength() - 1);
  };

  return (
    <div>
      {sectionData && (
        <div className="max-w-lg ml-[2rem] mt-[2rem]">
          <div className="flex items-center justify-between mb-[1rem]">
            <div className="w-full flex flex-col">
              <div className="w-full text-gray-600 text-lg max-md:max-w-full">
                <b>Section 1</b>
              </div>
              <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
                Update desired photo and details here.
              </div>
            </div>
          </div>
          <button
            className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute top-[20rem] ml-[90%]"
            onClick={handleSave}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save"
            )}
          </button>
          <button className="text-black bg-white border-2 border-black rounded-2xl px-3 py-2 absolute top-[20rem] ml-[84%]">
            Cancel
          </button>
          <div className="flex items-center">
            <label className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap">
              Title
            </label>
            <div className="flex">
              <input
                type="text"
                className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black mr-[2rem]"
                value={sectionData.subtitle}
                placeholder="astera"
                onChange={(e) =>
                  setSectionData({ ...sectionData, subtitle: e.target.value })
                }
              />
              <input
                type="text"
                className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                value={sectionData.subtitleBold}
                placeholder="the mystical night sky"
                onChange={(e) =>
                  setSectionData({
                    ...sectionData,
                    subtitleBold: e.target.value,
                  })
                }
              />
            </div>
          </div>
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
            <div className="flex flex-col">
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={handleEditorChange}
                modules={{ toolbar: true }}
                formats={[
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
                ]}
                placeholder="Write a short introduction."
                style={{ height: "200px", marginBottom: "40px", width: "600px" }}
              />
              <div className="text-sm ml-1 text-gray-600">
                {`${maxChars - charCount} characters left`}
              </div>
            </div>
          </div>
          <div>
          <div className="flex items-center justify-between">
  {/* Left side containing label and description */}
  <div className="w-1/3">
    <label className="block text-lg ml-2 mt-2 font-semibold mb-1">
      Hero Image{" "}
      <HelpOutlineIcon
        style={{
          fontSize: 16,
          color: "gray",
          backgroundColor: "white",
        }}
      />
    </label>
    {/* Use a span with CSS for the description */}
    <span className="text-xs text-gray-500 ml-2 max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
      This will be displayed on your Hero Section.
    </span>
  </div>

  {/* Right side containing image display and upload section */}
  <div className="w-full mt-2 ml-[22rem] flex justify-start items-center">
    {/* Display uploaded image or initial image */}
    {selectedImage ? (
      <img
        src={URL.createObjectURL(selectedImage)}
        alt="Uploaded"
        className="w-auto h-40 object-cover rounded-lg mr-2"
      />
    ) : (
      <img
        src={sectionData.backgroundImageUrl}
        alt="Initial Image"
        className="w-auto h-40 object-cover rounded-lg mr-2"
      />
    )}

    {/* Upload section */}
    <div
      {...getRootProps()}
      className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
      style={{ minWidth: "200px" }} // Adjust width as needed
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
      )}
    </div>
  );
}
