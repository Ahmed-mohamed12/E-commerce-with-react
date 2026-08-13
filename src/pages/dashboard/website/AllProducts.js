import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Product from "../../../component/website/Product/Product";
// import SkeltonShow from "../../../Healpers/SkeltonShow";
import axios from "axios";
import { basic, pros } from "../../../api";
import SkeltonShow from "../../../Healpers/SkeltonShow";

export default function AllProducts() {
   const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
 const key= window.location.href.split("/").slice(-1)[0]
 
 useEffect(() => {
    async function getcategories() {
      try {
        setLoading(true);
       let url =
  key !== "AllProducts"
    ? `${basic}/${pros}/category/${key}`
    : `${basic}/${pros}`;

        const response = await axios.get(`${url}`);  
         setProducts(response?.data?.products);
       if(response.status ===200){

         setLoading(false);
       }
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(true);
         setTimeout(() => setLoading(false), 3000);
      }
    }
    getcategories();
  }, [key]);
  // ✅

  const productsShow = products?.map((product, index) => (
    <Product 
      key={product.id || index}
      title={product.title}
      description={product.description}
  //      img={`${product.images?product.images[0]:null}`}onError={(e) => {
  //   e.currentTarget.onerror = null; // يمنع تكرار اللوب لو fallback فشل
  //   e.currentTarget.src = "/fallback.png"; // بدّلها باسم صورة عندك
  // }}
   img={product?.images[0] || '/fallback.png'}
  //  img={"https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"}
      price={product.price}
      // discount={product.discount || product.price}
      rating={product.rating}
      lg="3"
      md="4"
      id={product.id}
    />
  ));

  return (
    <div className="bg-secondar py-5">
      <Container>
        <div className="d-flex flex-wrap align-items-stretch justify-content-start row-gap-4">
           {loading ? (
            <SkeltonShow 
              classes="col-lg-3 col-md-4 col-12 col-sm-6" 
              length={8} 
              height={300} 
              width="100%" 
            />
          ) : (
            productsShow
          )}
        </div>
      </Container>
    </div>
  );
}