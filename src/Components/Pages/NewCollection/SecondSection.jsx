import React, { useState } from "react";

export function SecondSection({ saveImage }) {
  const [previousImages, setPreviousImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const updatedNewImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result;
        updatedNewImages.push({ id: i, dataUrl: imageDataUrl });
        setNewImages((prevImages) => [...prevImages, ...updatedNewImages]);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div>
        <p className="font-bold ml-8 mt-8 text-lg">Section 2</p>
        <p className="ml-8 mt-1 text-ellipsis text-slate-600">
          Update desired photo and details here
        </p>
        <div className="flex">
          <p className="ml-8 mt-6 font-bold text-lg"> Title </p>
          <input
            className="mt-6 ml-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
            placeholder="WHAT'S NEW"
          ></input>
          <input
            className="mt-6 ml-[2rem] border-2 border-black-500 border-solid p-3 rounded-lg"
            placeholder="COLLECTION 2024"
          ></input>
        </div>
        <div className="flex">
          <p className="ml-8 mt-6 font-bold text-lg">Image</p>
          <img
            className="mt-8 ml-2 w-4 h-4"
            src={"src/assets/questiionmark.png"}
            alt=""
          />
        </div>
        <div className="ml-8 mt-1 text-ellipsis text-slate-600">
          This will be displayed on your Section 3
        </div>
        <div className="w-[350px] h-[170px] border-2 border-gray-300 border-solid rounded-lg p-6 ml-[24rem] relative">
          {/* File input positioned absolutely to cover the entire area */}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
            onChange={handleImageUpload}
            multiple
          />
          <div className="text-center">
            <img
              className="mx-auto h-12 w-12"
              src="https://www.svgrepo.com/show/357902/image-upload.svg"
              alt=""
            />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label htmlFor="file-upload" className="relative cursor-pointer">
                <span>Drag and drop</span>
                <span className="text-indigo-600"> or browse</span>
                <span>to upload</span>
              </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, SVG or GIF (max.800 * 400px)
            </p>
          </div>
        </div>

        <div className="ml-8 mt-4">
          <p className="font-bold text-lg">New Images</p>
          {/* Display newly uploaded images */}
          <div className="flex flex-wrap mt-4">
            {newImages.map((image) => (
              <div
                key={image.id}
                className="w-[220px] h-[170px] border-2 border-neutral rounded-lg p-2 mr-4 mb-4"
              >
                <img
                  src={image.dataUrl}
                  className="w-full h-full object-contain"
                  alt={`Image ${image.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Display temporarily uploaded image */}
      {uploadedImage && (
        <div className="ml-8 mt-4">
          <p className="font-bold text-lg">Temporary Uploaded Image</p>
          <div className="w-[220px] h-[170px] border-2 border-neutral rounded-lg p-2 mt-4">
            <img
              src={uploadedImage}
              alt="Uploaded Image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
