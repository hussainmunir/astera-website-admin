import React, { useEffect, useState } from "react";
import axios from "axios";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section1 from "./Section1";
import { baseUrl } from "../../../api/base_urls";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";


export function Product() {
  const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);


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
        `${baseUrl}productsScreen/addProductPage`,
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

  const removeProduct = async (itemId) => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("productId", itemId);

			for (let pair of formData.entries()) {
				console.log(pair[0] + ", " + pair[1]);
			  }

			const response = await axios.post(
				`${baseUrl}productsScreen/removeProductPage`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log("Delete successful:", response.data);
			fetchProducts();

			setLoading(false);

			// Optionally add logic to display a success message or perform other actions
		} catch (error) {
			setLoading(false);
			console.error("Error deleteing slide:", error);
			// Handle error scenarios, e.g., display an error message to the user
		}
	};
  

  return (
    <div className="w-[100%]">
      <div className="ml-[2rem] mt-[2rem]">
        <p className="w-full text-lg font-bold leading-7 text-gray-900">
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
          <div key={index} className="ml-[2rem] mt-[2rem] border border-solid border-black">
            <button
              className="border-1 mt-5 px-5 border-solid border-blue text-white bg-blue-700 p-2 rounded-xl ml-[80%]"
              onClick={ () => removeProduct(product._id)}
            >
              {loading ? (
								<CircularProgress size={24} color="inherit" />
							) : (
								"Delete Product Page"
							)}
              
            </button>
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
