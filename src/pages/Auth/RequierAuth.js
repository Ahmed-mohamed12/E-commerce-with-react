import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import Loading from "../../component/loading/loading";
import axios from "axios";
import { basic, curentUserUrl, userUrl } from "../../api";
import Page403 from "./Page403";
import { convertLength } from "@mui/material/styles/cssUtils";

export default function RequireAuth({ alowedRole }) {
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cookie = Cookie();
  // const token = cookie.get("e-commerce");
  let token = cookie.get("e-commerce");
// ================get current user======================
  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        
        const response = await axios.get(`https://dummyjson.com/auth/me`, {
        // const response = await axios.get(`http://127.0.0.1:8000/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`
            
          },
        });
        
        
       await setUser(response?.data);
      } catch (error) {
        Navigate("/login", { replace: true });
        console.log(error);
      }
       finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
    // eslint-disable-next-line
  }, [token]);
  // ---------------------//get current user//------------------------
  
  
  useEffect(() => {
    async function refresh() {
  let refreshToken =await cookie.get("refreshToken");
      try {
      fetch('https://dummyjson.com/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    refreshToken:refreshToken, // Optional, if not provided, the server will use the cookie
    expiresInMins: 60, // optional (FOR ACCESS TOKEN), defaults to 60 
  }),
  credentials: 'include' // Include cookies (e.g., accessToken) in the request
})
.then(res => res.json())
.then((res)=>{return cookie.set('e-commerce',res.accessToken)
});



      } catch (error) {
        console.log(error);
        Navigate("/login", { replace: true });
      }
       
    }

    refresh();
    const interval = setInterval(refresh, 55 * 60 * 1000);

  // ✅ 3. تنظيف الـ Interval عند إلغاء تحميل الـ Component
  return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);










  // ---------------------------------------------
  return token ? (
    user === null? (
      <Loading />
    ) : alowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Page403 role="admin" />
    )
  ) : (
    Navigate("/login", { replace: true })
  ); 
 
  
}
