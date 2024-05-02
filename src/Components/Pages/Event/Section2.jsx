import React, {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  useRef
} from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { baseUrl, baseUrlImage } from "../../../api/base_urls";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import LazyLoad from "react-lazyload";

const Section2 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [supportiveImages, setSupportiveImages] = useState([]);
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [pid, setPid] = useState("");
  const [addSelectedImage, setAddSelectedImage] = useState(null);
  const [selectedUpdateFile, setSelectedUpdateFile] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}homescreen/getAllCollections`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.eventsPage
        ) {
          const event = response.data.data.eventsPage;
          if (event.section2) {
            const { section2 } = event;
            setPid(section2.id), setSectionData(section2);
          }
        }
      } catch (error) {
        console.log("error in fetching data", error);
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
        response.data.data.eventsPage
      ) {
        const event = response.data.data.eventsPage;
        if (event.section2) {
          const { section2 } = event;
          setPid(section2.id), setSectionData(section2);
        }
      }
    } catch (error) {
      console.log("error in fetching data", error);
    }
  };

  useEffect(() => {
    if (selectedUpdateFile) {
      console.log("selectedUpdateFile", selectedUpdateFile);
      handleUpdateImage(indexRef.current);
    }
  }, [selectedUpdateFile]);

  const handleUpdateImage = async (index) => {
    try {
      console.log("sectionData.events[index]._id", sectionData.events[index]._id)
      const formData = new FormData();
      formData.append("itemId", sectionData.events[index]._id);
      formData.append("imageFile", selectedUpdateFile);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/eventsScreen/updateSection2Item",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success response
      console.log("Image updated successfully:", response.data);
      fetchData();

    } catch (error) {
      // Handle error
      console.error("Error updating image:", error);
    }
  };

  
  const {
    getRootProps: getRootPropsForSelectedImage,
    getInputProps: getInputPropsForSelectedImage,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setAddSelectedImage(acceptedFiles[0]);
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

  
  const indexRef = useRef();
  const handleFileUpdate = async (event, index) => {
    console.log("event.target.files[0]", event.target.files[0]);
    setSelectedUpdateFile(event.target.files[0]);
    console.log("index", index)
    indexRef.current = index;
  };

  const handleAdd = async () => {
    // Check if both addTitle and addSubTitle are not empty
  
    // Construct FormData
    const addRequestData = new FormData();
 

    // Append image if it exists
    if (addSelectedImage) {
      addRequestData.append("imageFile", addSelectedImage);
    }

    try {
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/eventsScreen/addToSection2",
        addRequestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      // Clear input fields after successful update
     
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
      const itemId = index;
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/eventsScreen/deleteSection2Item",
        { itemId }
      );
      // Handle success response
      console.log("Image deleted successfully:", response.data);
      fetchData();

      // Call the handleDeleteImage function to update the UI
      handleDeleteImage(index);
    } catch (error) {
      // Handle error
      console.error("Error deleting image:", error);
    }
  };



  const onDropImage1 = useCallback((acceptedFiles) => {
    setAddSelectedImage(acceptedFiles[0]);
  }, []);

  const onDropSupportiveImages = useCallback(
    (acceptedFiles) => {
      setAddSelectedImage(acceptedFiles[0]);
    },
    [] // No dependencies, as the state update is based only on acceptedFiles
  );

  const {
    getRootProps: getRootPropsImage1,
    getInputProps: getInputPropsImage1,
  } = useDropzone({
    onDrop: onDropImage1,
    accept: "image/*",
    multiple: false,
  });

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
  return (
    <div className="h-[100vh]">
      <div className="flex flex-col ml-[2.5rem]">
        <p className="w-full text-gray-600 text-lg ">
          <b>Section 2</b>
        </p>
        <p className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here
        </p>
      </div>

      <div className="flex flex-row">
        <label className="block text-lg w-[1rem] ml-[2.5rem] mt-[2rem] font-semibold mb-1">
          Event Images{" "}
          <HelpOutlineIcon
            style={{
              fontSize: 16,
              color: "gray",
              backgroundColor: "white",
            }}
          />
        </label>
        {/* Supportive Images */}
        <div className="flex flex-row mt-[1rem]">
          <div className="mt-[2rem] ml-[15rem] flex justify-start gap-12">
            <div
              {...getRootPropsSupportiveImages()}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center ml-0"
              style={{ width: "200px", height: "200px" }} // Set fixed width and height
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
            <div className="mt-4 w-[70%]">
              <div className="flex flex-wrap -mx-2">
                {addSelectedImage &&  (
                  <div className="w-1/5 px-2 mb-4">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={URL.createObjectURL(addSelectedImage)}
                        alt="Uploaded"
                        className="w-full h-auto object-cover"
                        style={{ aspectRatio: "1/1" }}
                      />{" "}
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <IconButton
                          className="absolute top-1 right-0 m-2 bg-white"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                      {saveSuccess && (
                        <div className="text-green-600 absolute mt-[5rem] ml-[87%]">
                          Deleted successfully!
                        </div>
                      )}
                      <button
                        className="border-solid mt-5 border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
                        onClick={() => handleAdd()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
                {sectionData &&
                  sectionData.events &&
                  sectionData.events.map((event, index) => (
                    <div key={index} className="w-1/5 px-2 mb-4">
                      <div className="relative overflow-hidden rounded-lg">
                      <label>
                <input
                  type="file"
                  onChange={(event) => handleFileUpdate(event, index)}
                  className="hidden"
                />
                <div className="relative">
                  <LazyLoad>
                    <img
                      src={`${baseUrlImage}${event.imageUrl}`}
                      alt="Uploaded"
                      loading="lazy"
                      className="w-[300px] h-[150px] object-fit cursor-pointer"
                      //  onClick={(event) => event.target.previousSibling.click()}
                    />
                  </LazyLoad>
                </div>
              </label>
              <div className="mt-5 flex flex-wrap items-center justify-center">
                        <IconButton
                          className="flex justify-center items-center right-0  bg-white"
                          onClick={() => handleDeleteImageApi(event._id)}
                        >
                          <CloseIcon />
                          
                        </IconButton>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
};

export default Section2;
