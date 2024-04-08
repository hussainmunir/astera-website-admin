import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import uploadsvg from "../../../Images/UploadIcons.png";

export function Section1() {
	const [newImages, setNewImages] = useState([]);
	const [imageTextPairs, setImageTextPairs] = useState([]);
	const [subtitle, setSubtitle] = useState("");
	const [title, setTitle] = useState("");

	const handleRegularImageUpload = (event) => {
		const files = event.target.files;
		const updatedNewImages = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();

			reader.onload = () => {
				const imageDataUrl = reader.result;
				updatedNewImages.push({
					id: i,
					dataUrl: imageDataUrl,
					title: "",
					subtitle: "",
				});
				setNewImages((prevImages) => [...prevImages, ...updatedNewImages]);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleSupportiveImageUpload = useCallback((acceptedFiles) => {
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
		onDrop: handleSupportiveImageUpload,
		accept: "image/*",
		multiple: true,
	});

	const [selectedImage, setSelectedImage] = useState(null);

	const onDrop = useCallback((acceptedFiles) => {
		setSelectedImage(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div className="w-full h-screen">
			<div>
				<p className="font-bold ml-8 mt-8 text-lg">Section 2</p>
				<p className="ml-8 mt-1 text-ellipsis text-slate-600">
					Update desired photo and details here
				</p>
				<div className="flex">
					<p className="ml-8 mt-6 font-bold text-lg">Title</p>
					<input
						type="text"
						className="mt-6 w-[14rem] ml-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
						placeholder="WHAT'S NEW"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<input
						type="text"
						className="mt-6 w-[14rem] ml-[1rem] border-2 border-black-500 border-solid p-3 rounded-lg"
						placeholder="COLLECTION 2024"
						value={subtitle}
						onChange={(e) => setSubtitle(e.target.value)}
					/>
				</div>
				<div>
					<div className="flex items-center justify-between">
						<div className="w-1/3">
							<label className="block text-lg ml-[2rem] mt-[2rem] font-semibold mb-1">
								Image{" "}
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
						<div className="w-full mt-[2rem] ml-[8rem] flex justify-start">
							{selectedImage && (
								<img
									src={URL.createObjectURL(selectedImage)}
									alt="Uploaded"
									className="w-auto h-40 object-cover rounded-lg mr-[2rem]"
								/>
							)}
							<div
								className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
								{...getRootProps()}
							>
								<input {...getInputProps()} />
								<img
									src={uploadsvg} // Replace with your upload icon path
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
				<div className="ml-8 mt-8 gap-20">
					<div className="flex items-center justify-between">
						<div className="w-1/3">
							<label className="block text-lg font-semibold mb-1 whitespace-nowrap">
								Supportive Images{" "}
								<HelpOutlineIcon
									style={{
										fontSize: 16,
										color: "gray",
										backgroundColor: "white",
									}}
								/>
							</label>
							<p className="text-xs text-gray-500 mb-2">
								This will be displayed on your Section 3.
							</p>
						</div>
						<div className="w-full flex justify-start">
							<div className="flex gap-4">
								{imageTextPairs.map((pair, index) => (
									<div key={index} className="flex flex-col items-center">
										<img
											src={URL.createObjectURL(pair.image)}
											alt={`Uploaded ${index}`}
											className="w-40 h-40 object-cover"
											style={{ marginBottom: "1rem" }}
										/>
										<input
											type="text"
											className="border-2 border-gray-300 p-2 rounded-lg"
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
											className="mt-2 bg-white border border-black"
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
			</div>
		</div>
	);
}
