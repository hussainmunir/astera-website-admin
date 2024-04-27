import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios"; // Import axios for HTTP requests

export function Section2({ data3 }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageTextPairs, setImageTextPairs] = useState([]);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    if (data3) {
      setTitle(data3.title || "");
      if (data3.products && data3.products.length > 0) {
        const product = data3.products[0]; // Assuming only one product is allowed
        setName(product.name || "");
        setMeasurement(product.measurement || "");
        setSerialNo(product.serialNo || "");
      }
    }
  }, [data3]);

  const handleRegularImageUpload = (event) => {
    const files = event.target.files;
    const updatedNewImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result;
        setSelectedImage(imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSupportiveImageUpload = useCallback((acceptedFiles) => {
    const updatedPairs = acceptedFiles.map((file) => ({
      image: file,
      text: "", // Initialize text as empty
    }));
    setImageTextPairs((prevPairs) => [...prevPairs, ...updatedPairs]);
  }, []);

  const handleDeletePair = (indexToRemove) => {
    setImageTextPairs((prevPairs) =>
      prevPairs.filter((pair, index) => index !== indexToRemove)
    );
  };

  const handleSave = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("measurement", measurement);
    formData.append("serialNo", serialNo);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      // Make an HTTP request to save the data
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/productsScreen/addProductToSection3/",
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
    }
  };

  const handleCancel = () => {
    if (data3) {
      setTitle(data3.title || "");
      if (data3.products && data3.products.length > 0) {
        const product = data3.products[0]; // Assuming only one product is allowed
        setName(product.name || "");
        setMeasurement(product.measurement || "");
        setSerialNo(product.serialNo || "");
      }
      setSelectedImage(null);
      setResetMessage("Fields reset successfully");
      setTimeout(() => {
        setResetMessage("");
      }, 3000);
    }
  };

  const {
    getRootProps: getRootPropsSupportiveImages,
    getInputProps: getInputPropsSupportiveImages,
  } = useDropzone({
    onDrop: handleSupportiveImageUpload,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="h-[100vh]">
      <div className="w-full flex flex-col ml-[2rem]">
        <p className="w-full text-gray-600 text-lg max-md:max-w-full">
          <b>Section 3</b>
        </p>
        <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here.
        </div>
      </div>
      <div className="flex ml-[80rem] space-x-5 -mt-8">
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
      <div className="flex flex-col">
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="MEASUREMENT"
          value={measurement}
          onChange={(e) => setMeasurement(e.target.value)}
        />
        <input
          type="text"
          className="mt-8 w-[25rem] ml-[12rem] border-2 border-black-500 border-solid p-3 rounded-lg"
          placeholder="SERIAL NO"
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
        />
      </div>
      <div className="flex flex-row">
        <label className="block text-lg ml-[2rem] mt-[3rem] w-[15rem] font-semibold mb-1">
          Product Images{" "}
          <HelpOutlineIcon
            style={{
              fontSize: 16,
              color: "gray",
              backgroundColor: "white",
            }}
          />
        </label>{" "}
        <div className="w-full flex justify-start">
          <div className="flex mt-[4rem] ml-[7rem] gap-4">
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
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-auto h-40 object-cover rounded-lg mr-2"
              />
            )}
            {data3 && data3.backgroundImageUrl && !selectedImage && (
              <img
                src={data3.backgroundImageUrl}
                alt="Initial Image"
                className="w-auto h-40 object-cover rounded-lg mr-2"
              />
            )}
            {imageTextPairs.map((pair, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(pair.image)}
                  alt="Uploaded"
                  className="w-auto h-40 object-cover rounded-lg mr-2"
                />
                {/* Inputs for image details */}
                {/* You can implement the input fields for image details here */}
                <IconButton
                  className="mt-2 bg-white border border-black"
                  onClick={() => handleDeletePair(index)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section2;
