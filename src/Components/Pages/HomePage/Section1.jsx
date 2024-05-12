import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";

export const Section1 = () => {
    // for update Items
    const [selectedImageForUpdate, setSelectedImageForUpdate] = useState(null);
    const [section1Data, setSection1Data] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [resetMessage, setResetMessage] = useState("");
    const [loading, setLoading] = useState(false);
    // For Add Items
    const [selectedImageForAdd, setSelectedImageForAdd] = useState(null);
    const [newItem, setNewItem] = useState({
        title: "",
        subtitle: "",
        description: "",
        backgroundImage: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://backend.asteraporcelain.com/api/v1/homescreen/getAllCollections"
                );
                if (
                    response.data &&
                    response.data.data &&
                    response.data.data.homePage &&
                    response.data.data.homePage.section1 &&
                    response.data.data.homePage.section1.length > 0
                ) {
                    setSection1Data(response.data.data.homePage.section1);
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
				"https://backend.asteraporcelain.com/api/v1/homescreen/getAllCollections"
			);
			if (
				response.data &&
				response.data.data &&
				response.data.data.homePage &&
				response.data.data.homePage.section1 &&
				response.data.data.homePage.section1.length > 0
			) {
				setSection1Data(response.data.data.homePage.section1);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};


    const handleInputChange = (e, itemId, field) => {
        const updatedSection1 = section1Data.map((item) =>
            item._id === itemId ? { ...item, [field]: e.target.value } : item
        );
        setSection1Data(updatedSection1);
    };

    const handleSave = async (itemId) => {
        const itemToUpdate = section1Data.find((item) => item._id === itemId);
        if (!itemToUpdate) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("backgroundImage", selectedImageForUpdate);
            formData.append("title", itemToUpdate.title);
            formData.append("subtitle", itemToUpdate.subtitle);
            formData.append("description", itemToUpdate.description);
            formData.append("id", itemId);

            const response = await axios.post(
                "https://backend.asteraporcelain.com/api/v1/homescreen/updateSection1Item",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Update successful:", response.data);
            setSaveSuccess(true);
            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);fetchData();
        } catch (error) {
            console.error("Error updating data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = (itemId) => {
        const itemToReset = originalData.find((item) => item._id === itemId);
        if (!itemToReset) return;

        const updatedSection1 = section1Data.map((item) =>
            item._id === itemId ? { ...itemToReset } : item
        );
        setSection1Data(updatedSection1);
        setResetMessage("Fields reset successfully");
        setTimeout(() => {
            setResetMessage("");
        }, 3000);
    };

    const { getRootProps: getRootPropsForUpdate, getInputProps: getInputPropsForUpdate } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setSelectedImageForUpdate(file);
            }
        },
    });

    const handleInputChangeForAdd = (e, field) => {
        setNewItem({
            ...newItem,
            [field]: e.target.value,
        });
    };

    const handleAddItem = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("backgroundImage", selectedImageForAdd);
            formData.append("title", newItem.title);
            formData.append("subtitle", newItem.subtitle);
            formData.append("description", newItem.description);

            const response = await axios.post(
                "https://backend.asteraporcelain.com/api/v1/homescreen/addSection1Item",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Add item successful:", response.data);
            setSaveSuccess(true);
            setNewItem({
                title: "",
                subtitle: "",
                description: "",
                backgroundImage: null,
            });
            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("Error adding item:", error);
        } finally {
            setLoading(false);
        };fetchData();
    };

    const { getRootProps: getRootPropsForAdd, getInputProps: getInputPropsForAdd } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setSelectedImageForAdd(file);
            }
        },
    });

    const renderSectionItems = () => {
        return section1Data.map((item, index) => (
            <div key={item._id} className="mt-6">
                <div className="text-lg font-semibold leading-7 text-gray-900">
                    Section 1{" "}
                    <span className="mt-1 text-lg text-bold ml-4 whitespace-nowrap text-red-600">
                        Update Item For Section 1
                    </span>
                </div>
                <div className="mt-1 text-sm leading-5 text-slate-600">
                    Update desired photo and details here.
                </div>
                <div className="mt-1 text-lg text-black font-bold leading-5 text-slate-600">
                    Slide {index + 1}
                </div>
                <div className="flex items-center mb-4 mt-5">
                    <label className="mr-2 font-semibold">Title:</label>
                    <input
                        type="text"
                        className="border rounded-lg px-3 py-2 w-64 ml-[30rem]"
                        value={item.title}
                        onChange={(e) => handleInputChange(e, item._id, "title")}
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="mr-2 font-semibold">Subtitle:</label>
                    <input
                        type="text"
                        className="border rounded-lg px-3 py-2 w-64 ml-[28rem]"
                        value={item.subtitle}
                        onChange={(e) => handleInputChange(e, item._id, "subtitle")}
                    />
                </div>
                <div className="mb-4">
                    <label className="mr-2 font-semibold">Description:</label>
                    <ReactQuill
                        className="border rounded-lg px-3 py-2 w-full ml-[30rem]"
                        value={item.description}
                        onChange={(content) =>
                            handleInputChange(
                                { target: { value: content } },
                                item._id,
                                "description"
                            )
                        }
                    />
                </div>
                <div className="w-full ml-[30rem] mt-4  flex items-center">
                    {item.backgroundImageUrl && (
                        <img
                            src={`https://backend.asteraporcelain.com/${item.backgroundImageUrl}`}
                            alt="Uploaded"
                            className="w-auto whitespace-nowrap h-40 object-cover rounded-lg mr-4"
                        />
                    )}
                    <div
                        {...getRootPropsForUpdate()}
                        className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
                    >
                        <input {...getInputPropsForUpdate()} />
                        <img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-600">
                            SVG, PNG, JPG or GIF (max. 800x400px)
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-start gap-4 mt-4 ml-4">
                    <button
                        className="text-white bg-purple-600 rounded-lg px-5 py-2.5"
                        onClick={() => handleSave(item._id)}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Update"
                        )}
                    </button>
                    <button
                        className="text-black bg-white border rounded-lg px-5 py-2.5"
                        onClick={() => handleCancel(item._id)}
                    >
                        Cancel
                    </button>
                    {resetMessage && (
                        <div className="text-red-600 ml-4">{resetMessage}</div>
                    )}
                </div>
                <hr className="my-6 border-gray-300" style={{ width: "350%" }} />
            </div>
        ));
    };

    const renderUpdateSection = () => {
        return (
            <div className="mt-6">
                <div className="flex items-center mb-4">
                    <label className="mr-2 font-semibold">Title:</label>
                    <input
                        type="text"
                        className="border rounded-lg px-3 py-2 w-64 ml-[30rem]"
                        value={newItem.title}
                        placeholder="Enter Title"
                        onChange={(e) => handleInputChangeForAdd(e, "title")}
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="mr-2 font-semibold">Subtitle:</label>
                    <input
                        type="text"
                        className="border rounded-lg px-3 py-2 w-64 ml-[28rem]"
                        value={newItem.subtitle}
                        placeholder="Enter Subtitle"
                        onChange={(e) => handleInputChangeForAdd(e, "subtitle")}
                    />
                </div>
                <div className="mb-4">
                    <label className="mr-2 font-semibold">Description:</label>
                    <ReactQuill
                        className="border rounded-lg px-3 py-2 w-full ml-[32rem]"
                        theme="snow"
                        value={newItem.description}
                        placeholder="Enter Description"
                        onChange={(content) =>
                            handleInputChangeForAdd(
                                { target: { value: content } },
                                "description"
                            )
                        }
                    />
                </div>
                <div className="w-full ml-[32rem] mt-4  flex items-center">
                    {newItem.backgroundImage && (
                        <img
                            src={URL.createObjectURL(newItem.backgroundImage)}
                            alt="Uploaded Image"
                            className="w-full mt-2 rounded-lg"
                            style={{ maxHeight: "200px" }}
                        />
                    )}
                    <div
                        {...getRootPropsForAdd()}
                        className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap ml-[1rem]"
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
                <button
                    className="text-white bg-purple-600 rounded-lg px-5 py-2.5 top-[265rem] ml-[85%] mt-4 whitespace-nowrap"
                    onClick={handleAddItem}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
                </button>
                <hr
                    className="my-4 border-black border-empty border-1"
                    style={{ width: "350%" }}
                />
            </div>
        );
    };

    return (
        <>
            <div className="max-w-lg ml-4 mt-4">
                
                {renderSectionItems()}
            </div>

            <div className="max-w-lg ml-4 mt-4">
                <div className="text-lg font-semibold leading-7 text-gray-900">
                    Section 1{" "}
                    <span className="mt-1 text-lg text-bold ml-4 whitespace-nowrap text-red-600">
                        Add Item For Section 1
                    </span>
                </div>
                <div className="mt-1 text-sm leading-5 text-slate-600">
                    Update desired photo and details here.
                </div>
                {renderUpdateSection()}
            </div>
        </>
    );
};
