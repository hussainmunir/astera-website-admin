import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import uploadsvg from "../../../Images/UploadIcons.png";
import { CircularProgress } from "@mui/material";

const Section6 = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		occupation: "",
		bio: "",
		avatarImage: null,
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
					response.data.data.homePage.section6 &&
					response.data.data.homePage.section6.length > 0
				) {
					const section6Data =
						response.data.data.homePage.section6[
							response.data.data.homePage.section6.length - 1
						]; // Get the latest item from the section6 array

					setFormData({
						name: section6Data.name || "",
						occupation: section6Data.occupation || "",
						bio: section6Data.bio || "",
						avatarImage: section6Data.avatarImgUrl
							? `https://backend.asteraporcelain.com/${section6Data.avatarImgUrl}`
							: null,
						backgroundImage: section6Data.backgroundImageUrl
							? `https://backend.asteraporcelain.com/${section6Data.backgroundImageUrl}`
							: null,
					});
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleSave = async () => {
		try {
			const formDataToSend = new FormData();
			formDataToSend.append("name", formData.name);
			formDataToSend.append("occupation", formData.occupation);
			formDataToSend.append("bio", formData.bio);
			if (formData.avatarImage) {
				formDataToSend.append("avatarImage", formData.avatarImage);
			}
			if (formData.backgroundImage) {
				formDataToSend.append("backgroundImage", formData.backgroundImage);
			}

			const response = await axios.post(
				"https://backend.asteraporcelain.com/api/v1/homescreen/addSection6Item",
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log("Data saved successfully:", response.data);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	const handleEditorChange = (content) => {
		setFormData({ ...formData, bio: content });
	};

	const onDropAvatar = (acceptedFiles) => {
		const avatarImageFile = acceptedFiles[0];
		setFormData({ ...formData, avatarImage: avatarImageFile });
	};

	const onDropBackground = (acceptedFiles) => {
		const backgroundImageFile = acceptedFiles[0];
		setFormData({ ...formData, backgroundImage: backgroundImageFile });
	};

	const {
		getRootProps: getAvatarRootProps,
		getInputProps: getAvatarInputProps,
	} = useDropzone({
		onDrop: onDropAvatar,
		accept: "image/*",
	});

	const {
		getRootProps: getBackgroundRootProps,
		getInputProps: getBackgroundInputProps,
	} = useDropzone({
		onDrop: onDropBackground,
		accept: "image/*",
	});

	return (
		<div className="w-full max-w-lg ml-8 mt-8">
			<div className="text-lg font-semibold leading-7 text-gray-900">
				Section 6
			</div>
			<div className="mt-1 text-sm leading-5 text-gray-600">
				Update desired details here.
			</div>
			{loading ? (
				<CircularProgress size={24} color="inherit" />
			) : (
				<button
					className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute top-[360rem] ml-[90%]"
					onClick={handleSave}
				>
					Save
				</button>
			)}

			<div className="flex items-center mt-4">
				<label htmlFor="name" className="block text-lg font-semibold mb-1 mr-4">
					Name
				</label>
				<input
					id="name"
					type="text"
					className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black ml-[30rem]"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
			</div>

			<div className="flex items-center mt-[4rem]">
				<label
					htmlFor="occupation"
					className="block text-lg font-semibold mb-1 mr-4"
				>
					Occupation
				</label>
				<input
					id="occupation"
					type="text"
					className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black ml-[28rem] "
					value={formData.occupation}
					onChange={(e) =>
						setFormData({ ...formData, occupation: e.target.value })
					}
				/>
			</div>

			<div className="mt-[4rem]">
				<label htmlFor="bio" className="block text-lg font-semibold mb-1">
					Bio
				</label>
				<ReactQuill
					theme="snow"
					value={formData.bio}
					onChange={handleEditorChange}
					placeholder="Write a short introduction."
					style={{
						height: "200px",
						marginBottom: "40px",
						width: "100%",
						marginLeft: "30rem",
					}}
				/>
			</div>

			<div className="flex items-center mt-[4rem]">
				<div className="w-1/3">
					<label className="block text-lg font-semibold mb-1 whitespace-nowrap">Set Avatar</label>
				</div>
				<div className="mt-2 flex justify-start items-center">
					{formData.avatarImage && (
						<img
							src={formData.avatarImage}
							alt="Avatar"
							className="w-32 h-32 rounded-full mr-4 ml-[24rem] "
						/>
					)}
					<div
						{...getAvatarRootProps()}
						className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center cursor-pointer"
					>
						<input {...getAvatarInputProps()} />
						<img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
						<p className="text-sm text-gray-600 mb-2 whitespace-nowrap">
							Click to upload or drag and drop
						</p>
						<p className="text-xs text-gray-600">
							(Supported formats: SVG, PNG, JPG, or GIF)
						</p>
					</div>
				</div>
			</div>

			<div className="flex items-center mt-4">
				<div className="w-1/3">
					<label className="block text-lg font-semibold mb-1 whitespace-nowrap">
						Set Background Image
					</label>
				</div>
				<div className="mt-2 flex justify-start items-center ml-[24rem] mb-[4rem]">
					{formData.backgroundImage && (
						<img
							src={formData.backgroundImage}
							alt="Background"
							className="w-64 h-32 rounded-lg mr-4"
						/>
					)}
					<div
						{...getBackgroundRootProps()}
						className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center cursor-pointer"
					>
						<input {...getBackgroundInputProps()} />
						<img src={uploadsvg} alt="Upload Icon" className="w-12 h-12 mb-2" />
						<p className="text-sm text-gray-600 mb-2 whitespace-nowrap">
							Click to upload or drag and drop
						</p>
						<p className="text-xs text-gray-600">
							(Supported formats: SVG, PNG, JPG, or GIF)
						</p>
					</div>
				</div>
			</div>

			{/* <div className="mt-8">
				<button
					className="text-white bg-purple-600 rounded-lg px-5 py-2.5"
					onClick={handleSave}
				>
					Save
				</button>
			</div> */}
		</div>
	);
};

export default Section6;


