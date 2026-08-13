
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Dropdown, Form, Modal } from "react-bootstrap";

import Cookie from "cookie-universal";


import "./NavBar.css";
import axios from "axios";
import { CloseButton } from "react-bootstrap";
import { MobMenue } from "../../context/MopMenueContext";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";
import DropDownLogOut from "./DropDownLogOut";
import { CategoriesList } from "./CategoriesList";

export default function MobMinueLinks (){
    const [categories, setCategories] = useState([]);
    const [showmopmen, setShowmopmen] = useState(true);
      const [name, setName] = useState("");
    
    const MobMenueCon = useContext(MobMenue);
    // ==================
      const cookie = Cookie();
      const token = cookie.get("e-commerce");
      const screenwidth = useContext(ScreenSizeContext);

    // ==================
    function closeMopmen(){
        MobMenueCon.setIsOpen(prev=>!prev)
        
    }

    useEffect(() => {
       // let t=CategoriesList
       setCategories(CategoriesList.slice(7, 15))
       
     }, []);
    const categoriesShow = categories.map((category, index) => (
        <Link onClick={closeMopmen} to={`/${category}`} key={index} className="m-0 text-black category-title">
          <div className="cat-names">
          {category}

          </div>
         
        </Link>
      ));
            let style={left:MobMenueCon.isOpen? 0 : -100}
       
            
return(
         <div className={`mob-minue `} style={{
                left: MobMenueCon.isOpen ?0:"-100%" }}>
                    <div className="menue-head">
                {token&&screenwidth.screenWidth <= 940 && (
                // <div lassName="d-flex justify-content-end col-6 g-success">
                //   <Dropdown>
                //     <Dropdown.Toggle variant="primary" id="dropdown-basic">
                //       {name || "User"}
                //     </Dropdown.Toggle>
                //     <Dropdown.Menu>
                //       <Dropdown.Item onClick={handelLogOut}>Logout</Dropdown.Item>
                //     </Dropdown.Menu>
                //   </Dropdown>
                // </div>
                <DropDownLogOut/>
              )}
              <div className="CloseButton">
                <CloseButton  onClick={closeMopmen} aria-label="إغلاق" />
                </div>
                    </div>
          {categoriesShow}
          {categories.length > 0 && (
                      <div className="cat-names" onClick={closeMopmen}>
                        <Link className="text-black category-title" to="/AllProducts">
                        Show All
                      </Link>
                        </div>
                    )}

        </div>

)
}
    