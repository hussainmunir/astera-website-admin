import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Switch } from "@mui/material";

const Section6 = () => {
  const [editorContent, setEditorContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [image1, setImage1] = useState(null); // State for image 1
  const [supportiveImages, setSupportiveImages] = useState([]); // State for supportive images
  const [inputEnabled, setInputEnabled] = useState(false);
  const [inputText, setInputText] = useState("");
  const maxChars = 500;

  const onDropImage1 = useCallback((acceptedFiles) => {
    setImage1(acceptedFiles[0]);
  }, []);

  const onDropSupportiveImages = useCallback(
    (acceptedFiles) => {
      setSupportiveImages([...supportiveImages, ...acceptedFiles]);
    },
    [supportiveImages]
  );

  const {
    getRootProps: getRootPropsImage1,
    getInputProps: getInputPropsImage1,
  } = useDropzone({
    onDrop: onDropImage1,
    accept: "image/*",
    multiple: false,
  });

  const {
    getRootProps: getRootPropsSupportiveImages,
    getInputProps: getInputPropsSupportiveImages,
  } = useDropzone({
    onDrop: onDropSupportiveImages,
    accept: "image/*",
    multiple: true,
  });

  // Handler for the editor change
  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setCharCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
  };

  const handleDeleteImage = (indexToRemove) => {
    setSupportiveImages((prevImages) =>
      prevImages.filter((image, index) => index !== indexToRemove)
    );
  };

  const handleToggleChange = () => {
    setInputEnabled(!inputEnabled); // Toggle the input field enable/disable state
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
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
    <>
      <div>
        <div className="max-w-lg ml-[2rem] mt-[2rem]">
          <div className="hidden md:flex items-center justify-between mb-[1rem]">
            <div className="w-full flex flex-col">
              <div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
                Section 6
              </div>
              <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
                Update desired photo and details here.
              </div>
            </div>
            <button className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute ml-[87%] ">
              Save
            </button>
            <button className="text-black bg-white border-2 border-black rounded-2xl px-3 py-2 absolute ml-[79rem] ">
              Cancel
            </button>
          </div>

          <div className="flex items-center">
            <label className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap">
              Name
            </label>
            <div className="flex">
              <input
                type="text"
                className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black mr-[2rem]"
                placeholder="HEADING"
              />
              <input
                type="text"
                className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                placeholder="PARAGRAPH"
              />
            </div>
          </div>

          {/* <div className="flex mt-[2rem]">
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
					</div> */}

          <div className="flex mt-4 items-center">
            <div className="flex mt-4 items-center">
              <div className="mr-4">
                <span className="mb-0 ml-2 font-extrabold whitespace-nowrap">
                  Add Supportive Dot
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
                  placeholder="Input Field"
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
          {/* Second toggle */}
          <div className="flex mt-4 items-center">
            <div className="flex mt-4 items-center">
              <div className="mr-4">
                <span className="mb-0 ml-2 font-extrabold whitespace-nowrap">
                  Add Supportive Dot
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
                  placeholder="Input Field"
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
          {/* Third Toggle  */}
          <div className="flex mt-4 items-center">
            <div className="flex mt-4 items-center">
              <div className="mr-4">
                <span className="mb-0 ml-2 font-extrabold whitespace-nowrap">
                  Add Supportive Dot
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
                  placeholder="Input Field"
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
        </div>

        <div>
          {/* Image 1 */}
          <div className="flex items-center justify-between">
            <div className="w-1/3">
              <label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1">
                Image 1{" "}
                <HelpOutlineIcon
                  style={{
                    fontSize: 16,
                    color: "gray",
                    backgroundColor: "white",
                  }}
                />
              </label>
              <p className="text-xs text-gray-500 mb-2 ml-[2rem]">
                This will be displayed on your Section 3.
              </p>
            </div>
            <div className="w-full mt-[2rem] ml-[22rem] flex justify-start">
              {image1 && (
                <img
                  src={URL.createObjectURL(image1)}
                  alt="Uploaded"
                  className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
                />
              )}
              <div
                {...getRootPropsImage1()}
                className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
              >
                <input {...getInputPropsImage1()} />
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

          {/* Supportive Images */}
          <div className="flex items-center justify-between">
            <div className="w-1/3">
              <label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1 whitespace-nowrap">
                Supportive Images{" "}
                <HelpOutlineIcon
                  style={{
                    fontSize: 16,
                    color: "gray",
                    backgroundColor: "white",
                  }}
                />
              </label>
              <p className="text-xs text-gray-500 mb-2 ml-[2rem]">
                This will be displayed on your Section 3.
              </p>
            </div>
            <div className="w-full mt-[2rem] ml-[22rem] flex justify-start">
              <div className="flex gap-4">
                {supportiveImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      className="w-40 h-40 object-cover"
                      style={{ objectFit: "cover" }}
                    />
                    <IconButton
                      className="absolute top-1 right-0 m-2 bg-white"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
              <div
                {...getRootPropsSupportiveImages()}
                className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center ml-4"
              >
                <input {...getInputPropsSupportiveImages()} />
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
    </>
  );
};

export default Section6;
