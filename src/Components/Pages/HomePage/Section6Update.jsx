import React, {useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { CircularProgress } from "@mui/material";
import uploadsvg from "../../../Images/UploadIcons.png";
import ReactQuill from "react-quill";
import { baseUrlImage } from "../../../api/base_urls";

const Section6Update = ({ item, index, fetchData }) => {
	const [section6Data, setSection6Data] = useState([]);
	const [loading, setLoading] = useState(false);

	const [itemId, setItemId] = useState("");
	const [name, setName] = useState("");
	const [occupation, setOccupation] = useState("");
	const [bio, setBio] = useState("");
	const [avatarImage, setAvatarImage] = useState(null);
	const [backgroundImage, setBackgroundImage] = useState(null);
	const [selectedAvatarImage, setSelectedAvatarImage] = useState(null);
	const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);



	useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				"https://backend.asteraporcelain.com/api/v1/homescreen/getAllCollections"
	// 			);
	// 			if (
	// 				response.data &&
	// 				response.data.data &&
	// 				response.data.data.homePage &&
	// 				response.data.data.homePage.section6
	// 			) {
	// 				setSection6Data(response.data.data.homePage.section6);
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error);
	// 		}
	// 	};

	// 	fetchData();
	setItemId(item._id);
	setName(item.name);
	setOccupation(item.occupation);
	setBio(item.bio);
	setAvatarImage(item.avatarImgUrl);
	setBackgroundImage(item.backgroundImageUrl);


	}, [item]);

	// const fetchData = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			"https://backend.asteraporcelain.com/api/v1/homescreen/getAllCollections"
	// 		);
	// 		if (
	// 			response.data &&
	// 			response.data.data &&
	// 			response.data.data.homePage &&
	// 			response.data.data.homePage.section6
	// 		) {
	// 			setSection6Data(response.data.data.homePage.section6);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching data:", error);
	// 	}
	// };

	const handleUpdateItem = async () => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("id", itemId);
			formData.append("name", name);
			formData.append("occupation", occupation);
			formData.append("bio", bio);
			if (selectedAvatarImage) {
				formData.append("avatarImage", selectedAvatarImage);
			}
			if (selectedBackgroundImage) {
				formData.append("backgroundImage", selectedBackgroundImage);
			}
			for (let pair of formData.entries()) {
				console.log(pair[0] + ", " + pair[1]);
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

	const handleEditorChange = (content, delta, source, editor) => {
		setBio(content);
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

	const onDropAvatarImages = useCallback(
		(acceptedFiles) => {
		  setSelectedAvatarImage(acceptedFiles[0]); // Concatenate new images with existing array
		},
		[setSelectedAvatarImage]
	  );

	const handleDropWithIndex = (index) => async (acceptedFiles) => {
		const file = acceptedFiles[0];
		if (file) {
		  await handleFileDrop(file, "avatarImage", section6Data[index]._id);
		}
	  };
	const {
		getRootProps: getAvatarRootProps,
		getInputProps: getAvatarInputProps,
	} = useDropzone({
		accept: "image/*",
		onDrop: onDropAvatarImages
	});



	// const { getAvatarRootProps, getAvatarInputProps } = useDropzone({
	// 	accept: "image/*",
	// 	onDrop: async (acceptedFiles) => {
	// 	  const file = acceptedFiles[0];
	// 	  if (file) {
	// 		// Access index from getInputProps
	// 		const index = getInputProps().index;
	// 		await handleFileDrop(file, "avatarImage", section6Data[index]._id);
	// 	  }
	// 	},
	//   });
	const onDropbackgroundImages = useCallback(
		(acceptedFiles) => {
		  setSelectedBackgroundImage(acceptedFiles[0]); 
		},
		[setSelectedBackgroundImage]
	  );

	const {
		getRootProps: getBackgroundRootProps,
		getInputProps: getBackgroundInputProps,
	} = useDropzone({
		accept: "image/*",
		onDrop: onDropbackgroundImages
	});

	

	return (
		<div className="max-w-lg ml-4 mt-4">
			<div className="text-lg font-semibold leading-7 text-gray-900">
				Section 6
				<span className="mt-1 text-lg text-bold ml-4 whitespace-nowrap text-red-600">
					Update Item For Section 6
				</span>
			</div>

				<div className="mt-6">
					Slider {index + 1}
						<hr
				className="my-4 border-gray-200 border-empty border-1"
				style={{ width: "250%" }}
			/>
					<div className="flex items-center mb-4">
						<label className=" font-semibold mr-[30rem]">Name:</label>
						<input
						type="text"
						className="border rounded-lg px-3 py-2 w-64 ml-4"
						value={name}
						placeholder="Enter Name"
						onChange={(e) => setName(e.target.value)}
					/>
					</div>
					<div className="flex items-center mb-4 ">
						<label className=" font-semibold mr-[28rem]">Occupation:</label>
						<input
						type="text"
						className="border rounded-lg px-3 py-2 w-64 ml-3"
						placeholder="Enter Occupation"
						value={occupation}
						onChange={(e) => setOccupation(e.target.value)}
					/>
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
								value={bio}
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
					{/* Avatar */}

					<div className="w-full mt-4  flex items-center">
						<label className="mr-2 font-semibold">Avatar</label>
						{selectedAvatarImage ? (
						<img
						src={URL.createObjectURL(selectedAvatarImage)}

						alt="Uploaded"
						className="w-auto whitespace-nowrap h-40 object-cover rounded-lg mr-4  ml-[30rem]"
					/>	
						):
						<img
							src={`${baseUrlImage}${avatarImage}`}
							alt="Uploaded"
							className="w-auto whitespace-nowrap h-40 object-cover rounded-lg mr-4  ml-[30rem]"
						/>
						}
						<div
							 {...getAvatarRootProps()}
							className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
						>
							 <input {...getAvatarInputProps({ index: index })} />
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
						{selectedBackgroundImage ? (
							<img
							src={URL.createObjectURL(selectedBackgroundImage)}
							alt="Uploaded"
							className="w-auto whitespace-nowrap h-40 object-cover rounded-lg mr-4  ml-[30rem]"
						/>
						):
						
						<img
							src={`${baseUrlImage}${backgroundImage}`}
							alt="Uploaded"
							className="w-auto whitespace-nowrap h-40 object-cover rounded-lg mr-4  ml-[30rem]"
						/>
						}
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
							onClick={() => handleUpdateItem()}
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
				
			<hr
				className="my-4 border-gray-200 border-empty border-1 w-full"
				style={{ width: '250%' }}
			/>
		</div>
	);
};

export default Section6Update;
