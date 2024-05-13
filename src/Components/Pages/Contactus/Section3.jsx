import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Section3 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [sectionData, setSectionData] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const maxChars = 500; // Set the max characters allowed
  const [title, setTitle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}homescreen/getAllCollections`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.contactPage &&
          response.data.data.contactPage.section3
        ) {
          const { section3 } = response.data.data.contactPage;
          setSectionData(section3);
          setTitle(section3.title);
          setEditorContent(section3.subTitle);
          setBackgroundColor(section3.backgroundColor);
          setFields(
            section3 && section3.contactFields && section3.contactFields
          );
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}homescreen/getAllCollections`
      );
      if (
        response.data &&
        response.data.data &&
        response.data.data.contactPage &&
        response.data.data.contactPage.section3
      ) {
        const { section3 } = response.data.data.contactPage;
        setSectionData(section3);
        setTitle(section3.title);
        setEditorContent(section3.subTitle);
        setBackgroundColor(section3.backgroundColor);
        setFields(
          section3 && section3.contactFields && section3.contactFields
        );
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleAddFields = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const handleSave = async () => {
    setLoading(true);

    // const requestData = new FormData();
    // requestData.append("title", title);
    // requestData.append("subTitle", editorContent);
    // requestData.append("backgroundColor", backgroundColor);

    // Append each contact field individually
    // fields.forEach((field, index) => {
    //   requestData.append(`contactFields[${index}][name]`, field.name);
    //   requestData.append(`contactFields[${index}][type]`, field.type);
    // });

    const updatedFields = fields.map((field) => {
      // Extract only the "name" and "type" properties
      const { name, type } = field;
      // Create a new object with the extracted properties
      return { name, type };
    });
    // requestData.append("contactFields", updatedFields);

    const requestData = {
      title: title,
      subTitle: editorContent,
      backgroundColor: backgroundColor,
      contactFields: updatedFields,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (selectedImage) {
      requestData.append("backgroundImage", selectedImage);
    }

    try {
      console.log("fields", fields);
      const response = await axios.post(
        `${baseUrl}contactScreen/updateSection3`,
        requestData,
        config
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
    }fetchData();
  };

  const handleCancel = () => {
    if (sectionData) {
      setTitle(sectionData.title);
      setEditorContent(sectionData.subTitle);
      setSelectedImage(null);

      // Set reset message
      setResetMessage("Fields reset successfully");

      // Clear reset message after 3 seconds
      setTimeout(() => {
        setResetMessage("");
      }, 3000);
    }
  };

  const updateFieldTitle = (name, index) => {
    const updatedFields = [...fields];
    updatedFields[index].name = name;
    console.log("name", name);
    setFields(updatedFields);
  };

  const updateFieldType = (name, index) => {
    const updatedFields = [...fields];
    updatedFields[index].type = name;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Handler for the editor change
  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setCharCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
  };

  // Quill modules to attach to editor
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
      matchVisual: false,
    },
  };

  // Quill formats to attach to editor
  const textInputTypes = [
    "text",
    "textarea",
    "phone",
    "password",
    "email",
    "tel",
    "number",
    "date",
    "time",
  ];

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
      <div className="max-w-lg ml-[2rem] mt-[2rem]">
        <div className="hidden md:flex items-center justify-between mb-[1rem]">
          <div className="w-full flex flex-col">
            <div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
              Section 3
            </div>
            <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
              Update desired photo and details here.
            </div>
          </div>
          {loading ? (
            <CircularProgress size={24} color="inherit" className="absolute ml-[87rem]"/>
          ) : (
            <button
              className="text-white bg-purple-600 rounded-lg px-3 py-2 absolute ml-[87rem]"
              onClick={handleSave}
            >
              Save
            </button>
          )}
          {saveSuccess && (
            <div className="text-green-600 absolute mt-[5rem] ml-[87rem]">
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
            <div className="text-red-600 absolute ml-[81rem] mt-[5rem]">
             Fields Reset Successfully
            </div>
          )}
        </div>

        <div className="flex items-center">
          <label className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap">
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
          </div>
        </div>
        <div className="flex items-center">
          <label className="block text-lg font-semibold mb-1 mr-[25rem] mt-10 whitespace-nowrap">
            Background Color
          </label>
          <div className="flex">
            <input
              type="text"
              className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black mr-[2rem]"
              placeholder="Background Color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
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
              modules={modules}
              formats={formats}
              placeholder="Write a short introduction."
              style={{ height: "200px", marginBottom: "40px", width: "600px" }}
            />
            <div className="text-sm ml-1 text-gray-600">
              {`${maxChars - charCount} characters left`}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10">
        <div className="w-1/3">
          <label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1">
            Background Image{" "}
            <HelpOutlineIcon
              style={{
                fontSize: 16,
                color: "gray",
                backgroundColor: "white",
              }}
            />
          </label>
          <p className="text-xs text-gray-500 mb-2 ml-[2rem]">
            This will be displayed on section3 background.
          </p>
        </div>
        <div className="w-full mt-[2rem] ml-[16rem] flex justify-start">
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

      <div className="max-w-lg ml-[2rem] mt-[5rem]">
        <div className="flex items-center">
          <label
            htmlFor="fields"
            className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap"
          >
            Update Fields
          </label>
          <div>
            {fields.map((item, index) => (
              <div key={index} className="flex flex-row">
                <input
                  type="text"
                  className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black mb-2"
                  placeholder="Name"
                  value={item.name}
                  onChange={(e) => updateFieldTitle(e.target.value, index)}
                />
                <select
                  className="w-auto border border-gray-300 rounded-lg px-3 py-2 mx-5 focus:outline-none focus:border-black mb-2"
                  value={item.type}
                  onChange={(e) => updateFieldType(e.target.value, index)}
                >
                  {textInputTypes.map((format, formatIndex) => (
                    <option key={formatIndex} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
                <IconButton
                  className="absolute bottom-1 bg-white"
                  onClick={() => removeField(index)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
        <label
          htmlFor="fields"
          className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap"
        >
          Add New Field
        </label>

        {/* Add button */}
        <div>
          <div className="flex mt-4 ml-[39rem]">
            <div className="flex flex-row justify-center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddFields}
              >
                Add <AddIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-l border-black m-[2rem] "></div>
    </div>
  );
};

export default Section3;
