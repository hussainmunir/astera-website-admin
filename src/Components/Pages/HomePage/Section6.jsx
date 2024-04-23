import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Section6 = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [editorContent, setEditorContent] = useState("");
	const [charCount, setCharCount] = useState(0);
	const [avatarImage, setAvatarImage] = useState(null); // State for avatar image
	const maxChars = 500; // Set the max characters allowed

	const onDrop = useCallback((acceptedFiles) => {
		setSelectedImage(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	// Handler for the editor change
	const handleEditorChange = (content, delta, source, editor) => {
		setEditorContent(content);
		setCharCount(editor.getLength() - 1); // Minus 1 to not count the trailing newline
	};

	// Function to handle dropping avatar image
	const onDropAvatar = useCallback((acceptedFiles) => {
		setAvatarImage(acceptedFiles[0]);
	}, []);

	const {
		getRootProps: getRootPropsAvatar,
		getInputProps: getInputPropsAvatar,
	} = useDropzone({
		onDrop: onDropAvatar,
	});

	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ size: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }],
			["link", "image", "video"],
			["clean"],
		],
		clipboard: {
			// Extend default configuration to handle pasted text
			matchVisual: false,
		},
	};

	const formats = [
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
	];
	return (
		<div className="w-full">
			<div className="max-w-lg ml-[2rem] mt-[2rem]">
				<div className="hidden md:flex items-center justify-between mb-[1rem]">
					<div className="w-full flex flex-col">
						<div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
							Section 6
						</div>
						<div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
							Update desired photo and details here.
						</div>
					</div>
					<button className="text-white bg-purple-600 rounded-lg px-5 py-2.5 absolute ml-[87%] ">
						Save
					</button>
					<button className="text-black bg-white border-2 border-black rounded-2xl px-3 py-2 absolute ml-[80%]">
						Cancel
					</button>
				</div>
				<div className="flex items-center">
					<label className="block text-lg font-semibold mb-1 mr-[32rem] whitespace-nowrap">
						Name
					</label>
					<div className="flex">
						<input
							type="text"
							className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black mr-[2rem]"
							placeholder="HEADING"
						/>
						<input
							type="text"
							className="w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
							placeholder="PARAGRAPH"
						/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="w-1/3">
						<label className="block text-lg mt-8 font-semibold mb-1 whitespace-nowrap">
							Set Avatar
						</label>
					</div>
					<div className="mt-8 ml-8 flex justify-start items-center">
						{/* Avatar Image Display */}
						{avatarImage && (
							<img
								src={URL.createObjectURL(avatarImage)}
								alt="Avatar"
								className="w-32 h-32 rounded-full mr-4"
							/>
						)}
						{/* Upload Avatar Section */}
						<div
							{...getRootPropsAvatar()}
							className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center cursor-pointer"
						>
							<input {...getInputPropsAvatar()} />
							<img
								src={uploadsvg}
								alt="Upload Icon"
								className="w-12 h-12 mb-2"
							/>
							<p className="text-sm text-gray-600 mb-2">
								Click to upload or drag and drop
							</p>
							<p className="text-xs text-gray-600">
								(Supported formats: SVG, PNG, JPG, or GIF)
							</p>
						</div>
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
							modules={modules}
							formats={formats}
							placeholder="Write a short introduction."
							style={{ height: "200px", marginBottom: "40px", width: "600px" }}
						/>
						<div className="text-sm ml-1 text-gray-600">
							{`${maxChars - charCount} characters left`}
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between">
					<div className="w-1/3">
						<label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1">
							Image 1{" "}
							<HelpOutlineIcon
								style={{
									fontSize: 16,
									color: "gray",
									backgroundColor: "white",
								}}
							/>
						</label>
						<p className="text-xs text-gray-500 mb-2 ml-[2rem]">
							This will be displayed on your Hero Section.
						</p>
					</div>
					<div className="w-full mt-[2rem] ml-[22rem] flex justify-start">
						{selectedImage && (
							<img
								src={URL.createObjectURL(selectedImage)}
								alt="Uploaded"
								className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
							/>
						)}
						<div
							{...getRootProps()}
							className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
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

			<div className="border border-l border-gray m-[2rem] "></div>
		</div>
	);
};

export default Section6;
