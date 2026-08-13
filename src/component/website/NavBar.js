import React, { useEffect, useState, useContext, useCallback } from "react";
import { Button, Container, Dropdown, Form, Modal } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { cats, LogOutUrl, pros, userUrl } from "../../api";
import axios from "axios";
import "./NavBar.css";
import StringSlice from "../../Healpers/StringSlice";
import SkeltonShow from "../../Healpers/SkeltonShow";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";
import { Cart } from "../../context/CartChangerContext";
import { IoIosCloseCircle, IoIosMenu } from "react-icons/io";
import PlusMinus from "../../pages/dashboard/website/PlusMinus";
import Cookie from "cookie-universal";
import { CartNums } from "../../context/CartNumContext";
import MobMinueLinks from "./MobMinueLinks";
import { MobMenue } from "../../context/MopMenueContext";
import DropDownLogOut from "./DropDownLogOut";
import {CategoriesList} from "./CategoriesList";
import SearshLogic from "./SearshLogic";

export default function NavBar() {
  // ========== States ==========
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const [name, setName] = useState("");

  // ========== Context ==========
  const screenwidth = useContext(ScreenSizeContext);
  const { isChange } = useContext(Cart);
  
  // ✅ استخدام Context بشكل آمن
  const CartNumcon = useContext(CartNums);
  const CartNum = CartNumcon?.CartNum || 0;
  const setCartNum = CartNumcon?.setCartNum || (() => {});
  const MobMenueCon = useContext(MobMenue);
  // ===========================
  // ========== Cookie ==========
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  // ========== جلب الفئات ==========
  
  const basic = "https://dummyjson.com";
  
  // ========== جلب المجموعات ==========
  useEffect(() => {
    
    setCategories(CategoriesList.slice(7, 15))
    
  }, []); 

  // ========== جلب منتجات السلة ==========
  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]); // ✅ يتشغل عند تغيير isChange

  // ========== تحديث عداد السلة ==========
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("product")) || [];
    setCartNum(products.length);
  }, [isChange, setCartNum]); // ✅ يتشغل عند تغيير isChange

  // ========== معالج الحذف ==========
  const handleDelete = useCallback((id) => {
    const filteredProduct = products.filter((product) => product.id !== id);
    setProducts(filteredProduct);
    localStorage.setItem("product", JSON.stringify(filteredProduct));
    setCartNum(filteredProduct.length);
  }, [products, setCartNum]);

  // ========== معالج تغيير العدد ==========
  const changCount = useCallback((id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product") || []);
    const findProduct = getProducts.find((product) => product.id === id);
    if (findProduct) {
      findProduct.count = btnCount;
      localStorage.setItem("product", JSON.stringify(getProducts));
    }
  }, []);

  // ========== معالج تسجيل الخروج ==========
  const handelLogOut = useCallback(() => {
    cookie.remove("e-commerce");
    window.location.pathname = "/login";
  }, [cookie]);

  // ========== عرض المنتجات في السلة ==========
  const productShow = products?.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <IoIosCloseCircle
          onClick={() => handleDelete(product.id)}
          style={{
            width: "60px",
            height: "30px",
            position: "absolute",
            top: "0",
            right: "0",
            cursor: "pointer",
          }}
          className="text-danger"
        />
        <img
          src={product.images}
          height={"100px"}
          style={{ objectFit: "cover" }}
          className="rounded col-sm-3 col-md-4 col-12"
          alt="img"
        />
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{product.discount}</h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}
            >
              {product.price}$
            </h6>
          </div>
        </div>
        <PlusMinus
          id={product.id}
          count={product.count || 1}
          setCount={setCount}
          changCount={changCount}
        />
      </div>
    </div>
  ));

  // ========== عرض الفئات ==========
  const categoriesShow = categories.map((category, index) => (
    <Link to={`/${category}`} key={index} className="m-0 text-black category-title">
      {StringSlice(category, 15)}
    </Link>
  ));

  // ========== دالة عرض الفئات ==========
  const renderCategories = () => {
    if (loading) {
      return (
        <div className="d-flex align-items-center justify-content-start gap-5">
          <SkeltonShow
            length={
              screenwidth?.screenWidth > 833
                ? "6"
                : screenwidth?.screenWidth < 833 && screenwidth?.screenWidth > 600
                ? "3"
                : "1"
            }
            height="30px"
            width="80px"
            classes="col-lg-1 col-md-6 col-12"
          />
        </div>
      );
    }

    if (screenwidth?.screenWidth > 940) {
      return (
        <div className="d-flex align-items-center justify-content-start gap-3">
          {categoriesShow}
          {categories.length > 0 && (
            <Link className="text-black category-title" to="/AllProducts">
              Show All
            </Link>
          )}
        </div>
      );
    }

    return null;
  };

  // ========== Render ==========
  // ==========show MobMenueCon===========
  function showmopmen(){
    MobMenueCon.setIsOpen(prev=>!prev)
  }



  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



      <nav className="py-3">
        {screenwidth.screenWidth <= 940?<div onClick={showmopmen} style={{width:"fit-content"}}>
          <IoIosMenu style={{ fontSize: "30px", color: "blue", cursor: "pointer",position:"absolute",top:"15px",left:"25px" }}/>
          </div>:""}
          {/* depend on Open or not in context and afeect with left style */}
          <MobMinueLinks />
        <Container>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <Link to="/" className="col-3">
              <img
                src={require("../../assets/images/logo.jpg")}
                alt="..."
                width="120px"
              />
            </Link>

           <SearshLogic/>
            <div className="col-6 col-md-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-2">
              {/* ✅ زر السلة مع العداد */}
              <div
                onClick={() => setShow(true)}
                className="col-3"
                style={{ position: "relative", cursor: "pointer" }}
              >
                <BsCart3 style={{ fontSize: "40px", color: "#000" }} />
                <div
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "50%",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20px",
                    height: "20px",
                    fontSize: "12px",
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                  }}
                >
                  {CartNum}
                </div>
              </div>

              {/* ✅ روابط المستخدم */}
              {!token && (
                <div className="d-flex gap-3">
                  <Link to={"/register"}>
                    <FaUserCircle style={{ fontSize: "40px", color: "blue" }} />
                  </Link>
                  <Link to={"/login"}>
                    <div className="icon-login" style={{ fontSize: "40px" }} />
                  </Link>
                </div>
              )}

              {token&&screenwidth.screenWidth >= 940 && (
                <DropDownLogOut />
              )}
            </div>
          </div>

          {/* ✅ عرض الفئات */}
          <div className="mt-3">
            <div
              className="d-flex align-items-center justify-content-start flex-wrap gap-5"
              style={{ minWidth: 100 }}
            >
              {renderCategories()}
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}