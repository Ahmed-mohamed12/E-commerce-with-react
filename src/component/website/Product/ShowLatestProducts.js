import React, { useEffect, useState } from "react";
import { basic, pros } from "../../../api";
import axios from "axios";
import SkeltonShow from "../../../Healpers/SkeltonShow";
import Product from "./Product";

export default function ShowLatestProducts(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${basic}/${pros}`);
        // const response = await axios.get(`${basic}/${latest}`);
        setProducts(response.data.products);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(true);
      }
    }
    getProducts();
  }, []);
 
 
  const productsShow = products?.map((product, index) => (
    <Product
      key={index}
      title={product.title}
      description={product.description}
     img={`${product.images?product.images[0]:null}`}onError={(e) => {
    e.currentTarget.onerror = null; // يمنع تكرار اللوب لو fallback فشل
    e.currentTarget.src = "/fallback.png"; // بدّلها باسم صورة عندك
  }}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      lg="3"
      md="4"
      id={product.id}
    />
  ));
  // ----------------------------

  // ----------------------------
  return (
    <>
    <div className="d-flex justify-content-center" style={{padding:"0 10px"}}>

      <div className=" col-md-12 col-lg-10 col-12 "  >
              
      
              <h1 className="m-0 bg-primary text-white p-3">Latest Products</h1>
              
              <div className="d-flex align-items-center flex-wrap p-20">
                {loading ?
                 <SkeltonShow  classes="col-lg-3 col-md-4 col-12"
                  length="8" height={300} width="100%" />
                  : productsShow
                          
                          }  
              </div>
              </div>
              </div>
    </>
  );
}
