import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CircularProgress from "@mui/material/CircularProgress";
import uploadsvg from "../../../Images/UploadIcons.png";
import { useCollections } from "../../../CollectionsContext";
import { baseUrl,baseUrlImage } from "../../../api/base_urls";

export function Discoversection7() {
	const collections = useCollections();
  const [sectionTitle, setSectionTitle] = useState("");
	const [sectionData, setSectionData] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [editorContent, setEditorContent] = useState("");
	const [charCount, setCharCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
	const maxChars = 500;

	useEffect(() => {
		const fetchSectionData = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}homescreen/getAllCollections`
				);
				if (
					response.data &&
					response.data.data &&
					response.data.data.discoverPage &&
					response.data.data.discoverPage.section7
				) {
					const { section7 } = response.data.data.discoverPage;
					setSectionData(section7);
					setEditorContent(section7.description);
					// Set the title state here
					setSectionTitle(section7.title);
				}
			} catch (error) {
				console.error("Error fetching section data:", error);
			}
		};

		fetchSectionData();
	}, []);


	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			setSelectedImage(acceptedFiles[0]);
		},
	});

	const handleSave = async () => {
		setLoading(true);

		const requestData = {
			title: sectionTitle,
			description: editorContent,
		  };
	  
		  if (selectedImage) {
			requestData.backgroundImage = selectedImage;
		  }

		try {
			const response = await axios.post(
				"https://backend.asteraporcelain.com/api/v1/discoverScreen/updateSection7",
				requestData,
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
		if (sectionData) {
			setSectionTitle(sectionData.title);
			setEditorContent(sectionData.description);
			setSelectedImage(null);

			// Set reset message
			setResetMessage("Fields reset successfully");

			// Clear reset message after 3 seconds
			setTimeout(() => {
				setResetMessage("");
			}, 3000);
		}
	};


	const handleEditorChange = (content, delta, source, editor) => {
		setEditorContent(content);
		setCharCount(editor.getLength() - 1);
	};

	return (
		<div>
			{sectionData && (
				<div className="max-w-lg ml-[2rem] mt-[2rem]">
					<div className="flex items-center justify-between mb-[1rem]">
						<div className="w-full flex flex-col">
							<div className="w-full text-gray-600 text-lg max-md:max-w-full">
								<b>Section 7</b>
							</div>
							<div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
								Update desired photo and details here.
							</div>
						</div>
					</div>
					{loading ? (
						<CircularProgress size={24} color="inherit" />
					) : (
						<button
							className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute top-[260rem] ml-[86%]"
							onClick={handleSave}
						>
							Save
						</button>
					)}
					{saveSuccess && (
						<div className="text-green-600 mt-2 absolute top-[263rem] ml-[85%]">
							Save successful!
						</div>
					)}
					<button
						className="text-black bg-white border-2 border-black rounded-2xl px-3 py-2 absolute top-[260rem] ml-[80%]"
						onClick={handleCancel}
					>
						Cancel
					</button>
					{resetMessage && (
						<div className="text-red-600 mt-2 absolute top-[263rem] ml-[85%]">
							{resetMessage}
						</div>
					)}
					<div className="flex items-center">
						<label className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap">
							Title
						</label>
						<div className="flex">
							<input
								type="text"
								className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black mr-[2rem]"
								value={sectionTitle}
								placeholder="Title"
								onChange={(e) => setSectionTitle(e.target.value)}
							/>
						</div>
					</div>
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
								value={editorContent}
								onChange={handleEditorChange}
								modules={{ toolbar: true }}
								formats={[
									"header",
									"font",
									"size",
									"bold",
									"italic",
									"underline",
									"strike",
									"blockquote",
									"list",
									"bullet",
									"link",
									"image",
									"video",
								]}
								placeholder="Write a short introduction."
								style={{
									height: "200px",
									marginBottom: "40px",
									width: "600px",
								}}
							/>
							<div className="text-sm ml-1 text-gray-600">
								{`${maxChars - charCount} characters left`}
							</div>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<div className="w-1/3">
								<label className="block text-lg ml-2 mt-2 font-semibold mb-1">
									Hero Image{" "}
									<HelpOutlineIcon
										style={{
											fontSize: 16,
											color: "gray",
											backgroundColor: "white",
										}}
									/>
								</label>
								<span className="text-xs text-gray-500 ml-2 max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
									This will be displayed on your Hero Section.
								</span>
							</div>
							<div className="w-full mt-2 ml-[22rem] flex justify-start items-center">
								{selectedImage ? (
									<img
										src={URL.createObjectURL(selectedImage)}
										alt="Uploaded"
										className="w-auto h-40 object-cover rounded-lg mr-2"
									/>
								) :sectionData && sectionData.backgroundImageUrl ? (
									<img
										src={`${baseUrlImage}${sectionData.backgroundImageUrl}`}
										alt="Initial Image"
										className="w-auto h-40 object-cover rounded-lg mr-2"
									/>
								):[null]}
								<div
									{...getRootProps()}
									className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
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
										SVG, PNG, JPG or GIF (max. 800x400px)
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="border-b mt-[1rem]"></div>
		</div>
	);
}
