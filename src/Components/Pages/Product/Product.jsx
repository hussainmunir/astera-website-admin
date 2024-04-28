import React, { useEffect, useState } from "react";
import axios from "axios";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section1 from "./Section1";
import { baseUrl } from "../../../api/base_urls";

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

  return (
    <div className="w-[100%]">
      <div className="ml-[2rem] mt-[2rem]">
        <p className="w-full text-lg font-bold leading-7 text-gray-900 max-md:max-w-full">
          Title for Collection Page
        </p>
        <p className="mt-1 text-ellipsis text-slate-600 max-md:max-w-full">
          Lorem ipsum dolor sit amet consectetur. Est lectus sit at bibendum
          elementum accumsan dignissim tempus in. Pretium nibh venenatis urna
          sed.
        </p>
      </div>
      <div>
        {products.map((product, index) => (
          <div key={index}>
            <Section1 id={product._id} data1={product.section1} />
            <Section2 id={product._id} data2={product.section2} />
            <Section3 id={product._id} data3={product.section3} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
