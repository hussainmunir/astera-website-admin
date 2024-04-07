import React, { useState } from "react";

export function SecondSection() {
  const [newImages, setNewImages] = useState([]);
  const [subtitle, setSubtitle] = useState('');
  const [title, setTitle] = useState('');

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const updatedNewImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result;
        updatedNewImages.push({ id: i, dataUrl: imageDataUrl, title: '', subtitle: '' });
        setNewImages((prevImages) => [...prevImages, ...updatedNewImages]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (event, id) => {
    const updatedImages = newImages.map(image =>
      image.id === id ? { ...image, title: event.target.value } : image
    );
    setNewImages(updatedImages);
  };

  const handleSubtitleChange = (event, id) => {
    const updatedImages = newImages.map(image =>
      image.id === id ? { ...image, subtitle: event.target.value } : image
    );
    setNewImages(updatedImages);
  };

  return (
    <div className="w-full h-screen">
      <div>
        <p className="font-bold ml-8 mt-8 text-lg">Section 2</p>
        <p className="ml-8 mt-1 text-ellipsis text-slate-600">
          Update desired photo and details here
        </p>
        <div className="flex">
          <p className="ml-8 mt-6 font-bold text-lg"> Title </p>
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
        <div className="w-[400px] h-[180px] border-2 border-gray-300 border-solid rounded-lg p-6 ml-[24.5rem] relative -mt-[2rem]">
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

        <div className="flex ml-8 mt-8 gap-20">
          <p className="font-bold text-lg">Catalogs Images</p>
          
          <div className="flex flex-wrap ml-[9rem] w-[30rem] gap-8">
            {newImages.map((image) => (
              <div
                key={image.id}
                className="w-[220px] h-[170px] border-2 border-neutral rounded-lg p-2"
                style={{ marginRight: '', marginBottom: '100px' }} 
              >
                <img
                  src={image.dataUrl}
                  className="w-full h-full object-contain"
                  alt={`Image ${image.id} `}
                />
                <input
                  className="border-2 border-black-500 border-solid p-3 rounded-lg mt-4 -ml-2 w-[13.5rem]"
                  type="text"
                  placeholder="WHAT'S NEW"
                  value={image.title}
                  onChange={(e) => handleTitleChange(e, image.id)}
                />
                <input
                  className="border-2 border-black-500 border-solid p-3 rounded-lg mt-2 -ml-2 w-[13.5rem]"
                  type="text"
                  placeholder="NEW COLLECTION 2024"
                  value={image.subtitle}
                  onChange={(e) => handleSubtitleChange(e, image.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
