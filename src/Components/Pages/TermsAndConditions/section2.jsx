import React, { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { baseUrl } from "../../../api/base_urls";
import { Subtitles } from "@mui/icons-material";

export function Section2() {
  const [editorContent, setEditorContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500; // Set the max characters allowed
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [title, setTitle] = useState("");
  const [sectionData, setSectionData] = useState(null);

  // Handler for the editor change
  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setCharCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}homescreen/getAllCollections`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.termsAndConditionsPage
        ) {
          const termsAndConditionsPage = response.data.data.termsAndConditionsPage;
          if (termsAndConditionsPage.section2) {
            const { section2 } = termsAndConditionsPage;
            setTitle(section2.title || "");
            setEditorContent(section2.privacyText || "");
            setSectionData(section2);
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
    try {
      setLoading(true);
      const requestData = new FormData();
      requestData.append("title", title);
      requestData.append("privacyText",editorContent)
     
      const response = await axios.post(
        `${baseUrl}privacyPolicyScreen/updateSection2`,
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Save successful:", response.data);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving data:", error);
   
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (sectionData) {
      setTitle(sectionData.title);
      setSelectedImage(null);
      setResetMessage("Fields reset successfully");
      setTimeout(() => {
        setResetMessage("");
      }, 3000);
    }
  };
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
        <p className="w-full text-gray-600 text-lg max-md:max-w-full">
          <b>Section 2</b>
        </p>
        <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here.
        </div>
        <div className="flex ml-[80%] gap-4 -mt-8">
          <button
            className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
            onClick={handleCancel}
          >
            Cancel
          </button>
          {resetMessage && (
            <div className="text-red-600 mt-[5rem] absolute ml-[80%]">
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
            <div className="text-green-600 absolute mt-[5rem] ml-[87%]">
              Save successful!
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row">
        <label className="block text-lg font-semibold mt-[2rem] ml-[2rem] whitespace-nowrap">
          Title
        </label>
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="PRIVACY POLICY"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            <div className="flex flex-col -ml-[12rem] mt-6">
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
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section2;
