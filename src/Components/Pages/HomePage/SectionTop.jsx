import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import uploadsvg from "../../../Images/UploadIcons.png";
import { baseUrl } from "../../../api/base_urls";

export function SectionTop() {
	const [sectionData, setSectionData] = useState(null);
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState(false);
	const [resetMessage, setResetMessage] = useState("");

	useEffect(() => {
		const fetchSectionData = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}homescreen/getAllCollections`
				);
				if (
					response.data &&
					response.data.data &&
					response.data.data.homePage &&
					response.data.data.homePage.sectionTop
				) {
					setSectionData(response.data.data.homePage.sectionTop);
				}
			} catch (error) {
				console.error("Error fetching section data:", error);
			}
		};

		fetchSectionData();
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: "video/*",
		onDrop: (acceptedFiles) => {
			setSelectedVideo(acceptedFiles[0]);
		},
	});

	const handleSave = async () => {
		setLoading(true);
		const formData = new FormData();
		if (selectedVideo) {
			formData.append("videoFile", selectedVideo);
		}

		try {
			const response = await axios.post(
				`${baseUrl}homescreen/uploadSectionTopVideo`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("Update successful:", response.data);
			setSaveSuccess(true);
		} catch (error) {
			console.error("Error updating section:", error);
		} finally {
			setLoading(false);
			setTimeout(() => {
				setSaveSuccess(false);
			}, 3000);
		}
	};

	const handleCancel = () => {
		setSelectedVideo(null);
		setResetMessage("Fields reset successfully");
		setTimeout(() => {
			setResetMessage("");
		}, 3000);
	};

	return (
		<div>
			{sectionData && (
				<div className="max-w-lg ml-[2rem] mt-[2rem]">
					<div className="flex justify-between items-start">
						<div>
							<h1 className="text-lg font-bold text-gray-600">Section Top</h1>
							<p className="text-sm text-gray-600">
								Update desired video here.
							</p>
						</div>
						{loading ? (
							<CircularProgress size={24} color="inherit" />
						) : (
							<button
								className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute top-[20rem] ml-[90%]"
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
						<button
							className="text-black bg-white border-2 border-black rounded-2xl px-3 py-2 absolute top-[20rem] ml-[85%]"
							onClick={handleCancel}
						>
							Cancel
						</button>
						{resetMessage && (
							<div className="text-red-600 mt-2 absolute top-[25rem] ml-[85%]">
								{resetMessage}
							</div>
						)}
						{/* <div className="flex space-x-4 mt-2">
							<button
								className="bg-red-600 text-white px-5 py-2 rounded-lg absolute top-[20rem] ml-[55%]"
								onClick={handleCancel}
							>
								Reset
								{resetMessage && (
									<p className="text-green-500">{resetMessage}</p>
								)}
							</button>
							{loading ? (
								<CircularProgress size={24} color="inherit" />
							) : (
								<button
									className="bg-purple-600 text-white px-5 py-2 rounded-lg absolute top-[20rem] ml-[65%]"
									onClick={handleSave}
									// disabled={!selectedVideo}
								>
									Save
								</button>
							)}
							{saveSuccess && (
								<p className="text-green-500">Changes saved successfully!</p>
							)}
						</div> */}
					</div>
					<div className="mt-4 flex items-center justify-between">
						<div className="w-1/3">
							<label className="block text-lg ml-2 mt-2 font-semibold mb-1">
								Hero Video
							</label>
							<span className="text-xs text-gray-500 ml-2 max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
								This will be displayed on your Hero Section.
							</span>
						</div>
						<div className="w-full mt-2 flex justify-start items-center ml-[24rem]">
							{selectedVideo ? (
								<video
									controls
									src={URL.createObjectURL(selectedVideo)}
									className="w-auto h-40 rounded-lg mr-2"
								/>
							) : (
								<video
									controls
									src={`${baseUrl}${sectionData.videoUrl}`}
									className="w-auto h-40 rounded-lg mr-2"
								/>
							)}
							<div
								{...getRootProps()}
								className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap"
								style={{ minWidth: "200px" }}
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
									MP4, AVI (max. 800x400px)
								</p>
							</div>
						</div>
					</div>
					{/* {saveSuccess && (
						<p className="text-green-500">Changes saved successfully!</p>
					)}
					{resetMessage && <p className="text-green-500">{resetMessage}</p>} */}
				</div>
			)}
		</div>
	);
}
