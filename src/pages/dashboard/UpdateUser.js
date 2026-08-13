
import axios from "axios";
import { useEffect, useState } from "react";
import {  basic, usersUrl, userUrl } from "../../api";
import LoadingSubmit from "../../component/loading/loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import "../../css/components/google.css";
import { useNavigate, useParams } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

export default function UpdateUser() {
  const params=useParams()
  const id=params.id;
  const nav=useNavigate()
  // state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [disabled, setDisabled] = useState(true)
  // loading page
  const [loading, setLoading] = useState(false);

  // ============GET TOKEN================
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
   
  // error
  // const [err, setErr] = useState("");
  // const [flag, setFlag] = useState(false);

  

  // handleData
  useEffect(()=>{
     axios.get(`${basic}/${userUrl}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    .then((data)=> {
      setName( `${data.data.firstName} ${data.data.lastName}`);
      setEmail( data.data.email)
      setRole( data.data.role)}
      ).then(()=>setDisabled(false))
      .catch(()=>{nav("/dashboard/page/404" ,{replace:true})})
      
  },[id,nav,token])
  // ----------------------------------------------------------
  // ===========================================
 // دالة منفصلة لحفظ الكوكي بشكل صحيح

// ====== دوال مختصرة للتعامل مع localStorage ======

// ====== دوال localStorage ======

// جلب المصفوفة
function getArr(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// حفظ المصفوفة
function saveArr(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// إضافة أو تحديث مستخدم (لو الـ ID موجود يعدل، لو مش موجود يضيف)
// ====== دالة لإضافة أو تحديث مستخدم في Array ======

function addOrUpdateUser(newUser) {
  // 1. جيب الـ Array القديمة من localStorage
  let oldData = localStorage.getItem("users");
  let users = [];
  
  // 2. لو في بيانات قديمة، حولها لـ Array
  if (oldData) {
    try {
      users = JSON.parse(oldData);
      // تأكد إنها Array
      if (!Array.isArray(users)) {
        users = [users];
      }
    } catch (e) {
      users = [];
    }
  }
  
  // 3. دور على المستخدم بالـ ID
  let index = users.findIndex(u => u.id === newUser.id);
  
  // 4. لو موجود عدل، لو مش موجود ضيف
  if (index !== -1) {
    users[index] = newUser;
    console.log(`✅ تم تحديث المستخدم ID: ${newUser.id}`);
  } else {
    users.push(newUser);
    console.log(`✅ تم إضافة مستخدم جديد ID: ${newUser.id}`);
  }
  
  // 5. احفظ الـ Array كاملة في localStorage
  localStorage.setItem("users", JSON.stringify(users));
  
  console.log("📦 جميع المستخدمين:", users);
  return users;
}
  // ===========================================
  // handel submit
 async function handelSubmit(e){

e.preventDefault()
await axios.put(`${basic}/${usersUrl}/${id}`,
 { name:name,
  email:email,
  role:role
}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
setLoading((e)=>{return !e})
let newUserDate={
  id: id,
  name: name,
  email: email,
  role: role,
};
addOrUpdateUser(newUserDate);
// addUserToCookie(newUserDate)
window.location.pathname="/dashboard/users"
 }

  return (
    <>
      {loading && <LoadingSubmit />}
      {role?
      <div className="container mt-3">
        <h1 className="m-2">Update User</h1>
        <div className="row mt-3" style={{ hight: "90vh" ,width:"100%"}}>
        <Form onSubmit={handelSubmit}>
            <div className="custom-form">
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="name"
                  placeholder="name..."
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                   minLength={6}
                  required
                />
                <Form.Label>email</Form.Label>
           
        
              </Form.Group>
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Select
                  
                  
                  name="role"
                  value={role}
                  onChange={(e)=>setRole(e.target.value)}
                  
                  >
                    <option select={"true"}>select role</option>
                    <option value={'1995'}>admin</option>
                    <option value={'2001'}>user</option>
                    <option value={'1996'}>writer</option>
                  </Form.Select>
                <Form.Label>role</Form.Label>
           
        
              </Form.Group>
                <button type="submit" className="btn btn-primary" disabled={disabled}>
                  Update
                </button>
                {/* {err !== "" && flag && (
                  <span className="error">{err}</span>
                )} */}
            </div>
          </Form>
        </div>
      </div>
      :<LoadingSubmit />}
    </>
  )
 }