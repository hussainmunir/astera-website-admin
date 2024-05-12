import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { baseUrlImage } from "../../../api/base_urls";
import LazyLoad from "react-lazyload";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export function Section2({ id, data2, fetchProducts }) {
  // const [selectedImage, setSelectedImage] = useState(null);
  const [supportiveImages, setSupportiveImages] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [selectedUpdateFile, setSelectedUpdateFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  // const onDropImage1 = useCallback((acceptedFiles) => {
  //   setSelectedImage(acceptedFiles[0]);
  // }, []);

  useEffect(() => {
    if (data2) {
      console.log("data2", data2);
      setImageUrl(data2 || "");
    }
  }, [data2]);

  const onDropSupportiveImages = useCallback(
    (acceptedFiles) => {
      setSupportiveImages((prevImages) => [...prevImages, ...acceptedFiles]);
    },
    [] // No dependencies, as the state update is based only on acceptedFiles
  );

  // const {
  //   getRootProps: getRootPropsImage1,
  //   getInputProps: getInputPropsImage1,
  // } = useDropzone({
  //   onDrop: onDropImage1,
  //   accept: "image/*",
  //   multiple: false,
  // });

  const {
    getRootProps: getRootPropsSupportiveImages,
    getInputProps: getInputPropsSupportiveImages,
  } = useDropzone({
    onDrop: onDropSupportiveImages,
    accept: "image/*",
    multiple: true,
  });

  const handleDeleteImage = (indexToRemove) => {
    setSupportiveImages((prevImages) =>
      prevImages.filter((image, index) => index !== indexToRemove)
    );
  };

  const handleDeleteImageApiUi = (indexToRemove) => {
    setImageUrl((prevImages) =>
      imageUrl.filter((image, index) => index !== indexToRemove)
    );
  };
  const indexRef = useRef();
  const handleFileUpdate = async (event, index) => {
    console.log("event.target.files[0]", event.target.files[0]);
    setSelectedUpdateFile(event.target.files[0]);
    indexRef.current = index;
  };

  useEffect(() => {
    if (selectedUpdateFile) {
      console.log("selectedUpdateFile", selectedUpdateFile);
      handleUpdateImage(indexRef.current);
    }
  }, [selectedUpdateFile]);

  const handleCancel = () => {
    if (data2) {
      setSupportiveImages([]);

      // Set reset message
      setResetMessage("Fields reset successfully");

      // Clear reset message after 3 seconds
      setTimeout(() => {
        setResetMessage("");
      }, 3000);
    }
  };

  const handleUploadImages = async () => {
    if (supportiveImages.length == 0) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productId", id);
      supportiveImages.forEach((image) => {
        formData.append("imageFile", image);
      });

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/productsScreen/addToSection2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchProducts();
      setSaveSuccess(true);
      setSupportiveImages([]);
      // Handle success response
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  const handleUpdateImage = async (index) => {
    try {
      const formData = new FormData();
      formData.append("productId", id);
      formData.append("itemId", imageUrl[index]._id);
      formData.append("imageFile", selectedUpdateFile);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/productsScreen/updateSection2Item",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchProducts();

      // Handle success response
      console.log("Image updated successfully:", response.data);
    } catch (error) {
      // Handle error
      console.error("Error updating image:", error);
    }
  };

  const handleDeleteImageApi = async (index) => {
    try {
      const itemId = imageUrl[index]._id;
      const productId = id;
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/productsScreen/deleteSection2Item",
        { itemId, productId }
      );
      // Handle success response
      console.log("Image deleted successfully:", response.data);
      // Call the handleDeleteImage function to update the UI
      // handleDeleteImageApiUi(index);
      fetchProducts();

    } catch (error) {
      // Handle error
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col  ml-[2.5rem]">
        <p className=" text-gray-600 text-lg ">
          <b>Section 2</b>
        </p>
        <p className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here
        </p>
      </div>
      <div className="flex ml-[80%] -mt-8 space-x-5">
        <button
          className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
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
            className="border-1 border-solid border-blue w-[5rem] text-white bg-blue-700 p-2 rounded-xl"
            onClick={handleUploadImages}
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
      <div className="flex flex-row">
        <label className="block text-lg ml-[2.5rem]  font-semibold mb-1">
          SlideShow Images{" "}
          <HelpOutlineIcon
            style={{
              fontSize: 16,
              color: "gray",
              backgroundColor: "white",
            }}
          />
        </label>{" "}
        {/* Supportive Images */}
        <div className="flex flex-row">
          <div className="mt-[2rem] ml-[8rem] flex justify-start gap-8">
            <div className="flex items-center">
              <div
                {...getRootPropsSupportiveImages()}
                className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center ml-0"
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
      </div>

      <div className="overflow-x-auto mx-14 mt-10">
        {supportiveImages?.length > 0 && (
          <p>
          Images to upload
        </p>
        )}
      
        <div
          className="flex gap-4 h-full mb-2"
          style={{ width: `calc(315px * ${supportiveImages?.length})` }}
        >
          
          {supportiveImages?.map((image, index) => (
            <div key={index} className="">
              <label>
                
                <div className="relative">
                  <LazyLoad>
                    <img
                       src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      loading="lazy"
                      className="w-[300px] h-[150px] object-fit cursor-pointer"
                    //  onClick={(event) => event.target.previousSibling.click()}
                    />
                  </LazyLoad>
                </div>
              </label>

              <IconButton
                className="absolute top-1 left-[45%] bg-white"
                onClick={() => handleDeleteImage(index)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto mx-14 mt-10">
      {imageUrl?.length > 0 && (
          <p>
          Uploaded Images
        </p>
        )}
        <div
          className="flex gap-4 h-full mb-2"
          style={{ width: `calc(315px * ${imageUrl?.length})` }}
        >
          {imageUrl?.map((image, index) => (
            <div key={index} className="">
              <label>
                <input
                  type="file"
                  onChange={(event) => handleFileUpdate(event, index)}
                  className="hidden"
                />
                <div className="relative">
                  <LazyLoad>
                    <img
                      src={`${baseUrlImage}${image.imageUrl}`}
                      alt="Uploaded"
                      loading="lazy"
                      className="w-[300px] h-[150px] object-fit cursor-pointer"
                    //  onClick={(event) => event.target.previousSibling.click()}
                    />
                  </LazyLoad>
                </div>
              </label>

              <IconButton
                className="absolute top-1 left-[45%] bg-white"
                onClick={() => handleDeleteImageApi(index)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section2;
