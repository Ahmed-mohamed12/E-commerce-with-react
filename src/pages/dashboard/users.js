import { basic, usersUrl, userUrl } from "../../api";
import { useContext, useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";
import { Menue } from "../../context/MenuContext";
import axios from "axios";
import { Link } from "react-router-dom";
import TableShow from "../../component/dashboard/TableShow";

// import LoadingSubmit from "../../component/loading/loading";
export default function Users() {
  const screenSize = useContext(ScreenSizeContext);
  const screenWidth = screenSize.screenWidth;
  const menue = useContext(Menue);
  const isOpen = menue.isOpen;
  // --------------------

  // --------------------
  // -------------------state-----------
  const [users, setUsers] = useState([]);

  // const [show, setShow] = useState(0);
  const [deleteUser, setDeleteUser] = useState(0);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  // ---------------cookei&&token-----------
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  // ================GET USERS======================
  let nuserFromLocal = localStorage.getItem("users");
  let nuser = nuserFromLocal ? JSON.parse(nuserFromLocal) : [];

 
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(
          `${basic}/${usersUrl}?limit=${limit}&skip=${page==1?0:page * 10}`,
          // `${basic}/${usersUrl}?limit=${limit}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
       
        // console.log(response.data.users[0].firstName="amy");
        // console.log(nuser);
        // ====== استبدال المستخدمين المعدلين في الـ Array الأصلية ======

 let localUsers = localStorage.getItem("users");
        let localUsersArray = localUsers ? JSON.parse(localUsers) : [];
        
        // ====== لو في مستخدمين في localStorage، استبدلهم ======
        let finalUsers = response.data.users;
        
        if (localUsersArray.length > 0) {
          finalUsers = response.data.users.map(user => {
            // دور على نفس الـ ID في localStorage
            let found = localUsersArray.find(local => local.id == user.id);
            // لو لقيت نفس الـ ID، استخدم البيانات من localStorage
            
            return found ? found : user;
          });
        }
        // ====== حدث الـ State ======
        setUsers(finalUsers);
        // setUsers(response.data.users);
        setTotal(30);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getUsers();
  }, [token, deleteUser, limit, page]);
  // ================//GET USERS//======================

  const header = [
    { name: "name", key: "name" },
    { name: "Email", key: "email" },
    { name: "Role", key: "role" },
    { name: "created" ,key:"created_at"},
    { name: "updated" ,key:"updated_at"},
  ];

  // --------handel Delete--------
  async function handleDelet (id) {
    try {
      const response = await axios.delete(`https://dummyjson.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // ✅ تحديث الـ state بعد الحذف
      // setShow(prev => prev);
      setUsers(prevUsers => prevUsers.filter(product => product.id !== id));

       setLimit(prev => prev);
       setPage(prev => prev);
       setDeleteUser((pre) => pre);
      
      
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  }
  // --------///////handel Delete--------

  return (
    <div className=" w-100 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h1>users page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>
      {/* <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          height: "100vh",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.2)",
          display: screenWidth < "768" && isOpen ? "block" : "none",
        }}
      ></div> */}
      <TableShow
        paginateData={users}
        setLimit={setLimit}
        total={total}
        limit={limit}
        setPage={setPage}
        header={header}
        data={users}
        delete={handleDelet}
        users={users}
        searchedName={"users"}
        searchedKey={"q"}
      />
    </div>
  );
}