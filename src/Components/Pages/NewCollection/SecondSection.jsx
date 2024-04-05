import React, { useState } from "react";

export function SecondSection(props) {
  const [images, setImages] = useState([]);
  

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const updatedImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result;
        updatedImages.push(imageDataUrl);
        setImages(updatedImages);
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
            placeholder='WHAT"S NEW'
            type="text"
          ></input>
          <input
            className="mt-6 ml-[2rem] border-2 border-black-500 border-solid p-3 rounded-lg"
            placeholder="COLLECTION 2024"
            type="text"
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

        <div className="flex flex-wrap mt-4 mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-[220px] h-[170px]  border-2 border-neutral rounded-lg ml-[24.5rem] -mt-[3.5rem] p-2 absolute"
            >
              <img
                src={image}
                className="max-w-full max-h-full object-contain"
                alt={`Image ${index}`}
              />
            </div>
          ))}
        </div>
        <div
          className="w-[350px] h-[170px] border-2 border-gray-300 border-solid rounded-lg p-6 ml-[40rem] absolute -mt-[3.5rem]"
          id="dropzone"
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-50"
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
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageUpload}
                  multiple
                />
              </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, SVG or GIF (max.800 * 400px)
            </p>
          </div>
        </div>
        <div>
          <p className="ml-8 mt-[10rem] font-bold text-lg">Catalog Image</p>
          <img
            className="ml-[10rem] -mt-5 w-4 h-4 absolute"
            src={"src/assets/questiionmark.png"}
            alt=""
          />
        </div>
      </div>
    </div>
    
  );
}