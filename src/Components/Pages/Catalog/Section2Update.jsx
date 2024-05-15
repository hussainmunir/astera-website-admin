import React, { useState, useCallback, useDebugValue, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IconButton, Switch } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import uploadsvg from "../../../Images/UploadIcons.png";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";
import image from "../../../assets/astera.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import pdfIcon from "../../../Images/PDF_file_icon.png";

export function Section2Update({sectionData, index, fetchData}) {
  const [inputDownloadEnabled, setInputDownloadEnabled] = useState(false);
  const [inputViewEnabled, setInputViewEnabled] = useState(false);

  const [loading, setLoading] = useState(false); 
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);


  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null); 
  const [fileUrl, setFileUrl] = useState(""); 
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(""); 
  const [buttonDownloadText, setButtonDownloadText] = useState("");
  const [buttonViewText, setButtonViewText] = useState("");
  const [itemId, setItemId] = useState("");




  useEffect(() => {
    const section2 = sectionData;
    setTitle(section2.title);
    setSubTitle(section2.subTitle);
    setButtonViewText(section2.viewBtnText);
    setButtonDownloadText(section2.downloadBtnText);
    setFileUrl(section2.fileUrl);
    setBackgroundImageUrl(section2.backgroundImageUrl);
    setItemId(section2._id);
  }, [sectionData]);


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
    }
  };

 

  const handleViewToggleChange = () => {
    setInputViewEnabled(!inputViewEnabled);
    if (!inputViewEnabled) {
    }
  };
  const handleViewInputChange = (e) => {
    setButtonViewText(e.target.value);
  };
  const handleViewInputChangeDownloadBtn = (e) => {
    setButtonDownloadText(e.target.value);
  };

  

  const downloadPdf = async (fileUrl) => {
    setLoading(true);
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
      setSaveSuccess(true);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoading(false); // Ensure loading spinner stops even if an error occurs
      setTimeout(() => {
        setSaveSuccess(false);
      }, 300);
    }
  };

  const viewPdf = async (fileUrl) => {
    setLoading(true);
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
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 300);
    } catch (error) {
      console.error("Error viewing PDF:", error);
    }
  };


  

  const handleUpdate = async () => {
    setLoading(true);
    try {

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("downloadBtnText", buttonDownloadText);
      formData.append("viewBtnText", buttonViewText);
      formData.append("itemId", itemId);
      if (file) {
      formData.append("pdfFile", file);
      }
      if (selectedImage) {
        formData.append("backgroundImage", selectedImage);
      }

      const response = await axios.post(
        `${baseUrl}catalogsScreen/updateSection2Item`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchData();

      console.log("Update successful:", response.data);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error updating section:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 300);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("itemId", itemId);
    try {
      const response = await axios.post(
        `${baseUrl}catalogsScreen/deleteSection2Item`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Delete successful:", response.data);

    } catch (error) {
      console.error("Error updating section:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
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
    <div className="w-full" key={index}>
      

          <div className="mx-5" key={index}>
            <div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
             Update Section 2 Item
            </div>
            <div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
             Catalogue {index + 1}
            </div>
            <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
              Update desired photo and details here.
            </div>
            
            <div className="flex gap-4 flex-row ml-[75%]">
            {saveSuccess && (
                <div className="text-green-600 bg-white rounded-lg px-5 mt-[5rem] py-2.5">
                  Update successful!
                </div>
              )}
              {deleteSuccess && (
                <div className="text-green-600 bg-white rounded-lg px-5 py-2.5">
                  Updated successfully!
                </div>
              )}
            
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <button
                  className="text-white bg-purple-600 rounded-lg px-5 py-2.5 "
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              )}
              

              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <button
                  className="text-white bg-purple-600 rounded-lg px-5 py-2.5 "
                  onClick={() => handleUpdate()} 
                >
                  Update
                </button>
              )}
             
            </div>
            <div className="flex gap-4 absolute ml-[23%]">
              <div className="flex">
                <input
                  type="text"
                  className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} // This line is causing the error
                />
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
                  placeholder="Sub-Title"
                  value={subTitle}
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
                  <div className="w-full mt-[2rem] ml-[6.5rem] flex flex-col justify-center items-center">
                    {file ? (
                      <div>
                        <img
                          src={pdfIcon}
                          alt="Upload Icon"
                          className="w-12 h-12 mb-2 flex justify-center items-center"
                          style={{ margin: "auto" }}
                        />
                        <p className="text-gray-800">{file.name}</p>
                      </div>
                    ) : (
                      fileUrl && (
                        <div>
                          <img
                            src={pdfIcon}
                            alt="Upload Icon"
                            className="w-auto h-40 mb-2 flex justify-center items-center"
                            style={{ margin: "auto" }}
                          />
                          <p className="text-gray-800">{fileUrl}</p>
                        </div>
                      )
                    )}

                    <IconButton
                      className="mt-2 w-6 h-6 mx-auto justify-center bg-white border border-black"
                      onClick={handleDeleteFile}
                    >
                      <CloseIcon />
                    </IconButton>
                    <div className="flex flex-row gap-4 ml-4 mt-5">
                      <button
                        className="text-white bg-purple-600 rounded-lg px-5 py-2.5 "
                        onClick={() => downloadPdf(fileUrl)}
                      >
                        Download
                      </button>
                      
                      <button
                        className="text-white bg-purple-600 rounded-lg px-5 py-2.5 "
                        onClick={() => viewPdf(fileUrl)}
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
                          className="w-[10rem] h-[10rem] object-cover rounded-lg mr-[2rem]"
                        />
                      ) : (
                        <img
                        src={`${baseUrlImage}${backgroundImageUrl}`}
                        alt="Upload Icon"
                        className="w-[10rem] h-[10rem] mb-2 flex justify-center items-center"
                        style={{ margin: "auto" }}
                      />
                     )} 
                    </div>
                  </div>
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
                      ? buttonDownloadText
                      : buttonDownloadText
                  }
                  onChange={handleViewInputChangeDownloadBtn}
                  disabled={!inputDownloadEnabled}
                />
              </div>
              {inputDownloadEnabled && (
                <div className="bg-black text-white px-3 py-2 border whitespace-nowrap rounded-lg ml-[2rem]">
                  {buttonDownloadText}
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
                    value={inputViewEnabled ? buttonViewText : buttonViewText}
                    onChange={handleViewInputChange}
                    disabled={!inputViewEnabled}
                  />
                </div>
                {inputViewEnabled && (
                  <div className="bg-black text-white px-3 py-2 border whitespace-nowrap rounded-lg ml-[2rem]">
                    {buttonViewText}
                  </div>
                )}
              </div>
            </div>
            <hr
              className="my-8 border-black border-empty border-1"
              style={{ width: "100%" }}
            />
          </div>
    </div>
  );
}
