import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import LazyLoad from "react-lazyload";
import { baseUrlImage, baseUrl } from "../../../api/base_urls";

export function Section2() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [addSelectedImage, setAddSelectedImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [title, setTitle] = useState(""); // Define the title state variable
  const [subTitle, setSubTitle] = useState("");
  const [addTitle, setAddTitle] = useState(""); // Define the title state variable
  const [addSubTitle, setAddSubTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}homescreen/getAllCollections`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.timelessCollection
        ) {
          const timelessCollection = response.data.data.timelessCollection;
          if (timelessCollection.section2) {
            const { section2 } = timelessCollection;
            setTitle(section2.title || "");
            setSubTitle(section2.subTitle || "");
            setProducts(section2);
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}homescreen/getAllCollections`
      );
      if (
        response.data &&
        response.data.data &&
        response.data.data.whatsnewCollection
      ) {
        const whatsnewCollection = response.data.data.whatsnewCollection;
        if (whatsnewCollection.section2) {
          const { section2 } = whatsnewCollection;
          setTitle(section2.title || "");
          setSubTitle(section2.subTitle || "");
          setProducts(section2);
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

  const handleRegularImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const updateProductTitle = (title, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].title = title;
    setProducts(updatedProducts);
  };

  const updateProductSubTitle = (subTitle, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].subTitle = subTitle;
    setProducts(updatedProducts);
  };

  const handleDeletePair = () => {
    setSelectedImage(null);
    setTitle("");
    setSubTitle("");
  };

  const handleUpdate = async (index) => {
    setLoading(true);
    const requestData = new FormData();
    requestData.append("itemId", products[index]._id);
    requestData.append("title", products[index].title);
    requestData.append("subTitle", products[index].subTitle);

    console.log("selectedImage", selectedImage);

    if (selectedImage) {
      requestData.append("image", selectedImage);
    }
    try {
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/timelessCollectionScreen/updateSection2Item",
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      handleDeletePair();
      setSaveSuccess(true);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  const handleDeleteImageApiUi = (indexToRemove) => {
    setProducts((prevImages) =>
      products.filter((image, index) => index !== indexToRemove)
    );
  };

  const {
    getRootProps: getRootPropsForSelectedImage,
    getInputProps: getInputPropsForSelectedImage,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
    },
  });

  const {
    getRootProps: getRootPropsForAddSelectedImage,
    getInputProps: getInputPropsForAddSelectedImage,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setAddSelectedImage(acceptedFiles[0]);
    },
  });

  const handleAdd = async () => {
    // Check if both addTitle and addSubTitle are not empty
    if (!addTitle || !addSubTitle) {
      console.error("Title and Subtitle are required.");
      return;
    }

    // Construct FormData
    const addRequestData = new FormData();
    addRequestData.append("title", addTitle);
    addRequestData.append("subTitle", addSubTitle);

    // Append image if it exists
    if (addSelectedImage) {
      addRequestData.append("image", addSelectedImage);
    }

    try {
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/timelessCollectionScreen/addSection2Item",
        addRequestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      // Clear input fields after successful update
      setAddTitle("");
      setAddSubTitle("");
      setAddSelectedImage(null);
      setSaveSuccess(true);
      // Optionally, you can refetch data after adding the new item
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      // Optionally, handle specific error cases here
    } finally {
      setLoading(false);
      // Reset save success after a certain delay
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  const handleDeleteImageApi = async (index) => {
    try {
      const itemId = products[index]._id;
      console.log(itemId);
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/timelessCollectionScreen/deleteSection2Item",
        { itemId }
      );
      console.log("Image deleted successfully:", response.data);
      handleDeleteImageApiUi(index);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="h-full mt-[5rem]">
      <div className=" pl-[2rem] text-lg font-semibold text-gray-900 max-md:max-w-full">
        Section 2
      </div>
      <div className="flex flex-row">
        <label className="block text-lg ml-[2rem] mt-[3rem] w-[15rem] font-semibold mb-1">
          Collections Images{" "}
          <HelpOutlineIcon
            style={{
              fontSize: 16,
              color: "gray",
              backgroundColor: "white",
            }}
          />
        </label>{" "}
        <div className=" flex flex-row">
          <div className="flex mt-[4rem] ml-[7rem] gap-4">
            <div className="flex items-start">
              <div
                {...getRootPropsForAddSelectedImage()}
                className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
              >
                <input
                  {...getInputPropsForAddSelectedImage()}
                  multiple={false}
                />
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
            {addSelectedImage && ( // Changed condition to addSelectedImage
              <div className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(addSelectedImage)}
                  alt="Uploaded"
                  className="w-auto h-40 object-cover rounded-lg mr-2"
                />
                <IconButton
                  className="mt-2 bg-white border border-black"
                  onClick={() => handleDeletePair()}
                >
                  <CloseIcon />
                </IconButton>
                <button
                  className="border-solid mt-5 border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
                  onClick={() => handleAdd()}
                >
                  Add
                </button>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    className="mt-8 w-[25rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                    placeholder="Title"
                    value={addTitle}
                    onChange={(e) => setAddTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    className="mt-8 w-[25rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                    placeholder="subTitle"
                    value={addSubTitle}
                    onChange={(e) => setAddSubTitle(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mx-14 mt-10">
        <div
          className="flex gap-4 h-full mb-2"
          style={{ width: `calc(315px * ${products?.length})` }}
        >
          {products?.map((product, index) => (
            <div key={index} className="flex flex-col items-center">
              <label>
                <input {...getInputPropsForSelectedImage()} multiple={false} />
                <div className="relative">
                  <LazyLoad>
                    <img
                      src={`${baseUrlImage}${product.imageUrl}`}
                      alt="Uploaded"
                      loading="lazy"
                      className="w-[300px] h-[150px] object-fit cursor-pointer"
                    />
                  </LazyLoad>
                </div>
              </label>
              <IconButton
                className="absolute top-2  bg-white"
                onClick={() => handleDeleteImageApi(index)}
              >
                <CloseIcon />
              </IconButton>
              <button
                className="border-solid mt-5 border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
                onClick={() => handleUpdate(index)}
              >
                Update
              </button>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  className="mt-8 w-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                  placeholder="TITLE"
                  value={product.title}
                  onChange={(e) => updateProductTitle(e.target.value, index)}
                />
                <input
                  type="text"
                  className="mt-8 w-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                  placeholder="SUB TITLE"
                  value={product.subTitle}
                  onChange={(e) => updateProductSubTitle(e.target.value, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section2;
