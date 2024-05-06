import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import { CircularProgress } from "@mui/material";

const Section5 = () => {
  const [section5Data, setSection5Data] = useState([]);
  const [resetMessage, setResetMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [newItemData, setNewItemData] = useState({
    image: null,
    imageTitle: "",
    imageSubtitle: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backend.asteraporcelain.com/api/v1/homescreen/getAllCollections"
      );
      if (response.data && response.data.data) {
        const section5Images =
          response.data.data.homePage?.section5?.images || [];
        setSection5Data(section5Images);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = async (itemId, newImage, newTitle, newSubtitle) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", itemId);
      formData.append("image", newImage);
      formData.append("imageTitle", newTitle);
      formData.append("imageSubtitle", newSubtitle);

      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/homescreen/updateSection5",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Update successful:", response.data);
      // Optionally update state or show success message

      // Refresh data after update
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error state or show error message
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (itemId) => {
    // Find the original data for the specified item ID
    const originalItem = section5Data.find((item) => item._id === itemId);
    if (!originalItem) return;

    // Reset the item data back to its original state
    setSection5Data((prevData) =>
      prevData.map((item) =>
        item._id === itemId ? { ...originalItem } : item
      )
    );
    setResetMessage("Fields reset successfully");
    setTimeout(() => {
      setResetMessage("");
    }, 3000);
  };

  const handleAddItem = async () => {
    try {
      const formData = new FormData();
      formData.append("image", newItemData.image);
      formData.append("imageTitle", newItemData.imageTitle);
      formData.append("imageSubtitle", newItemData.imageSubtitle);

      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/homescreen/addSection5Item",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Add item successful:", response.data);
      // Optionally update state or show success message

      // Refresh data after adding
      fetchData();

      // Reset newItemData state
      setNewItemData({
        image: null,
        imageTitle: "",
        imageSubtitle: "",
      });
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error state or show error message
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
    },
  });

  const {
    getRootProps: getRootPropsForAdd,
    getInputProps: getInputPropsForAdd,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setNewItemData((prevData) => ({ ...prevData, image: file }));
    },
  });

  return (
    <div className="max-w-lg ml-4 mt-4">
      {/* Update Section */}
      <div className="text-lg font-semibold leading-7 text-gray-900">
        Section 5
        <span className="mt-1 text-lg text-bold ml-4 whitespace-nowrap text-red-600">
          Update Item For Section 5
        </span>
      </div>
      <div className="mt-1 text-sm leading-5 text-slate-600">
        Update desired photo and details here.
      </div>
      {section5Data.map((item) => (
        <div key={item._id} className="mt-6">
          {/* Update fields */}
          <div className="flex items-center mb-4">
            <label className="mr-2 font-semibold whitespace-nowrap">
              Image Title:
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-64 ml-[28rem]"
              value={item.imageTitle}
              onChange={(e) => {
                const updatedTitle = e.target.value;
                setSection5Data((prevData) =>
                  prevData.map((prevItem) =>
                    prevItem._id === item._id
                      ? { ...prevItem, imageTitle: updatedTitle }
                      : prevItem
                  )
                );
              }}
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="mr-2 font-semibold whitespace-nowrap">
              Image Subtitle:
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-64 ml-[28rem]"
              value={item.imageSubtitle}
              onChange={(e) => {
                const updatedSubtitle = e.target.value;
                setSection5Data((prevData) =>
                  prevData.map((prevItem) =>
                    prevItem._id === item._id
                      ? { ...prevItem, imageSubtitle: updatedSubtitle }
                      : prevItem
                  )
                );
              }}
            />
          </div>
          {/* Display image */}
          <div className="w-full mt-4  flex items-center">
            <label className="mr-2 font-semibold">Image</label>
            <img
              src={`https://backend.asteraporcelain.com/${item.imageUrl}`}
              alt="Uploaded"
              className="w-auto whitespace-nowrap h-40 object-cover rounded-lg mr-4  ml-[30rem]"
            />
            {/* Dropzone for updating image */}
            <div
              {...getRootProps()}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
            >
              <input {...getInputProps()} />
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
          {/* Update button */}
          <button
            className="text-white bg-purple-600 rounded-lg px-5 py-2.5"
            disabled={loading}
            onClick={() =>
              handleUpdate(
                item._id,
                file || item.image,
                item.imageTitle,
                item.imageSubtitle
              )
            }
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Update"
            )}
          </button>
          {/* Cancel button */}
          <button
            className="text-black bg-white border-2 border-black rounded-lg px-5 py-2.5 mt-4 ml-4"
            onClick={() => handleCancel(item._id)}
          >
            Cancel
          </button>
          {/* Reset message */}
          {resetMessage && (
            <div className="text-red-600 ml-4">{resetMessage}</div>
          )}
          <hr className="my-6 border-gray-300" style={{ width: "350%" }} />
        </div>
      ))}
      {/* Add Section */}
      <div className="mt-6">
        <div className="text-lg font-semibold leading-7 text-gray-900">
          Section 5
          <span className="mt-1 text-lg text-bold ml-4 whitespace-nowrap text-red-600">
            Add Item For Section 5
          </span>
        </div>
        <div className="mt-1 text-sm leading-5 text-slate-600">
          Update desired photo and details here.
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-2 font-semibold">Title:</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-64 ml-[30rem]"
            value={newItemData.imageTitle}
            placeholder="Image title"
            onChange={(e) =>
              setNewItemData((prevData) => ({
                ...prevData,
                imageTitle: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="mr-2 font-semibold">Subtitle:</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-64 ml-[28rem]"
            value={newItemData.imageSubtitle}
            placeholder="Image Subtitle"
            onChange={(e) =>
              setNewItemData((prevData) => ({
                ...prevData,
                imageSubtitle: e.target.value,
              }))
            }
          />
        </div>
        {/* Display uploaded image for adding */}
        <div className="w-full ml-[30rem] mt-4  flex items-center">
          {newItemData.image && (
            <img
              src={URL.createObjectURL(newItemData.image)}
              alt="Uploaded"
              className="w-auto whitespace-nowrap h-40 object-cover rounded-lg mr-4"
            />
          )}
          {/* Dropzone for adding image */}
          <div
            {...getRootPropsForAdd()}
            className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
          >
            <input {...getInputPropsForAdd()} />
            <img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
        {/* Save button for adding */}
        <button
          className="text-white bg-purple-600 rounded-lg px-5 py-2.5 mt-4"
          onClick={handleAddItem}
        >
          Save
        </button>
      </div>
      {/* Divider */}
      <hr
        className="my-4 border-black border-empty border-1"
        style={{ width: "350%" }}
      />
    </div>
  );
};

export default Section5;
