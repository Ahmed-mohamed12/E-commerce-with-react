import React from "react";
import { RiStarSLine, RiStarSFill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import StringSlice from "../../../Healpers/StringSlice";
import { Link } from "react-router-dom";

export default function Product(props) {
  const roundStars=Math.round(props.rating)
  const stars=Math.min(roundStars,5)
  const showGoldStars=Array.from({length:stars}).map((_,index)=>(<RiStarSFill color="gold" key={index} fontSize={"30"} />));
  const showEmptyStars=Array.from({length:5 - stars}).map((_,index)=>(<RiStarSLine key={index} fontSize={"30"} />));
  return (
    <>
      
<Link
          to={`/product/${props.id}`}
          tyle={{ position: "relative",Highlight:"300px" }}
          className={`col-12 col-sm-6 col-lg-${props.lg} col-md-${props.md}` }>
      
          <div className="border rounded -3 h-100 d-flex flex-column " >

          
          {/* <div className="d-flex align-items-center justify-content-center " style={{overflow:"hidden",maxHeight:"300px",position: "relative",}}>  */}
                 <img 
          src={props.img} 
          alt={"error img"}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            console.log('Image failed to load:', props.img); // 🔍 سجل الخطأ
            e.target.src = '/fallback.png';
          }}

        />
        {/* </div> */}
          <div
            style={{ position: "relative" }}
            className="m-1 col-12  p-3 h-100 d-flex  justify-content-start flex-column"
          >
            <div style={{ position: "relative" }}>
              <p className="text-truncate" style={{ color: "gray" }}>
                
                {props.title}
              </p>
              <p className="text-truncate" style={{ color: "gray" }}>
                
                {props.description}
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-between p-2 lex-wrap" >
              <div>
                {showGoldStars}
                {showEmptyStars}
                <div className="d-flex align-items-center gap-1">
                  <h5 className="m-0 text-primary">{Math.floor(props.price)}$</h5>
                  <h6 className="m-0 old-price">
                    {Math.floor(props.price+3)}$
                  </h6>
                </div>
              </div>
              <div className="border p-2 rounded">
                <FiShoppingCart fontSize={"30px"} style={{ outline: "none" }} />
              </div>
            </div>
          </div>
          </div>
      {/* </div> */}
        </Link>
      

      
    </>
  );
}

      // <Link to={`/product/${props.id}`} className={`col-12 col-sm-6 col-lg-${props.lg} col-md-${props.md} ` }>
    

      
      //   <div className="m-1 border rounded p-3 h-100">
      //     <div className="border-bottom pb-1" style={{height:"80%"}}>
      //       <p style={{ color: "gray",fontSize: "22px"}}> {StringSlice(props.title,20)}</p>
      //       {/* <p>{StringSlice(props.description,15)}</p> */}
      //       <div className="px-5 py-4 position-relative" style={{height:"100%",display:"flex"}}>
      //         {props.sale &&(<p
      //           className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
      //           style={{ width: "50px", height: "50px", lineHeight: "50px" }}
      //         >
      //       sale
      //         </p>)}
      //         <div className="d-flex align-items-center justify-content-center" style={{overflow:"hidden",height: "250px",maxHeight:"300px",position: "relative",}}> 
      //           <img
      //     src={props.img}
      //     alt=".."
      //     className="img-fluid"
      //     style={{display:"block",maxHeight:"100%",maxWidth:"100%",zIndex:"-1"}}
         
      //   />
      //   </div>
      //         {/* <img
      //           src={props.img}
      //           alt=".."
      //           className="img-fluid"
               
      //         /> */}
      //       </div>
      //     </div>
      //     <div className="d-flex align-items-center justify-content-between mt-2">
      //       <div>
      //       {showGoldStars}
      //       {showEmptyStars}
              
              
      //         <div className="d-flex align-items-center gap-3">
                
      //           <h5 className="m-0 text-primary">{props.price}$</h5>
      //           <h6
      //             className="m-0 old-price"
      //             style={{ color: "gray"}}
      //           >
      //             {props.discount}$
      //           </h6>
      //         </div>
      //       </div>
      //       <div className="border p-2 rounded d-flex">
            
      //         <FiShoppingCart fontSize={"30px"} style={{ outline: "none" }} />
              
      //       </div>
      //     </div>
        
      //   </div>
        
      // </Link>