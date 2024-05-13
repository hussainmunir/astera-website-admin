import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";
import { useParams } from "react-router-dom";

export function BlogDetail() {
  const [editorContent, setEditorContent] = useState("");
  const [editorContentHeading, setEditorContentHeading] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState("");
  const [sectionData, setSectionData] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setdeleteSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("blogId", id);

        const response = await axios.post(
          "https://backend.asteraporcelain.com/api/v1/blogsScreen/getBlogSection2ById",
          formData
        );

        if (response.data.data && response.data.data.blogDetails) {
          const initialSelectedImages = response.data.data.blogDetails.map(
            (blogDetail) => null
          );
          setSelectedImages(initialSelectedImages);
          setSectionData(response.data.data);
          setTitle(response.data.data.title);
          setEditorContentHeading(response.data.data.blogDetailsHeading);
          setEditorContent(response.data.data.description);
        } else {
          console.log("No blog data found.");
        }
      } catch (error) {
        console.log("Error fetching blog data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setCharCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
  };

  const handleEditorChangeHeading = (content, delta, source, editor) => {
    setEditorContentHeading(content);
    setCharCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
  };

  const onDrop = (acceptedFiles, index) => {
    const updatedImages = [...selectedImages];
    updatedImages[index] = acceptedFiles[0];
    setSelectedImages(updatedImages);
  };

  const handleUpdate = async (blogDetails_id, index) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", editorContent);
    formData.append("blogDetailsHeading", editorContentHeading);
    formData.append("blogId", id);
    formData.append("blogDetailsId", blogDetails_id);

    if (selectedImages[index]) {
      formData.append("imageUrl", selectedImages[index]);
    }
    console.log("selectedImage", selectedImages[index]);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const response = await axios.post(
        `${baseUrl}blogsScreen/updateSection1`,
        formData,
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

  const handleDelete = async (blogDetails_id) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("blogId", id);
    formData.append("blogDetailsId", blogDetails_id);
    try {
      const response = await axios.post(
        `${baseUrl}blogsScreen/removeBlogDetailsItem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      setdeleteSuccess(true);
    } catch (error) {
      console.error("Error updating section:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setdeleteSuccess(false);
      }, 3000);
    }
  };

  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mt-2 ml-2">
        <div className="mt-8">
          <label
            htmlFor="bio"
            className="ml-[2rem] text-lg font-medium text-gray-900"
          >
            Heading
          </label>
          <ReactQuill
            theme="snow"
            value={editorContentHeading}
            onChange={handleEditorChangeHeading}
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
              marginLeft: "30%",
              marginBottom: "40px",
              width: "600px",
              marginTop: "20px",
            }}
          />
          <div className="text-sm text-gray-600 ml-[30%]">
            {`${500 - charCount} characters left`}
          </div>
        </div>
      </div>
      {sectionData &&
        sectionData.blogDetails &&
        sectionData.blogDetails.map((blogDetails, index) => (
          <div className="mt-8" key={blogDetails._id}>
            <div className="">
              <input
                className="p-2 w-96 ml-[30%] rounded-lg border-gray border-2"
                placeholder="TITLE"
                value={title} // Bind value to the title state variable
                onChange={(e) => setTitle(e.target.value)} // Update title state variable
              />
              <ReactQuill
                theme="snow"
                value={editorContent} // Bind value to the editorContent state variable
                onChange={handleEditorChange} // Update editorContent state variable
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
                  marginLeft: "30%",
                  marginBottom: "40px",
                  width: "600px",
                  marginTop: "20px",
                }}
              />
              <div className="text-sm text-gray-600 ml-[30%]">
                {`${500 - charCount} characters left`}
              </div>
            </div>
            <div className="ml-[40%] mt-10">
              {selectedImages[index] ? (
                <img
                  src={URL.createObjectURL(selectedImages[index])}
                  alt="Selected"
                  className="w-auto h-40 object-cover rounded-lg mr-2"
                />
              ) : blogDetails && blogDetails.imageUrl ? (
                <img
                  src={`${baseUrlImage}${blogDetails.imageUrl}`}
                  alt="Initial Image"
                  className="w-auto h-40 object-cover rounded-lg mr-2"
                />
              ) : null}
              <div
                {...getRootProps()}
                className="bg-white rounded-lg w-[20rem] border mt-4 border-gray-200 p-4 flex flex-col items-center"
              >
                <input
                  {...getInputProps()}
                  onChange={(e) => onDrop(e.target.files, index)}
                />
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
              <div className="mt-[1rem]">
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <button
                    className="text-white ml-10 bg-purple-600 rounded-lg px-5 py-2.5"
                    onClick={() => handleUpdate(blogDetails._id, index)}
                  >
                    Update
                  </button>
                )}
                {saveSuccess && (
                  <div className="text-purple-600 ml-10 w-[7rem] bg-white- rounded-lg px-5 py-2.5">
                    Update successful!
                  </div>
                )}

                <button
                  className="text-white ml-10 bg-purple-600 rounded-lg px-5 py-2.5"
                  onClick={() => handleDelete(blogDetails._id)}
                >
                  Delete
                </button>
                {deleteSuccess && (
                  <div className="text-purple-600 ml-10 bg-white w-[7rem] rounded-lg px-5 py-2.5">
                    {deleteSuccess}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
