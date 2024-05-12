import React, { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import { useDropzone } from "react-dropzone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";


export function Section2() {
  const navigate = useNavigate();
  const [addSelectedImage, setAddSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setdeleteSuccess] = useState("");
  const maxChars = 500;
  const [editorContent, setEditorContent] = useState("");
  const [editorAddContent, setEditorAddContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [charAddCount, setCharAddCount] = useState(0);
  
  const [selectedImage, setSelectedImage] = useState([]);
  const [title, setTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageDate, setImageDate] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [sectionData, setSectionData] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}blogsScreen/getBlogsPage`);
        if (
          response.data &&
          response.data.data &&
          response.data.data.section2
        ) {
          const section2Data = response.data.data.section2;
          setTitle(section2Data.title);
          setImageTitle(section2Data.blogs && section2Data.blogs.title);
          setImageDate(section2Data.blogs && section2Data.blogs.date);
          setImageAuthor(section2Data.blogs && section2Data.blogs.author);
          setSectionData(section2Data);
          setDetails(section2Data.blogs || []);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleEditorAddChange = (content, delta, source, editor) => {
    setEditorAddContent(content);
    setCharAddCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedImage([...selectedImage, file]);
  };

  const handleBlogDescriptionChange = (content, index) => {
    const updatedDetails = [...details];
    updatedDetails[index].description = content;
    setDetails(updatedDetails);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}blogsScreen/getBlogsPage`);
      if (response.data && response.data.data && response.data.data.section2) {
        const section2Data = response.data.data.section2;
        setTitle(section2Data.title);
        setImageTitle(section2Data.blogs && section2Data.blogs.title);
        setImageDate(section2Data.blogs && section2Data.blogs.date);
        setImageAuthor(section2Data.blogs && section2Data.blogs.author);
        setSectionData(section2Data);
        setDetails(section2Data.blogs || []);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onDropImage1 = useCallback((acceptedFiles) => {
    setAddSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } =
    useDropzone({
      onDrop: onDropImage1,
      accept: "image/*",
      multiple: false,
    });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleShowDetail = async (blogId) => {
    navigate(`/BlogDetail/${blogId}`);
  };

  const handleUpdate = async (blogId, index) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", details[index].title);
    formData.append("description", details[index].description);
    formData.append("date", details[index].date);
    formData.append("author", details[index].author);
    formData.append("blogId", blogId);

    if (selectedImage[index]) {
      formData.append("imageUrl", selectedImage[index]);
    }

    try {
      const response = await axios.post(
        `${baseUrl}blogsScreen/updateBlogItem`,
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
    fetchData();
  };

  const handleDelete = async (blog_id, index) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("blogItemId", blog_id);
    try {
      const response = await axios.post(
        `${baseUrl}blogsScreen/removeBlogItem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Delete successful:", response.data);
      const updatedDetails = [...details];
      updatedDetails.splice(index, 1);
      setDetails(updatedDetails);
      setdeleteSuccess(true);
    } catch (error) {
      console.error("Error updating section:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setdeleteSuccess(false);
      }, 3000);
    }
    fetchData();
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (addSelectedImage) {
        formData.append("imageUrl", addSelectedImage);
      }
      formData.append("title", imageTitle);
      formData.append("author", imageAuthor);
      formData.append("date", imageDate);
      formData.append("description", editorAddContent);

      const response = await axios.post(
        `${baseUrl}blogsScreen/addBlogItem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Add successful:", response.data);
      fetchData();
      setSaveSuccess(true);
      setSelectedImage([]);
      setAddSelectedImage(null);
      setTitle("");
      setImageTitle("");
      setImageDate("");
      setImageAuthor("");
      setDetails([]);
      setEditorAddContent("");
      setLoading(false);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (error) {
      setLoading(false);
      console.error("Error saving data:", error);
    }
  };


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
    <div className="">
      <div className="flex flex-col mt-[2rem] ml-[2rem]">
        <p className="w-full text-gray-600 text-lg ">
          <b>Section 2</b>
        </p>
        <p className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here
        </p>
      </div>
      <div className="flex mt-[2rem] ml-[2rem] gap-[10rem]">
        <p className="text-lg text-black-800 font-bold">Hero Section Title</p>
        <input
          className="mt-0 p-2 w-[28rem] rounded-lg border-gray border-2"
          placeholder="BLOGS"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="bg-white w-[43%] ml-[25rem] mt-[4rem] rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap">
        <p className="text-2xl font-bold">Add a New Blog </p>
        <div className="w-full ml-[1rem] mt-4  flex flex-col items-center">
          {addSelectedImage && addSelectedImage instanceof File && (
            <img
              src={URL.createObjectURL(addSelectedImage)}
              alt="Uploaded Image"
              className="w-40 h-40 mt-2 rounded-lg"
              style={{ maxHeight: "200px" }}
            />
          )}
          <div
            {...getRootPropsImage()}
            className="bg-white rounded-lg border mt-[2rem] border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
          >
            <input {...getInputPropsImage()} />
            <img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
          <input
                  className="p-2 w-[28rem] mt-[3rem] rounded-lg border-gray border-2"
                  placeholder="TITLE"
                  type="text"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}

                  
                />
                <input
                  className="mt-[1rem] p-2 w-[28rem] rounded-lg border-gray border-2"
                  placeholder="AUTHOR"
                 type="text"
                 value={imageAuthor}
                 onChange={(e) => setImageAuthor(e.target.value)}
                  
                />
                <input
                  className="mt-[1rem] p-2 w-[28rem] rounded-lg border-gray border-2"
                  placeholder="DATE"
                  type="text"
                  value={imageDate}
                  onChange={(e) => setImageDate(e.target.value)}
                />
           <div className="flex flex-col">
              <ReactQuill
                theme="snow"
                value={editorAddContent}
                onChange={handleEditorAddChange}
                modules={modules}
                formats={formats}
                placeholder="Write a short introduction."
                style={{
                  height: "200px",
                  marginBottom: "40px",
                  marginTop: "10px",
                  width: "650px",
                }}
              />
              <div className="text-sm ml-1 text-gray-600">
                {`${maxChars - charCount} characters left`}
              </div>
              </div>
              {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <button
                      className="text-white bg-purple-600 rounded-lg px-5 py-2.5"
                      onClick={() => handleAdd()}
                    >
                      Add
                    </button>
                  )}
                
        </div>
      </div>

      {/* update Section */}
      <p className="text-2xl font-bold text-center mt-[5rem]">Update Blogs </p>
      {sectionData &&
        sectionData.blogs &&
        Array.isArray(sectionData.blogs) &&
        sectionData.blogs.map((blog, index) => (
          <div key={index} className="flex ">
            <div className="w-1/3">
            </div>
            <div className="w-auto mt-[2rem] -ml-[8rem] flex">
             
              <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap">
              <p className="text-lg text-black-800 font-bold my-2">
                Blog {index + 1}
              </p>
                {selectedImage && selectedImage[index] && (
                  <img
                    src={URL.createObjectURL(selectedImage[index])}
                    alt="Selected Image"
                    className="w-auto h-40 object-cover rounded-lg mr-2"
                  />
                )}
                {(!selectedImage || !selectedImage[index]) && blog.imageUrl && (
                  <img
                    src={`${baseUrlImage}${blog.imageUrl}`}
                    alt="Blog Image"
                    className="w-auto h-40 object-cover rounded-lg mr-2"
                  />
                )}

                {(!selectedImage || !selectedImage[index]) &&
                  !blog.imageUrl && (
                    <div className="w-auto h-40 bg-gray-200 rounded-lg mr-2" /> // Placeholder image or some other UI indication
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
                <input
                  className="mt-0 p-2 w-[28rem] rounded-lg border-gray border-2"
                  placeholder="TITLE"
                  value={blog.title}
                  onChange={(e) => {
                    const updatedBlogs = [...sectionData.blogs];
                    updatedBlogs[index].title = e.target.value;
                    setSectionData({ ...sectionData, blogs: updatedBlogs });
                  }}
                />
                <input
                  className="mt-[1rem] p-2 w-[28rem] rounded-lg border-gray border-2"
                  placeholder="AUTHOR"
                  value={blog.author}
                  onChange={(e) => {
                    const updatedBlogs = [...sectionData.blogs];
                    updatedBlogs[index].author = e.target.value;
                    setSectionData({ ...sectionData, blogs: updatedBlogs });
                  }}
                />
                <input
                  className="mt-[1rem] p-2 w-[28rem] rounded-lg border-gray border-2"
                  placeholder="DATE"
                  value={blog.date}
                  onChange={(e) => {
                    const updatedBlogs = [...sectionData.blogs];
                    updatedBlogs[index].date = e.target.value;
                    setSectionData({ ...sectionData, blogs: updatedBlogs });
                  }}
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
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <button
                      className="text-white bg-purple-600 rounded-lg px-5 py-2.5"
                      onClick={() => handleShowDetail(blog._id)}
                    >
                      Show Details
                    </button>
                  )}
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <button
                      className="text-white bg-purple-600 rounded-lg px-5 py-2.5"
                      onClick={() => handleUpdate(blog._id, index)}
                    >
                      Update
                    </button>
                  )}
                  {saveSuccess && (
                    <div className="text-purple-600 w-[7rem] absolute mt-[3rem] ml-[6rem] bg-white- rounded-lg px-5 py-2.5">
                      Update successful!
                    </div>
                  )}
                  <button
                    className="text-white bg-purple-600 rounded-lg px-5 py-2.5"
                    onClick={() => handleDelete(blog._id, index)}
                  >
                    Delete
                  </button>{" "}
                  {deleteSuccess && (
                    <div className="text-purple-600 bg-white absolute ml-[10rem] w-[7rem] rounded-lg px-5 py-2.5">
                      deleteSuccess
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}






      
    </div>
  );
}
