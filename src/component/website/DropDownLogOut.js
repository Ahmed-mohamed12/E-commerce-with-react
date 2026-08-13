import "./NavBar.css";
import axios from "axios";
import { CloseButton } from "react-bootstrap";
import { MobMenue } from "../../context/MopMenueContext";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Dropdown, Form, Modal } from "react-bootstrap";

import Cookie from "cookie-universal";

export default function DropDownLogOut(){
        const navigate = useNavigate();
    
        const [categories, setCategories] = useState([]);
        const [showmopmen, setShowmopmen] = useState(true);
        const [name, setName] = useState("");
    
        const MobMenueCon = useContext(MobMenue);
        // ============GET TOKEN=======================
     const cookie =Cookie();
      // const token = cookie.get("e-commerce");
      let token = cookie.get("e-commerce");
// ================get current user======================
   useEffect(() => {
    async function fetchUser() {
      try {
      
        
        const response = await axios.get(`https://dummyjson.com/auth/me`, {
        // const response = await axios.get(`http://127.0.0.1:8000/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`
            
          },
        });
        
        
       await setName(response?.data.firstName);
       console.log(response?.data.firstName);
      } catch (error) {
        navigate("/login", { replace: true });
        console.log(error);
      }
    }

    fetchUser();
    // eslint-disable-next-line
  }, [token]);
  // ---------------------//get current user//------------------------


    // ==================
      
      const screenwidth = useContext(ScreenSizeContext);
    const handelLogOut = useCallback(() => {
          function clearAllCookies() {
  // جيب كل الكوكيز
  let allCookies = cookie.getAll();
  
  // امسح كل واحد
  Object.keys(allCookies).forEach(key => {
    cookie.remove(key);
  });
}

clearAllCookies();
          window.location.pathname = "/login";
        }, [cookie]);
    const goDashboard = useCallback(() => {
          window.location.pathname = "/dashboard";
        }, []);
        
    return<>
    
    <div lassName="d-flex justify-content-end col-6 g-success">
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      {name || "User"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handelLogOut}>Logout</Dropdown.Item>
                      <Dropdown.Item onClick={goDashboard}>DashBoard</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>


                  
   </div>
    
    </>
}