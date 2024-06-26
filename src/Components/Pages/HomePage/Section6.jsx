import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import { CircularProgress } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Section6Update from "./Section6Update";
import { baseUrl } from "../../../api/base_urls";
import LazyLoad from "react-lazyload";

const Section6 = () => {
  const [section6Data, setSection6Data] = useState([]);
  const [newItemData, setNewItemData] = useState({
    name: "",
    occupation: "",
    bio: "",
    avatarImageUrl: "",
    backgroundImageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}homescreen/getAllCollections`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.homePage &&
          response.data.data.homePage.section6
        ) {
          const section6Items = response.data.data.homePage.section6;
          setSection6Data(section6Items);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
        response.data.data.homePage &&
        response.data.data.homePage.section6
      ) {
        const section6Items = response.data.data.homePage.section6;
        setSection6Data(section6Items);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setNewItemData({
      name: "",
      occupation: "",
      bio: "",
      avatarImageUrl: "",
      backgroundImageUrl: "",
    });
  };

  const handleAddItem = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", newItemData.name);
      formData.append("occupation", newItemData.occupation);
      formData.append("bio", newItemData.bio);
      formData.append("avatarImage", newItemData.avatarImageUrl);
      formData.append("backgroundImage", newItemData.backgroundImageUrl);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const response = await axios.post(
        `${baseUrl}homescreen/addSection6Item`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Add item successful:", response.data);
      fetchData();

      // Clear newItemData and update state
      setNewItemData({
        name: "",
        occupation: "",
        bio: "",
        avatarImageUrl: "",
        backgroundImageUrl: "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error state or show error message
      setLoading(false);
    }
  };

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        // setNewItemData({
        // 	...newItemData,
        // 	avatarImage: file,
        // 	avatarImageUrl: file, // Store local URL for preview
        // });
        setNewItemData((prevData) => ({
          ...prevData,
          avatarImageUrl: file,
        }));
      }
    },
  });

  const {
    getRootProps: getBackgroundRootProps,
    getInputProps: getBackgroundInputProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        // setNewItemData({
        // 	...newItemData,
        // 	backgroundImage: file,
        // 	backgroundImageUrl: file, // Store local URL for preview
        // });
        setNewItemData((prevData) => ({
          ...prevData,
          backgroundImageUrl: file,
        }));
      }
    },
  });

  const handleEditorChange = (content, delta, source, editor) => {
    setNewItemData((prevData) => ({
      ...prevData,
      bio: content,
    }));
  };

  return (
    <div className="max-w-lg ml-4 mt-4">
      {section6Data.map((item, index) => (
        <div key={index}>
          <Section6Update item={item} index={index} fetchData={fetchData} />
        </div>
      ))}

      <div className="text-lg font-semibold leading-7 text-gray-900">
        Section 6{" "}
        <span className="text-red-500 ml-1">- Add New Item for Section 6</span>
      </div>

      <div className="mt-6">
        <div className="flex items-center mb-4">
          <label className="mr-2 font-semibold">Name:</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-64 ml-[30rem]"
            value={newItemData.name}
            placeholder="Enter Name"
            onChange={(e) =>
              setNewItemData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-2 font-semibold">Occupation:</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-64 ml-[28rem]"
            placeholder="Enter Occupation"
            value={newItemData.occupation}
            onChange={(e) =>
              setNewItemData((prevData) => ({
                ...prevData,
                occupation: e.target.value,
              }))
            }
          />
        </div>
        {/* <div className="flex mt-4">
					<label htmlFor="bio" className=" font-semibold mr-[30rem]">
						Bio:
					</label>
					<ReactQuill
						theme="snow"
						value={newItemData.bio}
						onChange={(content) =>
							setNewItemData({ ...newItemData, bio: content })
						}
						placeholder="Write a short introduction."
						style={{ height: "200px", width: "400px", marginLeft: "30rem" }}
					/>
				</div> */}

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
              value={newItemData.bio}
              onChange={handleEditorChange}
              placeholder="Write a short introduction."
              style={{
                height: "200px",
                marginBottom: "40px",
                width: "600px",
              }}
            />
          </div>
        </div>
        <div className="w-auto mt-[2rem]  flex">
          <label className="mr-2 font-semibold">Avatar:</label>
          {newItemData.avatarImageUrl && (
            <img
              src={URL.createObjectURL(newItemData.avatarImageUrl)}
              alt="Avatar Preview"
              className="w-auto h-40 object-cover rounded-lg ml-[30rem]"
            />
          )}
          <div
            {...getAvatarRootProps()}
            className="bg-white rounded-lg border border-gray-200 p-4 ml-[2rem]  flex flex-col items-center whitespace-nowrap"
          >
            <input {...getAvatarInputProps()} />
            <img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
        <div className="w-full mt-4 flex items-center">
          <label className="mr-2 font-semibold whitespace-nowrap">
            Background Image:
          </label>
          {newItemData.backgroundImageUrl && (
            <img
              src={URL.createObjectURL(newItemData.backgroundImageUrl)}
              alt="Background Preview"
              className="w-auto h-40 object-cover absolute rounded-lg ml-[30rem]"
            />
          )}
          <div
            {...getBackgroundRootProps()}
            className="bg-white rounded-lg border border-gray-200 p-4  ml-[4rem] flex flex-col items-center whitespace-nowrap"
          >
            <input {...getBackgroundInputProps()} />
            <img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </div>
        <button
          className="text-white bg-purple-600 rounded-lg px-5 py-2.5 mt-4"
          onClick={handleAddItem}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
        </button>
        <button
          className="text-white bg-purple-600 rounded-lg px-5 py-2.5 mt-4 ml-4"
          onClick={handleReset}
        >
          {"Cancel"}
        </button>
      </div>
      <hr
        className="my-4 border-black border-empty border-1"
        style={{ width: "300%" }}
      />
    </div>
  );
};

export default Section6;
