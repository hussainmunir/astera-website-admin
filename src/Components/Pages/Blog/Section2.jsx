import React, { useState, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import { useDropzone } from "react-dropzone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function Section2() {
  const maxChars = 500;
  const [editorContent, setEditorContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageDate, setImageDate] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}blogsScreen/getBlogsPage`);
        if (
          response.data &&
          response.data.data &&
          response.data.data.section2
        ) {
          console.log("response", response.data.data.section2);
          setTitle(response.data.data.section2.title);
          setImageTitle(
            response.data.data.section2.blogs &&
              response.data.data.section2.blogs.title
          );
          setImageDate(
            response.data.data.section2.blogs &&
              response.data.data.section2.blogs.date
          );
          setImageAuthor(
            response.data.data.section2.blogs &&
              response.data.data.section2.blogs.author
          );
          setSectionData(response.data.data.section2);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleDeletePair = () => {
    setSelectedImage(null);
    setTitle("");
    setImageTitle("");
    setImageDate("");
    setImageAuthor("");
  };

  const handleBlogImageUpload = async (file, index) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(`${baseUrl}upload/image`, formData);

      // Update the image URL for the specific blog
      const updatedSectionData = { ...sectionData };
      updatedSectionData.blogs[index].imageUrl = response.data.imageUrl;
      setSectionData(updatedSectionData);
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const handleBlogDescriptionChange = (content, index) => {
    const updatedSectionData = { ...sectionData };
    updatedSectionData.blogs[index].description = content;
    setSectionData(updatedSectionData);
  };

  const onDrop = useCallback(
    (acceptedFiles, index) => {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      handleBlogImageUpload(file, index);
    },
    [sectionData]
  );

  const { getRootProps, getInputProps } = useDropzone({});

  return (
    <div className="">
      {/* Section header */}
      <div className="flex flex-col mt-[2rem] ml-[2rem]">
        <p className="w-full text-gray-600 text-lg ">
          <b>Section 1</b>
        </p>
        <p className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here
        </p>
      </div>
      {/* Buttons for actions */}
      <div className="flex gap-6 ml-[75%]">
        <button className="p-2 text-black bg-white border-2 border-black rounded-xl ">
          Cancel
        </button>
        <button className="text-white bg-purple-600 rounded-lg px-5 py-2.5">
          Save
        </button>
      </div>
      {/* Hero section title */}
      <div className="flex mt-[2rem] ml-[2rem] gap-[10rem]">
        <p className="text-lg text-black-800 font-bold">Hero Section Title</p>
        <input
          className="mt-0 p-2 w-[28rem] rounded-lg border-gray border-2"
          placeholder="BLOGS"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {sectionData &&
        sectionData.blogs &&
        Array.isArray(sectionData.blogs) &&
        sectionData.blogs.map((blog, index) => (
          <div key={index} className="flex mt-[2rem]">
            <div className="w-1/3"></div>
            <div className="w-auto mt-[2rem] -ml-[8rem] flex">
              <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap">
                {selectedImage && (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected Image"
                    className="w-auto h-40 object-cover rounded-lg mr-2"
                  />
                )}
                {!selectedImage && blog.imageUrl && (
                  <img
                    src={`${baseUrlImage}${blog.imageUrl}`}
                    alt="Blog Image"
                    className="w-auto h-40 object-cover rounded-lg mr-2"
                  />
                )}
                <div
                  {...getRootProps()}
                  className="bg-white rounded-lg border mt-[2rem] border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
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

                <IconButton
                  className="mt-2 bg-white border border-black"
                  onClick={() => handleDeletePair()}
                ></IconButton>
                {/* Display image title, date, and description */}
                <input
                  className="mt-0 p-2 w-[28rem] rounded-lg border-gray border-2"
                  placeholder="TITLE"
                  value={blog.title}
                  onChange={(e) =>
                    handleBlogAuthorChange(e.target.value, index)
                  }
                />
                <input
                  className="mt-[1rem] p-2 w-[28rem] rounded-lg border-gray border-2"
                  placeholder="AUTHOR"
                  value={blog.author}
                  onChange={(e) => handleBlogTitleChange(e.target.value, index)}
                />
                <input
                  className="mt-[1rem] p-2 w-[28rem] rounded-lg border-gray border-2"
                  placeholder="DATE"
                  value={blog.date}
                  onChange={(e) => handleBlogDateChange(e.target.value, index)}
                />
                <div className="flex mt-[2rem] ml-[2rem] gap-[10rem]">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <ReactQuill
                        theme="snow"
                        value={blog.description}
                        onChange={(content) =>
                          handleBlogDescriptionChange(content, index)
                        }
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
                <div className="flex justify-between gap-8 mt-8">
                  <button className="text-white bg-purple-600 rounded-lg px-5 py-2.5">
                    Show Details
                  </button>
                  <button className="text-white bg-purple-600 rounded-lg px-5 py-2.5">
                    Update
                  </button>
                  <button className="text-white bg-purple-600 rounded-lg px-5 py-2.5">
                    Delete
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
