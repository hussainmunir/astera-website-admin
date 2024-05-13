import React, { useState, useCallback, useDebugValue, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IconButton, Switch } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import uploadsvg from "../../../Images/UploadIcons.png";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";
import image from "../../../assets/images.jpg";

export function Section2() {
  const [file, setFile] = useState(null); // Changed to single file state
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputDownloadEnabled, setInputDownloadEnabled] = useState(false);
  const [inputDownloadText, setInputDownloadText] = useState("");
  const [inputViewEnabled, setInputViewEnabled] = useState(false);
  const [inputViewText, setInputViewText] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [buttonDownloadText, setButtonDownloadText] = useState("");
  const [buttonViewText, setButtonViewText] = useState("");
  const [sectionData, setSectionData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}catalogsScreen/getCatalogsPage`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.section2
        ) {
          const section2 = response.data.data.section2;
          setTitle(section2.title);
          setSubTitle(section2.subTitle);
          setButtonViewText(section2.viewBtnText);
          setButtonDownloadText(section2.downloadBtnText);
          setSectionData(section2);
          console.log("fetchData", sectionData);
        }
      } catch (error) {
        console.log("fetchingError", error);
      }
    };
    fetchData();
  }, []);

  const handleFileUpload = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]); // Only set the first file
    }
  }, []);

  const handleImageUpload = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedImage(acceptedFiles[0]);
    }
  }, []);

  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleDownloadToggleChange = () => {
    setInputDownloadEnabled(!inputDownloadEnabled);
    if (!inputDownloadEnabled) {
      setInputDownloadText("");
    }
  };

  const handleDownloadInputChange = (e) => {
    setInputDownloadText(e.target.value);
  };

  const handleViewToggleChange = () => {
    setInputViewEnabled(!inputViewEnabled);
    if (!inputViewEnabled) {
      setInputViewText("");
    }
  };
  const handleViewInputChange = (e) => {
    setInputViewText(e.target.value);
  };

  const downloadPdf = async (fileUrl) => {
    try {
      if (!fileUrl) {
        console.error("File URL is not available.");
        return;
      }

      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "filename.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const viewPdf = async (fileUrl) => {
    try {
      if (!fileUrl) {
        console.error("File URL is not available.");
        return;
      }

      // Open the PDF file in a new tab
      window.open(fileUrl, "_blank");

      // Or display the PDF file within an iframe
      // You can uncomment the lines below to display the PDF within an iframe
      const pdfViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
        fileUrl
      )}`;
      window.open(pdfViewerUrl, "_blank");
    } catch (error) {
      console.error("Error viewing PDF:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("backgroundImage", selectedImage);
      }
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      if (file) {
        formData.append("pdfFile", file);
      }
      formData.append("downloadBtnText", buttonDownloadText);
      formData.append("viewBtnText", buttonViewText);

      const response = await axios.post(
        `${baseUrl}catalogsScreen/addToSection2`,
        formData,
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
    }
  };


  const handleUpdate = async (catalogId, index) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", sectionData[index].title);
    formData.append("subTitle", sectionData[index].subTitle);
    formData.append("pdfFile", sectionData[index].file);
    formData.append("backgroundImage", sectionData[index].selectedImage);
    formData.append("downloadBtnText",sectionData[index])
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


  const { getRootProps: getRootPropsFiles, getInputProps: getInputPropsFiles } =
    useDropzone({
      onDrop: handleFileUpload,
      accept: "application/pdf", // Accept only PDF files
      multiple: false, // Allow only single file upload
    });

  const {
    getRootProps: getRootPropsImages,
    getInputProps: getInputPropsImages,
  } = useDropzone({
    onDrop: handleImageUpload,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="Section2">
      <div>
        <button
          className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute ml-[90%]"
          onClick={handleAdd}
        >
          Add
        </button>
        <div className="flex gap-4 absolute ml-[23%]">
          <div className="flex">
            <input
              type="text"
              className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex">
            <input
              type="text"
              className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
              placeholder="Sub-Title"
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-4 ml-[21rem]">
            <div
              {...getRootPropsFiles()}
              className="bg-white rounded-lg border border-gray-200 p-4 w-[18rem] h-[10rem] mt-[4rem] ml-[6.5rem] flex flex-col items-center"
            >
              <input {...getInputPropsFiles()} />
              <img
                src={uploadsvg}
                alt="Upload Icon"
                className="w-12 h-12 mb-2"
              />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload files or drag and drop (PDF only)
              </p>
            </div>
            {file && (
              <div className="flex items-center">
                <div className="w-full mt-[2rem] ml-[6.5rem] flex flex-col justify-start">
                  <img
                    src={image}
                    alt="Upload Icon"
                    className="w-12  ml-4 h-12 mb-2"
                  />
                  <p className="text-gray-800">{file.name}</p>
                  <IconButton
                    className="mt-2 bg-white border border-black"
                    onClick={handleDeleteFile}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row ml-[21rem]">
            {" "}
            <div
              {...getRootPropsImages()}
              className="bg-white rounded-lg border border-gray-200 p-4 w-[18rem] h-[10rem] mt-[4rem] ml-[6.5rem] flex flex-col items-center"
            >
              <input {...getInputPropsImages()} />
              <img
                src={uploadsvg}
                alt="Upload Icon"
                className="w-12 h-12 mb-2"
              />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload images or drag and drop
              </p>
              <p className="text-sm text-gray-600">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
            {selectedImage && (
              <div className="flex items-center justify-between">
                <div className="w-full mt-[4rem] ml-[6.5rem] flex justify-start">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded"
                    className="w-auto h-40 object-cover rounded-lg mr-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex mt-4 items-center">
          <div className="mr-4">
            <span className="mb-0 ml-2 font-extrabold whitespace-nowrap">
              Download Button
            </span>
            <Switch
              checked={inputDownloadEnabled}
              onChange={handleDownloadToggleChange}
              color="primary"
            />
            <span></span>
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              className="border ml-[14rem] border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
              placeholder={inputDownloadEnabled ? "Input Field" : "Button Text"}
              value={
                inputDownloadEnabled ? inputDownloadText : buttonDownloadText
              } // Use inputText when editing, otherwise use buttonText
              onChange={handleDownloadInputChange}
              disabled={!inputDownloadEnabled}
            />
          </div>
          {inputDownloadEnabled && (
            <div className="bg-black text-white px-3 py-2 border whitespace-nowrap rounded-lg ml-[2rem]">
              {inputDownloadText}
            </div>
          )}
        </div>
        <div className="flex mt-4 items-center">
          <div className="flex mt-4 items-center">
            <div className="mr-4">
              <span className="mb-0 ml-2 font-extrabold whitespace-nowrap">
                View Button
              </span>
              <Switch
                checked={inputViewEnabled}
                onChange={handleViewToggleChange}
                color="primary"
              />
              <span></span>
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                className="border ml-[16.5rem] border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                placeholder={inputViewEnabled ? "Input Field" : "Button Text"}
                value={inputViewEnabled ? inputViewText : buttonViewText} // Use inputText when editing, otherwise use buttonText
                onChange={handleViewInputChange}
                disabled={!inputViewEnabled}
              />
            </div>
            {inputViewEnabled && (
              <div className="bg-black text-white px-3 py-2 border whitespace-nowrap rounded-lg ml-[2rem]">
                {inputViewText}
              </div>
            )}
          </div>
        </div>
        <hr
          className="my-8 border-black border-empty border-1"
          style={{ width: "100%" }}
        />
      </div>

      {sectionData &&
        Array.isArray(sectionData) &&
        sectionData.map((sectionData, index) => (
          <div>
            <div className="flex gap-4 flex-row ml-[80%]">
              <button className="text-white bg-purple-600 rounded-lg px-5 py-2.5 ">
                Delete
              </button>
              <button className="text-white bg-purple-600 rounded-lg px-5 py-2.5 ">
                Update
              </button>
            </div>
            <div className="flex gap-4 absolute ml-[23%]">
              <div className="flex">
                <input
                  type="text"
                  className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
                  placeholder="Title"
                  value={sectionData.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
                  placeholder="Sub-Title"
                  value={sectionData.subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-4 ml-[21rem]">
                <div
                  {...getRootPropsFiles()}
                  className="bg-white rounded-lg border border-gray-200 p-4 w-[18rem] h-[10rem] mt-[4rem] ml-[6.5rem] flex flex-col items-center"
                >
                  <input {...getInputPropsFiles()} />
                  <img
                    src={uploadsvg}
                    alt="Upload Icon"
                    className="w-12 h-12 mb-2"
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload files or drag and drop (PDF only)
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-full mt-[2rem] ml-[6.5rem] flex flex-col justify-start">
                    {file ? (
                      <div>
                        <img
                          src={image}
                          alt="Upload Icon"
                          className="w-12 h-12 mb-2 flex justify-center items-center"
                          style={{ margin: "auto" }}
                        />
                        <p className="text-gray-800">{file.name}</p>
                      </div>
                    ) : (
                      sectionData &&
                      sectionData.fileUrl && (
                        <div>
                          <img
                            src={image}
                            alt="Upload Icon"
                            className="w-12 h-12 mb-2 flex justify-center items-center"
                            style={{ margin: "auto" }}
                          />
                          <p className="text-gray-800">{sectionData.fileUrl}</p>
                        </div>
                      )
                    )}

                    <IconButton
                      className="mt-2 bg-white border border-black"
                      onClick={handleDeleteFile}
                    >
                      <CloseIcon />
                    </IconButton>
                    <div className="flex flex-row gap-4 ml-4">
                      <button
                        className="text-white bg-purple-600 rounded-lg px-5 py-2.5 "
                        onClick={() => downloadPdf(sectionData.fileUrl)}
                      >
                        Download
                      </button>
                      <button
                        className="text-white bg-purple-600 rounded-lg px-5 py-2.5 "
                        onClick={() => viewPdf(sectionData.fileUrl)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row ml-[21rem]">
                {" "}
                <div
                  {...getRootPropsImages()}
                  className="bg-white rounded-lg border border-gray-200 p-4 w-[18rem] h-[10rem] mt-[4rem] ml-[6.5rem] flex flex-col items-center"
                >
                  <input {...getInputPropsImages()} />
                  <img
                    src={uploadsvg}
                    alt="Upload Icon"
                    className="w-12 h-12 mb-2"
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload images or drag and drop
                  </p>
                  <p className="text-sm text-gray-600">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
                {selectedImage && (
                  <div className="flex items-center justify-between">
                    <div className="w-full mt-[4rem] ml-[6.5rem] flex justify-start">
                      {selectedImage ? (
                        <img
                          src={
                            typeof selectedImage === "string"
                              ? selectedImage
                              : URL.createObjectURL(selectedImage)
                          }
                          alt="Uploaded"
                          className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
                        />
                      ) : sectionData.backgroundImage ? (
                        <img
                          src={`${baseUrlImage}${sectionData.backgroundImage}`}
                          alt="uploaded"
                          className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex mt-4 items-center">
              <div className="mr-4">
                <span className="mb-0 ml-2 font-extrabold whitespace-nowrap">
                  Download Button
                </span>
                <Switch
                  checked={inputDownloadEnabled}
                  onChange={handleDownloadToggleChange}
                  color="primary"
                />
                <span></span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="border ml-[14rem] border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                  placeholder={
                    inputDownloadEnabled
                      ? "Input Field"
                      : "Button Download Text"
                  }
                  value={
                    inputDownloadEnabled
                      ? inputDownloadText
                      : buttonDownloadText
                  }
                  disabled={!inputDownloadEnabled}
                />
              </div>
              {inputDownloadEnabled && (
                <div className="bg-black text-white px-3 py-2 border whitespace-nowrap rounded-lg ml-[2rem]">
                  {inputDownloadText}
                </div>
              )}
            </div>
            <div className="flex mt-4 items-center">
              <div className="flex mt-4 items-center">
                <div className="mr-4">
                  <span className="mb-0 ml-2 font-extrabold whitespace-nowrap">
                    View Button
                  </span>
                  <Switch
                    checked={inputViewEnabled}
                    onChange={handleViewToggleChange}
                    color="primary"
                  />
                  <span></span>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="border ml-[16.5rem] border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                    placeholder={
                      inputViewEnabled ? "Input Field" : "Button View Text"
                    }
                    value={inputViewEnabled ? inputViewText : buttonViewText}
                    onChange={handleViewInputChange}
                    disabled={!inputViewEnabled}
                  />
                </div>
                {inputViewEnabled && (
                  <div className="bg-black text-white px-3 py-2 border whitespace-nowrap rounded-lg ml-[2rem]">
                    {inputViewText}
                  </div>
                )}
              </div>
            </div>
            <hr
              className="my-8 border-black border-empty border-1"
              style={{ width: "100%" }}
            />
          </div>
        ))}
    </div>
  );
}
