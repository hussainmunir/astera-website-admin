import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { CircularProgress, Switch } from "@mui/material";
import axios from "axios";

export const Section1 = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [editorContent, setEditorContent] = useState("");
	const [charCount, setCharCount] = useState(0);
	const [inputEnabled, setInputEnabled] = useState(false);
	const [inputText, setInputText] = useState("");
	const [title, setTitle] = useState("");
	const [subtitle, setSubtitle] = useState("");
	const [description, setDescription] = useState("");
	const [Id, setId] = useState("");
	const [loading, setLoading] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState(false);
	const [resetMessage, setResetMessage] = useState("");
	const [originalData, setOriginalData] = useState(null); // Store original fetched data
	const [section1Data, setSection1Data] = useState([]);


	const maxChars = 500;

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
					console.log("section1Data", section1Data);
					const section1DataItem = response.data.data.homePage.section1[0];
					setTitle(section1DataItem.title);
					setId(section1DataItem._id);
					setSubtitle(section1DataItem.subtitle);
					setDescription(section1DataItem.description);
					setOriginalData(section1DataItem); // Store original fetched data
					setSelectedImage(
						`https://backend.asteraporcelain.com/${section1DataItem.backgroundImageUrl}`
					);
					setEditorContent(section1DataItem.description);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const onDrop = useCallback((acceptedFiles) => {
		setSelectedImage(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const handleEditorChange = (content, delta, source, editor) => {
		setEditorContent(content);
		setCharCount(editor.getLength() - 1);
	};

	const handleCancel = () => {
		if (originalData) {
			setTitle(originalData.title);
			setSubtitle(originalData.subtitle);
			setDescription(originalData.description);
			setEditorContent(originalData.description);
			setSelectedImage(
				`https://backend.asteraporcelain.com/${originalData.backgroundImageUrl}`
			);

			// Set reset message
			setResetMessage("Fields reset successfully");

			// Clear reset message after 3 seconds
			setTimeout(() => {
				setResetMessage("");
			}, 3000);
		}
	};

	const handleSave = async () => {
		try {
			const formData = new FormData();
			formData.append("backgroundImage", selectedImage);
			formData.append("title", title);
			formData.append("subtitle", subtitle);
			formData.append("description", description);
			formData.append("id", Id);


			const response = await axios.post(
				"https://backend.asteraporcelain.com/api/v1/homescreen/updateSection1Item",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log("Save successful:", response.data);
			setSaveSuccess(true);

			// Hide success message after 3 seconds (3000 milliseconds)
			setTimeout(() => {
				setSaveSuccess(false);
			}, 3000);
			// Optionally add logic to display a success message or perform other actions
		} catch (error) {
			console.error("Error saving data:", error);
			// Handle error scenarios, e.g., display an error message to the user
		}
	};


  const handleInputChange = (e, itemId, field) => {
		const updatedSection1 = section1Data.section1.map((item) => {
			if (item._id === itemId) {
				return { ...item, [field]: e.target.value };
			}
			return item;
		});
		setSection1Data({ ...section1Data, section1: updatedSection1 });
	};

	return (
		<div className="max-w-lg ml-[2rem] mt-[2rem]">
			<div className="flex items-center justify-between mb-[1rem]">
				<div className="w-full flex flex-col">
					<div className="w-full text-lg font-semibold leading-7 text-gray-900">
						Section 1
					</div>

					<div className="mt-1 w-full text-sm leading-5 text-slate-600">
						Update desired photo and details here.
					</div>
				</div>
			</div>
			<div className="w-full ml-[38rem] mb-2 text-lg font-semibold leading-7 text-red-500 text-center">
				For Update Sections through Ids in Section 1
			</div>
			<div>
				<div>
					{section1Data.map((item, index) => (
						<div key={item._id}>
							<div className="flex items-center">
								<label className="block text-lg font-semibold mb-1 mt-12 mr-[32rem] whitespace-nowrap">
									Title {index}
								</label>
								<div className="flex">
									<input
										type="text"
										className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black mr-[2rem]"
										placeholder="HEADING"
										value={item.title}
										onChange={(e) => handleInputChange(e, item._id, "title")}
									/>
									<input
										type="text"
										className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
										placeholder="PARAGRAPH"
										value={item.subtitle}
										onChange={(e) => handleInputChange(e, item._id, "subtitle")}
									/>
								</div>
							</div>

							<div className="flex mt-[2rem]">
								<label
									htmlFor="bio"
									className="text-lg font-medium text-gray-900 mr-[24rem]"
								>
									Description
									<br />
									<span className="font-light text-sm whitespace-nowrap">
										Write a short introduction.
									</span>
								</label>
								<div className="flex flex-col">
									<textarea
										value={item.description}
										onChange={(e) =>
											handleInputChange(e, item._id, "description")
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

							<div className="flex items-center justify-between mt-[2rem]">
								<div className="w-1/3">
									<label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1">
										Image
									</label>
									<p className="text-xs text-gray-500 mb-2 ml-[2rem] whitespace-nowrap">
										This will be displayed on your Hero Section.
									</p>
								</div>
								<div className="w-auto mt-[2rem] ml-[22rem] flex">
									{item.backgroundImageUrl && (
										<img
											src={item.backgroundImageUrl}
											alt="Uploaded"
											className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
										/>
									)}
									<div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center whitespace-nowrap">
										{/* Your upload component */}
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

							{/* Update Button */}
							{loading ? (
								<CircularProgress size={24} color="inherit" />
							) : (
								<button
									className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute  ml-[60%]"
									onClick={handleSave}
								>
									Update
								</button>
							)}
							{saveSuccess && (
								<div className="text-green-600 mt-2 absolute top-[72rem] ml-[60%]">
									Update successful!
								</div>
							)}
							<button
								className="text-black bg-white border-2 border-black rounded-2xl px-3 py-2 absolute  ml-[55%]"
								onClick={handleCancel}
							>
								Cancel
							</button>
							{resetMessage && (
								<div className="text-red-600 mt-2 absolute top-[72rem] ml-[55%]">
									{resetMessage}
								</div>
							)}
							<div className="border border-l border-gray m-[2rem] "></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

// export default Section1;
