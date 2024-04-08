import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Section3 = () => {
	const [imageTextPairs, setImageTextPairs] = useState([]); // State for image-text pairs

	const onDropSupportiveImages = useCallback((acceptedFiles) => {
		const updatedPairs = acceptedFiles.map((file) => ({
			image: file,
			text: "", // Initialize text as empty
		}));
		setImageTextPairs((prevPairs) => [...prevPairs, ...updatedPairs]);
	}, []);

	const handleDeletePair = (indexToRemove) => {
		setImageTextPairs((prevPairs) =>
			prevPairs.filter((pair, index) => index !== indexToRemove)
		);
	};

	const {
		getRootProps: getRootPropsSupportiveImages,
		getInputProps: getInputPropsSupportiveImages,
	} = useDropzone({
		onDrop: onDropSupportiveImages,
		accept: "image/*",
		multiple: true,
	});

	return (
		<>
			{/* Display uploaded images with associated text inputs */}
			<div>
				<div className="flex items-center justify-between">
					<div className="w-1/3">
						<label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1 whitespace-nowrap">
							Supportive Images{" "}
							<HelpOutlineIcon
								style={{
									fontSize: 16,
									color: "gray",
									backgroundColor: "white",
								}}
							/>
						</label>
						<p className="text-xs text-gray-500 mb-2 ml-[2rem]">
							This will be displayed on your Section 3.
						</p>
					</div>
					<div className="w-full mt-[2rem] ml-[22rem] flex justify-start">
						<div className="flex gap-4">
							{imageTextPairs.map((pair, index) => (
								<div
									key={index}
									className="relative overflow-hidden rounded-lg"
								>
									<img
										src={URL.createObjectURL(pair.image)}
										alt="Uploaded"
										className="w-40 h-40 object-cover"
										style={{ objectFit: "cover" }}
									/>
									<input
										type="text"
										className="absolute bottom-0 left-0 w-full bg-white border rounded-b-lg px-2 py-1"
										placeholder="Enter description"
										value={pair.text}
										onChange={(e) =>
											setImageTextPairs((prevPairs) =>
												prevPairs.map((prevPair, idx) =>
													idx === index
														? { ...prevPair, text: e.target.value }
														: prevPair
												)
											)
										}
									/>
									<IconButton
										className="absolute top-1 right-0 m-2 bg-white"
										onClick={() => handleDeletePair(index)}
									>
										<CloseIcon />
									</IconButton>
								</div>
							))}
						</div>
						<div
							{...getRootPropsSupportiveImages()}
							className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center ml-4"
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
					</div>
				</div>
			</div>
		</>
	);
};

export default Section3;
