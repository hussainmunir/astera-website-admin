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
import { Section2Update } from "../Catalog/Section2Update";

export function Section2() {
  const [inputDownloadEnabled, setInputDownloadEnabled] = useState(false);
  const [inputDownloadText, setInputDownloadText] = useState("");
  const [inputViewEnabled, setInputViewEnabled] = useState(false);
  const [inputViewText, setInputViewText] = useState("");

  const [sectionData, setSectionData] = useState("");
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);


  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [buttonDownloadText, setButtonDownloadText] = useState("");
  const [buttonViewText, setButtonViewText] = useState("");




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

          setSectionData(section2);
          console.log("fetchData", sectionData);
        }
      } catch (error) {
        console.log("fetchingError", error);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}catalogsScreen/getCatalogsPage`
      );
      if (response.data && response.data.data && response.data.data.section2) {
        const section2 = response.data.data.section2;
        // setTitle(section2.title);
        // setSubTitle(section2.subTitle);
        // setButtonViewText(section2.viewBtnText);
        // setButtonDownloadText(section2.downloadBtnText);
        setSectionData(section2);
        console.log("fetchData", sectionData);
      }
    } catch (error) {
      console.log("fetchingError", error);
    }
  };

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

  const handleReset = () => {
    setTitle("");
    setSubTitle("");
    setButtonViewText("");
    setButtonDownloadText("");  
    setSelectedImage(null);
    setFile(null);
  };

  const handleDownloadToggleChange = () => {
    setInputDownloadEnabled(!inputDownloadEnabled);
    if (!inputDownloadEnabled) {
      setInputDownloadText("");
    }
  };

  const handleDownloadInputChange = (e) => {
    setButtonDownloadText(e.target.value);
  };

  const handleViewToggleChange = () => {
    setInputViewEnabled(!inputViewEnabled);
    if (!inputViewEnabled) {
      setInputViewText("");
    }
  };
  const handleViewInputChange = (e) => {
    setButtonViewText(e.target.value);
  };
  const handleViewInputChangeDownloadBtn = (e) => {
    setInputDownloadText(e.target.value);
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
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error downloading PDF:", error);
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
      }, 3000);
    } catch (error) {
      console.error("Error viewing PDF:", error);
    }
  };


  const handleAdd = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("downloadBtnText", buttonDownloadText);
      formData.append("viewBtnText", buttonViewText);
      if (selectedImage) {
        formData.append("backgroundImage", selectedImage);
      }
      if (file) {
        formData.append("pdfFile", file);
      }


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
      fetchData();
      handleReset();
      setSaveSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.error("Error saving data:", error);
    }
  };

  const handleUpdate = async (index) => {
    setLoading(true);
    try {
      const item = sectionData[index];
      if (!item || !item._id) {
        console.error("Invalid item or missing _id property.");
        return;
      }

      const formData = new FormData();
      formData.append("title", item.title);
      formData.append("subTitle", item.subTitle);
      formData.append("pdfFile", item.pdfFile);
      formData.append("downloadBtnText", item.downloadBtnText);
      formData.append("viewBtnText", item.viewBtnText);
      formData.append("itemId", item._id);

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

      console.log("Update successful:", response.data);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error updating section:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    }
    fetchData();
  };

  const handleDelete = async (catalog_id, index) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("itemId", catalog_id);
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
      const updatedDetails = [...sectionData];
      updatedDetails.splice(index, 1);
      setSectionData(updatedDetails);

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
        <div className="w-full flex flex-col mx-5">
          <div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
            Add Section 2 Item
          </div>
          <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
            Update desired photo and details here.
          </div>
        </div>
        <button
            className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute ml-[82%]"
            onClick={handleReset}
          >
            Cancel
          </button>
        {loading ? (
          <CircularProgress size={24} color="inherit" className="ml-[70%]" />
        ) : (
          <button
            className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute ml-[90%]"
            onClick={handleAdd}
          >
            Add
          </button>
        )}
        
        {saveSuccess && (
          <div className="text-green-600 bg-white rounded-lg px-5 py-2.5 absolute mt-[5rem] ml-[90%]">
            Add successful!
          </div>
        )}
        <div className="flex gap-4 absolute ml-[23%]">
          <div className="flex">
            <input
              type="text"
              className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex">
            <input
              type="text"
              className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
              placeholder="Title"
              value={
                subTitle
              }
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
                    src={pdfIcon}
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
                inputDownloadEnabled ? buttonDownloadText : buttonDownloadText
              } // Use inputText when editing, otherwise use buttonText
              onChange={handleDownloadInputChange}
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
                placeholder={inputViewEnabled ? "Input Field" : "Button Text"}
                value={inputViewEnabled ? buttonViewText : buttonViewText} // Use inputText when editing, otherwise use buttonText
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
      {sectionData &&
        Array.isArray(sectionData) &&
        sectionData.map((sectionData, index) => (
          <Section2Update sectionData={sectionData} index={index} fetchData={fetchData} />
        ))}

      {/* {sectionData &&
        Array.isArray(sectionData) &&
        sectionData.map((sectionData, index) => (
          <div key={index} className="mx-5">
            <div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
             Update Section 2 Item
            </div>
            <div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
             Catalogue {index + 1}
            </div>
            <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
              Update desired photo and details here.
            </div>
            <div className="flex gap-4 flex-row ml-[80%]">
            
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <button
                  className="text-white bg-purple-600 rounded-lg px-5 py-2.5 "
                  onClick={() => handleDelete(sectionData._id, index)}
                >
                  Delete
                </button>
              )}
              {deleteSuccess && (
                <div className="text-green-600 bg-white rounded-lg px-5 py-2.5">
                  Delete successful!
                </div>
              )}

              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <button
                  className="text-white bg-purple-600 rounded-lg px-5 py-2.5 "
                  onClick={() => handleUpdate(index)} // Pass sectionData[index]._id and index
                >
                  Update
                </button>
              )}
              {saveSuccess && (
                <div className="text-green-600 bg-white rounded-lg px-5 mt-[5rem] py-2.5">
                  Update successful!
                </div>
              )}
            </div>
            <div className="flex gap-4 absolute ml-[23%]">
              <div className="flex">
                <input
                  type="text"
                  className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black "
                  placeholder="Title"
                  value={sectionData.title}
                  onChange={(e) => setSubTitle(e.target.value)} // This line is causing the error
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
                      sectionData &&
                      sectionData.fileUrl && (
                        <div>
                          <img
                            src={pdfIcon}
                            alt="Upload Icon"
                            className="w-auto h-40 mb-2 flex justify-center items-center"
                            style={{ margin: "auto" }}
                          />
                          <p className="text-gray-800">{sectionData.fileUrl}</p>
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
                          className="w-auto h-auto object-cover rounded-lg mr-[2rem]"
                        />
                      ) : (
                        <img
                        src={`${baseUrlImage}${sectionData.backgroundImageUrl}`}
                        alt="Upload Icon"
                        className="w-auto h-40 mb-2 flex justify-center items-center"
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
                      ? inputDownloadText
                      : buttonDownloadText
                  }
                  onChange={handleViewInputChangeDownloadBtn}
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
        ))} */}
    </div>
  );
}
