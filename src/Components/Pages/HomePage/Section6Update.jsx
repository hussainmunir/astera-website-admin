import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { CircularProgress } from "@mui/material";
import uploadsvg from "../../../Images/UploadIcons.png";
import ReactQuill from "react-quill";
import { baseUrlImage } from "../../../api/base_urls";

const Section6Update = () => {
	const [section6Data, setSection6Data] = useState([]);
	const [loading, setLoading] = useState(false);

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
					response.data.data.homePage.section6
				) {
					setSection6Data(response.data.data.homePage.section6);
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
				response.data.data.homePage.section6
			) {
				setSection6Data(response.data.data.homePage.section6);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleUpdateItem = async (itemId, updatedItem) => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("id", itemId);
			formData.append("name", updatedItem.name);
			formData.append("occupation", updatedItem.occupation);
			formData.append("bio", updatedItem.bio);
			if (updatedItem.avatarImage) {
				formData.append("avatarImage", updatedItem.avatarImage);
			}
			if (updatedItem.backgroundImage) {
				formData.append("backgroundImage", updatedItem.backgroundImage);
			}

			const response = await axios.post(
				"https://backend.asteraporcelain.com/api/v1/homescreen/updateSection6Item",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			fetchData();

			setLoading(false);

			console.log("Update successful:", response.data);
			// Optionally update state or show success message
		} catch (error) {
			setLoading(false);
			console.error("Error updating item:", error);
			// Handle error state or show error message
		}
	};

	const handleEditItem = (itemId) => {
		// No need to toggle editable state, directly update item in state
		const updatedItems = section6Data.map((item) =>
			item._id === itemId ? { ...item } : item
		);
		setSection6Data(updatedItems);
	};

	const handleSaveItem = async (itemId, updatedItem) => {
		try {
			// Directly update item in state and then send update request
			const updatedItems = section6Data.map((item) =>
				item._id === itemId ? updatedItem : item
			);
			setSection6Data(updatedItems);

			// await handleUpdateItem(itemId, updatedItem);
		} catch (error) {
			console.error("Error saving item:", error);
			// Handle error state or show error message
		}
	};


	const handleFileDrop = async (file, field, itemId) => {
		const updatedItems = section6Data.map(item => {
			if (item._id === itemId) {
				return {
					...item,
					[field]: file
				};
			}
			return item;
		});

		setSection6Data(updatedItems);
	
		console.log("updatedItems", updatedItems);
	};

	const renderEditableInput = (item, fieldName) => (
		<input
			type="text"
			className="border rounded-lg px-3 py-2 w-64 ml-4"
			value={item[fieldName]}
			onChange={(e) =>
				handleSaveItem(item._id, { ...item, [fieldName]: e.target.value })
			}
		/>
	);

	const {
		getRootProps: getAvatarRootProps,
		getInputProps: getAvatarInputProps,
	} = useDropzone({
		accept: "image/*",
		onDrop: async (acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				await handleFileDrop(file, "avatarImage", section6Data[0]._id); // Assuming only one item is being edited
			}
		},
	});

	const {
		getRootProps: getBackgroundRootProps,
		getInputProps: getBackgroundInputProps,
	} = useDropzone({
		accept: "image/*",
		onDrop: async (acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				await handleFileDrop(file, "backgroundImage", section6Data[0]._id); // Assuming only one item is being edited
			}
		},
	});

	return (
		<div className="max-w-lg ml-4 mt-4">
			<div className="text-lg font-semibold leading-7 text-gray-900">
				Section 6
				<span className="mt-1 text-lg text-bold ml-4 whitespace-nowrap text-red-600">
					Update Item For Section 6
				</span>
			</div>

			{section6Data.map((item) => (
				<div key={item._id} className="mt-6">
						<hr
				className="my-4 border-gray-200 border-empty border-1"
				style={{ width: "250%" }}
			/>
					<div className="flex items-center mb-4">
						<label className=" font-semibold mr-[30rem]">Name:</label>
						{renderEditableInput(item, "name")}
					</div>
					<div className="flex items-center mb-4 ">
						<label className=" font-semibold mr-[28rem]">Occupation:</label>
						{renderEditableInput(item, "occupation")}
					</div>
					{/* Description */}

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
								value={item.bio}
								onChange={(content) =>
									handleSaveItem(item._id, { ...item, bio: content })
								}
								placeholder="Write a short introduction."
								style={{
									height: "200px",
									marginBottom: "40px",
									width: "600px",
								}}
							/>
						</div>
					</div>
					{/* Avatar */}

					<div className="w-full mt-4  flex items-center">
						<label className="mr-2 font-semibold">Avatar</label>
						<img
							src={`${baseUrlImage}${item.avatarImgUrl}`}
							alt="Uploaded"
							className="w-auto whitespace-nowrap h-40 object-cover rounded-lg mr-4  ml-[30rem]"
						/>
						<div
							{...getAvatarRootProps()}
							className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
						>
							<input {...getAvatarInputProps()} />
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
					{/* Background Image */}

					<div className="w-full mt-4  flex items-center">
						<label className="mr-2 font-semibold">Image</label>
						<img
							src={`${baseUrlImage}${item.backgroundImageUrl}`}
							alt="Uploaded"
							className="w-auto whitespace-nowrap h-40 object-cover rounded-lg mr-4  ml-[30rem]"
						/>
						<div
							{...getBackgroundRootProps()}
							className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
						>
							<input {...getBackgroundInputProps()} />
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
					<div className="mt-4">
						<button
							className="text-white bg-purple-600 rounded-lg px-5 py-2.5 mr-4"
							onClick={() => handleUpdateItem(item._id, item)}
							// disabled={loading}
						>
							{loading ? (
								<CircularProgress size={24} color="inherit" />
							) : (
								"Update"
							)}
						</button>
					</div>
				
				</div>
				
			))}
			<hr
				className="my-4 border-gray-200 border-empty border-1 w-full"
				style={{ width: '250%' }}
			/>
		</div>
	);
};

export default Section6Update;
