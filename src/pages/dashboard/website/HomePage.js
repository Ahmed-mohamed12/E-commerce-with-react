// import { Link } from "react-router-dom";

import "./Home.css"
// import { Container } from "react-bootstrap";
// import Product from "../../../component/website/Product/Product";
import Landing from "../../../component/website/landing/Landing";
import LatestSaleProduct from "../../../component/website/Product/LatestSaleProduct";
import ShowTopRated from "../../../component/website/Product/ShowTopRated";
import { Container } from "react-bootstrap";
import ShowLatestProducts from "../../../component/website/Product/ShowLatestProducts";


export default function HomePage(){

    return(<>
    
       <Landing/>
       {/* <Container className=" mb-5">

       <div lassName="d-flex align-items-start justify-content-between flex-wrap mt-5">



       </div>
       </Container> */}
       <LatestSaleProduct/>
       <ShowTopRated/>
       <ShowLatestProducts/>
       </>
        )
}