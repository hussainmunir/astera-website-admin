import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import uploadsvg from "../../../Images/UploadIcons.png";

const Section5 = () => {
	const [title, setTitle] = useState("");
	const [images, setImages] = useState([]);
	const [saveSuccess, setSaveSuccess] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://backend.asteraporcelain.com/api/v1/homescreen/getAllCollections"
				);
				const section5Data = response.data.data.homePage.section5;
				setTitle(section5Data.title);

				// Update image URLs to use absolute paths
				const formattedImages = section5Data.images.map((image) => ({
					imageUrl: `https://backend.asteraporcelain.com/${image.imageUrl}`,
					imageTitle: image.imageTitle,
					imageSubtitle: image.imageSubtitle,
					_id: image._id,
				}));
				setImages(formattedImages);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleSave = async () => {
		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("image", JSON.stringify(images)); // Convert images array to JSON string

			const response = await axios.post(
				"https://backend.asteraporcelain.com/api/v1/homescreen/addSection5Item",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log("Save successful:", response.data);
			setSaveSuccess(true);

			setTimeout(() => {
				setSaveSuccess(false);
			}, 3000);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	const updateImageTitle = (index, value) => {
		const updatedImages = [...images];
		updatedImages[index].imageTitle = value;
		setImages(updatedImages);
	};

	const updateImageSubtitle = (index, value) => {
		const updatedImages = [...images];
		updatedImages[index].imageSubtitle = value;
		setImages(updatedImages);
	};

	const onDrop = (acceptedFiles) => {
		const updatedImages = acceptedFiles.map((file) => ({
			imageUrl: URL.createObjectURL(file),
			imageTitle: "",
			imageSubtitle: "",
			file: file,
		}));
		setImages([...images, ...updatedImages]);
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: "image/*",
		multiple: true,
	});

	return (
		<>
			<div className="max-w-lg ml-8 mt-8">
				<div className="flex items-center justify-between mb-4">
					<div className="w-full flex flex-col">
						<div className="text-lg font-semibold leading-7 text-gray-900">
							Section 5
						</div>
						<div className="mt-1 text-sm leading-5 text-gray-600">
							Update desired photos and details here.
						</div>
					</div>
					{/* <button
						className="flex absolute ml-[80%] text-white bg-purple-600 rounded-lg px-5 py-2.5"
						onClick={handleSave}
					>
						Save
					</button> */}
				</div>

				<div className="flex items-center">
					<label className="block text-lg font-semibold mb-1 mr-8">Title</label>
					<input
						type="text"
						className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black ml-[32rem]"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className="flex flex-wrap mt-4">
					{images.map((image, index) => (
						<div key={index} className="relative mr-4 mb-4">
							<img
								src={image.imageUrl}
								alt={image.imageTitle}
								className="w-40 h-40 object-cover rounded-lg"
							/>
							<input
								type="text"
								className="absolute top-0 left-0 w-full border border-gray-300 rounded-t-lg px-2 py-1 bg-white bg-opacity-80 backdrop-filter backdrop-blur"
								placeholder="Image Title"
								value={image.imageTitle}
								onChange={(e) => updateImageTitle(index, e.target.value)}
							/>
							<input
								type="text"
								className="absolute bottom-0 left-0 w-full border border-gray-300 rounded-b-lg px-2 py-1 bg-white bg-opacity-80 backdrop-filter backdrop-blur"
								placeholder="Image Subtitle"
								value={image.imageSubtitle}
								onChange={(e) => updateImageSubtitle(index, e.target.value)}
							/>
						</div>
					))}
				</div>

				<div className="flex items-center mt-4">
					<div className="w-1/3">
						<label className="block text-lg font-semibold mb-1">
							Add Image
						</label>
						<p className="text-xs text-gray-500 mb-2 whitespace-nowrap">
							Upload new image here.
						</p>
					</div>

					<div className="w-full mt-2 flex justify-start ml-[24rem]">
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
							<p className="text-sm text-gray-600 mb-2 whitespace-nowrap">
								Click to upload or drag and drop
							</p>
							<p className="text-sm text-gray-600">
								SVG, PNG, JPG, or GIF (max. 800x400px)
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="border-b mt-[1rem]"></div>

			{saveSuccess && (
				<div className="text-green-600 mt-4 ml-8">Save successful!</div>
			)}
		</>
	);
};

export default Section5;
