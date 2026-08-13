import axios from "axios";
import {React, useEffect, useState } from "react";
import { basic, pros, topRated } from "../../../api";

// import { Container } from "react-bootstrap";


// import Skeleton from "react-loading-skeleton";
// import SkeltonShow from "../../../Healpers/SkeltonShow";
import TopRated from "./TopRated";
import SkeltonShow from "../../../Healpers/SkeltonShow";
import Product from "./Product";
// import {  topProducts } from "./ProductsData";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
                setLoading(true)

          const response = await axios.get(`${basic}/${pros}`);
          
            const filteredResponse=response.data.products.filter((e)=>{ return e.rating=5})
        
         setProducts(filteredResponse.slice(-6));
        setLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(true)
      }
    }
    getProducts();
  }, []);
 
  const productsShow =products?.map((product,index) => (
    <Product key={index} 
      title={product.title}
      description={product.description}
      img={`${product.images[0]}`}onError={(e) => {
    e.currentTarget.onerror = null; // يمنع تكرار اللوب لو fallback فشل
    e.currentTarget.src = "/fallback.png"; // بدّلها باسم صورة عندك
  }}
      price={product.price}
      discount={product.discountPercentage}
      rating={product.rating}
      id={product.id}
      lg="4"
      md="4"
    />
  ));
  // console.log(productsShow);
  // ----------------------------
  

  // ----------------------------
  return (
    <div className="p-2">
    <div className="d-flex justify-content-center">

        <div className="col-md-12 col-12 col-lg-8  " style={{border:"blue 3px solid"}}>
        

        <h1 className="m-0 bg-primary text-white text-center p-3">Top Rated</h1>
        
        <div className="d-flex justify-content-between align-items-center flex-wrap lex-column p-1">
          {loading ? 
            
                     <SkeltonShow 
                                   classes="col-lg-6 col-md-6 col-12" 
                                   length={6} 
                                   height={300} 
                                   width="100%" 
                                 />
                     : 
                    

                    productsShow
                    
                    }  
        </div>
        </div>
        </div>
      
    </div>
  );
}
