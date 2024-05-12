import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import uploadsvg from "../../../Images/UploadIcons.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import LazyLoad from "react-lazyload";
import { baseUrlImage } from "../../../api/base_urls";

export function Section3({ id, data3, fetchProducts }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [title, setTitle] = useState(""); // Define the title state variable


  useEffect(() => {
    if (data3) {
      if (data3.products && data3.products.length > 0) {
        setProducts(data3.products);
      }
      if (data3.title) {
        setTitle(data3.title);
      }
    }
  }, [data3]);



  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
    // setSelectedImage((prevImages) => [...prevImages, ...acceptedFiles]);
  };
  const onDropProductImages = (acceptedFiles) => {
    const newProducts = acceptedFiles.map(file => ({
      imageFiles: file,
      name: "",
      measurement: "",
      serialNo: "",
    }));
  
    setSelectedProducts(prevProducts => [...prevProducts, ...newProducts]);
  };

  const updateProductName = (name, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].name = name;
    setProducts(updatedProducts);
  };

  const updateProductMeasurement = (measurement, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].measurement = measurement;
    setProducts(updatedProducts);
  };

  const updateProductSerialNo = (serialNo, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].serialNo = serialNo;
    setProducts(updatedProducts);
  };

  const handleDeletePair = () => {
    setSelectedImage([]);
    setName("");
    setMeasurement("");
    setSerialNo("");
  };

  // const handleSave = async () => {
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("productId", id);
  //   formData.append("name", name);
  //   formData.append("measurement", measurement);
  //   formData.append("serialNo", serialNo);
  //   formData.append("title", title);
  //   if (selectedImage) {
  //     formData.append("imageFile", selectedImage);
  //   }

  //   try {
  //     const response = await axios.post(
  //       "https://backend.asteraporcelain.com/api/v1/productsScreen/addProductToSection3",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log("Save successful:", response.data);
  //     setRequestMessage(response.data.message)
  //     setTimeout(() => {
  //       setRequestMessage("");
  //     }, 3000);
  //     fetchProducts();
  //     handleDeletePair();
  //     setSaveSuccess(true);
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   } finally {
  //     setLoading(false);
  //     setTimeout(() => {
  //       setSaveSuccess(false);
  //     }, 3000);
  //   }
  // };


  const handleSave = async () => {
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("productId", id);
      formData.append("products", selectedProducts);
  
      selectedProducts.forEach((product, index) => {
        // formData.append(`products[${index}][name]`, product.name);
        // formData.append(`products[${index}][measurement]`, product.measurement);
        // formData.append(`products[${index}][serialNo]`, product.serialNo);
        // formData.append(`products[${index}][imageFiles]`, product.imageFiles);
        formData.append(`imageFiles`, product.imageFiles);
        console.log(product.name)
      });

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
  
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/productsScreen/addProductsToSection3WithImages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Save successful:", response.data);
      setRequestMessage(response.data.message)
      setTimeout(() => {
        setRequestMessage("");
      }, 3000);
      fetchProducts();
      setSelectedProducts([]);
      // handleDeletePair();
      setSaveSuccess(true);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };
  

  const handleUpdate = async (index) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("productId", products[index]._id);
    formData.append("productPageId", id);
    formData.append("name", products[index].name);
    formData.append("measurement", products[index].measurement);
    formData.append("serialNo", products[index].serialNo);
    if (selectedImage) {
      formData.append("imageUrl", selectedImage);
    }

    try {
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/productsScreen/updateProductInSection3",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      setRequestMessage(response.data.message)
      setTimeout(() => {
        setRequestMessage("");
      }, 3000);
      fetchProducts();
      handleDeletePair();
      setSaveSuccess(true);

    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  const handleDeleteImageApiUi = (indexToRemove) => {
    setProducts((prevImages) =>
      products.filter((image, index) => index !== indexToRemove)
    );
  };

  const removeProduct = (indexToRemove) => {
    setSelectedProducts(prevProducts => {
      return prevProducts.filter((product, index) => index !== indexToRemove);
    });
  };

  const updateProductObjectName = (newName, indexToUpdate) => {
    setSelectedProducts(prevProducts => {
      return prevProducts.map((product, index) => {
        if (index === indexToUpdate) {
          return { ...product, name: newName };
        }
        return product;
      });
    });
    console.log(selectedProducts[indexToUpdate])
  };
  
  const updateProductObjectMeasurement = (newMeasurement, indexToUpdate) => {
    setSelectedProducts(prevProducts => {
      return prevProducts.map((product, index) => {
        if (index === indexToUpdate) {
          return { ...product, measurement: newMeasurement };
        }
        return product;
      });
    });
  };
  
  const updateProductObjectSerialNo = (newSerialNo, indexToUpdate) => {
    setSelectedProducts(prevProducts => {
      return prevProducts.map((product, index) => {
        if (index === indexToUpdate) {
          return { ...product, serialNo: newSerialNo };
        }
        return product;
      });
    });
  };
  
  

  const handleDeleteImageApi = async (index) => {
    try {
      const productId = products[index]._id;
      const productPagesId = id;
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/productsScreen/deleteProductFromSection3",
        { productPagesId, productId }
      );
      console.log("Image deleted response:",productId,productPagesId, response.data);
      setRequestMessage(response.data.message)
      setTimeout(() => {
        setRequestMessage("");
      }, 3000);
      fetchProducts();
      handleDeleteImageApiUi(index);

    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleUpdateTitle = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend.asteraporcelain.com/api/v1/productsScreen/updateSection3Title",
        {
          productId: id,
          title: title,
        }
      );
      console.log("Update successful:", response.data);
      fetchProducts();

      setRequestMessage(response.data.message)
      setTimeout(() => {
        setRequestMessage("");
      }, 3000);
      setSaveSuccess(true);
    } catch (error) {
      console.error("Error updating title:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  const handleCancel = () => {
    if (data3) {
      if (data3.products && data3.products.length > 0) {
        setName("");
        setMeasurement("");
        setSerialNo("");
      }
      setSelectedImage([]);
      setResetMessage("Fields reset successfully");
      setTimeout(() => {
        setResetMessage("");
      }, 3000);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const { getRootProps: getRootPropsProducts, getInputProps: getInputPropsProducts } = useDropzone({ onDrop: onDropProductImages });

  return (
    <div className="h-full">
      <p className="text-center">
        {requestMessage}
        </p>
      <div className="w-full flex flex-col ml-[2rem]">
        <p className="w-full text-gray-600 text-lg max-md:max-w-full">
          <b>Section 3</b>
        </p>
        <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Update desired photo and details here.
        </div>
      </div>
      <div className="flex ml-[80%] space-x-5 -mt-8">
        <button
          className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
          onClick={handleCancel}
        >
          Cancel
        </button>
        {resetMessage && (
          <div className="text-red-600 mt-2 absolute top-[25rem] ml-[85%]">
            {resetMessage}
          </div>
        )}
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <button
            className="border-1 border-solid border-blue w-[10rem] text-white bg-blue-700 p-2 rounded-xl"
            onClick={handleSave}
          >
            ADD Products
          </button>
        )}
        {saveSuccess && (
          <div className="text-green-600 mt-2 absolute top-[25rem] ml-[85%]">
            Save successful!
          </div>
        )}
      </div>
      <div className="flex">
        <label className="block text-lg font-semibold mt-[2rem] ml-[2rem] whitespace-nowrap">
          Section Title
        </label>
        <input
          className="mt-8 w-[25rem] border-2 border-black-500 border-solid p-3 ml-[16rem] rounded-lg"
          placeholder="TITLE"
          type="text"
          value={title} // Assuming title is stored in the state
          onChange={(e) => setTitle(e.target.value)}
        />
       
          <button
            className="border-solid mt-10 border-2 p-2 ml-[3rem]  h-[3rem] w-[5rem] border-black text-blue bg-white rounded-xl"
            onClick={handleUpdateTitle} // Call the function on button click
          >
            Update
          </button>
        {saveSuccess && (
          <div className="text-green-600 mt-2 absolute top-[25rem] ml-[85%]">
            Save successful!
          </div>
        )}
      </div>
      <div className="flex flex-row">
        <label className="block text-lg ml-[2rem] mt-[3rem] w-[15rem] font-semibold mb-1">
          Product Images{" "}
          <HelpOutlineIcon
            style={{
              fontSize: 16,
              color: "gray",
              backgroundColor: "white",
            }}
          />
        </label>{" "}
        <div className=" flex flex-row">
          <div className="flex mt-[4rem] ml-[7rem] gap-4">
            <div className="flex items-start">
              <div
                {...getRootPropsProducts()}
                className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center"
              >
                <input {...getInputPropsProducts()} />
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
            {/* {selectedImage && (
              <div className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded"
                  className="w-auto h-40 object-cover rounded-lg mr-2"
                />
                <IconButton
                  className="mt-2 bg-white border border-black"
                  onClick={() => handleDeletePair()}
                >
                  <CloseIcon />
                </IconButton>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    className="mt-8 w-[25rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                    placeholder="NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="mt-8 w-[25rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                    placeholder="MEASUREMENT"
                    value={measurement}
                    onChange={(e) => setMeasurement(e.target.value)}
                  />
                  <input
                    type="text"
                    className="mt-8 w-[25rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                    placeholder="SERIAL NO"
                    value={serialNo}
                    onChange={(e) => setSerialNo(e.target.value)}
                  />
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>

      
      <div className="overflow-x-auto mx-14 mt-10">
      {selectedProducts?.length > 0 && (
          <p>
          Products to Upload
        </p>
        )}
        <div
          className="flex gap-4 h-full mb-2"
          style={{ width: `calc(315px * ${selectedProducts?.length})` }}
        >
          {selectedProducts?.map((product, index) => (
            <div key={index} className="flex flex-col items-center">
              <label>
                <div className="relative">
                  <LazyLoad>
                    <img
                      src={URL.createObjectURL(product.imageFiles)}
                      alt="Uploaded"
                      loading="lazy"
                      className="w-[300px] h-[150px] object-fit cursor-pointer"
                    />
                  </LazyLoad>
                </div>
              </label>
              <IconButton
                className="absolute top-2  bg-white"
                onClick={() => removeProduct(index)}
              >
                <CloseIcon />
              </IconButton>
              
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  className="mt-8 w-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                  placeholder="NAME"
                  value={product.name}
                  onChange={(e) => updateProductObjectName(e.target.value, index)}
                />
                <input
                  type="text"
                  className="mt-8 w-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                  placeholder="MEASUREMENT"
                  value={product.measurement}
                  onChange={(e) =>
                    updateProductObjectMeasurement(e.target.value, index)
                  }
                />
                <input
                  type="text"
                  className="mt-8 w-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                  placeholder="SERIAL NO"
                  value={product.serialNo}
                  onChange={(e) => updateProductObjectSerialNo(e.target.value, index)}
                />
              </div>
            </div>
          ))}
        </div>

        
      </div>

      <div className="overflow-x-auto mx-14 mt-10">
      {products?.length > 0 && (
          <p>
          Uploaded Products
        </p>
        )}
        <div
          className="flex gap-4 h-full mb-2"
          style={{ width: `calc(315px * ${products?.length})` }}
        >
          {products?.map((product, index) => (
            <div key={index} className="flex flex-col items-center">
              <label>
                <input {...getInputProps()} multiple={false} />
                <div className="relative">
                  <LazyLoad>
                    <img
                      src={`${baseUrlImage}${product.imageUrl}`}
                      alt="Uploaded"
                      loading="lazy"
                      className="w-[300px] h-[150px] object-fit cursor-pointer"
                    />
                  </LazyLoad>
                </div>
              </label>
              <IconButton
                className="absolute top-2  bg-white"
                onClick={() => handleDeleteImageApi(index)}
              >
                <CloseIcon />
              </IconButton>
              <button
                className="border-solid mt-5 border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl"
                onClick={() => handleUpdate(index)}
              >
                Update
              </button>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  className="mt-8 w-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                  placeholder="NAME"
                  value={product.name}
                  onChange={(e) => updateProductName(e.target.value, index)}
                />
                <input
                  type="text"
                  className="mt-8 w-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                  placeholder="MEASUREMENT"
                  value={product.measurement}
                  onChange={(e) =>
                    updateProductMeasurement(e.target.value, index)
                  }
                />
                <input
                  type="text"
                  className="mt-8 w-[20rem] border-2 border-black-500 border-solid p-3 rounded-lg"
                  placeholder="SERIAL NO"
                  value={product.serialNo}
                  onChange={(e) => updateProductSerialNo(e.target.value, index)}
                />
              </div>
            </div>
          ))}
        </div>

        
      </div>
      <div className="border border-l border-gray m-[2rem] "></div>
    </div>
  );
}

export default Section3;
