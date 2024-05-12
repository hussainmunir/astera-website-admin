import React, { useEffect, useState } from "react";
import axios from "axios";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section1 from "./Section1";
import { baseUrl } from "../../../api/base_urls";
import { Button } from "@mui/material";

export function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}productsScreen/getProductsPage`
        );
        console.log("response", response);
        if (
          response.data &&
          response.data.data &&
          response.data.data.productPages &&
          response.data.data.productPages.length > 0
        ) {
          setProducts(response.data.data.productPages);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}productsScreen/getProductsPage`
      );
      console.log("response", response);
      if (
        response.data &&
        response.data.data &&
        response.data.data.productPages &&
        response.data.data.productPages.length > 0
      ) {
        setProducts(response.data.data.productPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const addProductsPage = async () => {
    try {
      const response = await axios.post(
        'https://backend.asteraporcelain.com/api/v1/productsScreen/addProductPage',
        {
          section1: {
            title: 'Product Page Title',
            subTitle: 'Product Page Subtitle',
            description: 'Product Page Description',
            backgroundImageUrl: 'https://example.com/background-image.jpg',
          },
          section2: [
            {
              imageUrl: 'https://example.com/image1.jpg',
            },
          ],
          section3: {
            title: 'Section 3 Title',
            products: [
              {
                imageUrl: 'https://example.com/product1.jpg',
                name: 'Product 1',
                measurement: 'Measurement 1',
                serialNo: 'Serial No 1',
              },
            ],
          },
        }
      );

      console.log(response.data); // Handle the response as needed
      fetchProducts();
      alert(response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="w-[100%]">
      <div className="ml-[2rem] mt-[2rem]">
        <p className="w-full text-lg font-bold leading-7 text-gray-900 max-md:max-w-full">
          Collection Page
        </p>
        {/* <p className="mt-1 text-ellipsis text-slate-600 max-md:max-w-full">
          Lorem ipsum dolor sit amet consectetur. Est lectus sit at bibendum
          elementum accumsan dignissim tempus in. Pretium nibh venenatis urna
          sed.
        </p> */}
        <button
              className="border-1 mt-5 px-5 border-solid border-blue text-white bg-blue-700 p-2 rounded-xl"
              onClick={addProductsPage}
            >
              Add New Product Page
            </button>
      </div>
      <div>
        {products.map((product, index) => (
          <div key={index}>
            <Section1 id={product._id} data1={product.section1}  />
            <Section2 id={product._id} data2={product.section2} fetchProducts={fetchProducts} />
            <Section3 id={product._id} data3={product.section3} fetchProducts={fetchProducts} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
