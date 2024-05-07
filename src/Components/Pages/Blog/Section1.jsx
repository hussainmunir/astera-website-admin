import { useState, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import { useDropzone } from "react-dropzone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Switch } from "@mui/material";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";
import CircularProgress from "@mui/material/CircularProgress";

export function Section1() {
  const maxChars = 500;
  const [editorContent, setEditorContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleToggleChange = () => {
    setInputEnabled(!inputEnabled); // Toggle the input field enable/disable state
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}blogsScreen/getBlogsPage`);
        if (
          response.data &&
          response.data.data &&
          response.data.data.section1
        ) {
          setTitle(response.data.data.section1.title);
          setEditorContent(response.data.data.section1.subTitle);
          setInputText(response.data.data.section1.buttonText);
          setSectionData(response.data.data.section1);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}blogsScreen/getBlogsPage`);
      if (
        response.data &&
        response.data.data &&
        response.data.data.section1
      ) {
        setTitle(response.data.data.section1.title);
        setEditorContent(response.data.data.section1.subTitle);
        setInputText(response.data.data.section1.buttonText);
        setSectionData(response.data.data.section1);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // Handler for the editor change
  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setCharCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", editorContent);
    formData.append("buttonText", inputText);

    if (selectedImage) {
      formData.append("backgroundImage", selectedImage); // Use "backgroundImage" instead of "backgroundImageUrl"
    }

    try {
      const response = await axios.post(
        `${baseUrl}blogsScreen/updateSection1`, // Use `${baseUrl}blogsScreen/updateSection1` instead of hardcoded URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Save successful:", response.data);
      setSaveSuccess(true);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      fetchData();
    }
  };

  const handleCancel = () => {
    if (sectionData) {
      setTitle(sectionData.title);
      setEditorContent(sectionData.subTitle);
      setSelectedImage(null);
      setResetMessage("Fields reset successfully");
      setTimeout(() => {
        setResetMessage("");
      }, 3000);
      fetchData();
    }
  };
  return (
    <div className="">
      <div className="flex flex-col mt-[2rem] ml-[2rem]">
        <p className="w-full text-gray-600 text-lg ">
          <b>Section 1</b>
        </p>
        <p className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here
        </p>
      </div>
      <div className="flex gap-6 ml-[75%]">
        <button
          className="p-2 text-black bg-white border-2 border-black rounded-xl "
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
            className="text-white bg-purple-600 rounded-lg px-5 py-2.5"
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
      <div className="flex mt-[2rem] ml-[2rem] gap-[10rem]">
        <p className=" text-lg text-black-800 font-bold">Hero Section Title</p>
        <input
          className="mt-0 p-2 w-[28rem] rounded-lg border-gray border-2"
          placeholder="BLOGS"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex mt-[2rem] ml-[2rem] gap-[10rem]">
        <label htmlFor="bio" className="text-lg font-medium text-gray-900">
          Bio
          <br />
          <span className="font-light text-sm whitespace-nowrap">
            Write a short introduction.
          </span>
        </label>
        <div className="flex flex-col">
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

      <div className="flex mt-[2rem]">
        <div className="w-1/3">
          <label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1">
            Image{" "}
            <HelpOutlineIcon
              style={{ fontSize: 16, color: "gray", backgroundColor: "white" }}
            />
          </label>
          <p className="text-xs text-gray-500 mb-2 ml-[2rem] whitespace-nowrap">
            This will be displayed on your Hero Section.
          </p>
        </div>
        <div className="w-auto mt-[2rem] -ml-[8rem] flex">
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
            className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
          >
            <input {...getInputProps()} />
            <img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
      </div>
      <div className="flex mt-[4rem] items-center">
        <div className="ml-[2rem]">
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
            className="border ml-[10rem] border-gray-300 rounded-lg px-3 py-2 "
            placeholder={inputEnabled ? inputText : inputText}
            disabled={!inputEnabled}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}
