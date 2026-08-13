
import axios from "axios";
import { useState } from "react";
import { basic, usersUrl, userUrl } from "../../api";
import LoadingSubmit from "../../component/loading/loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import "../../css/components/google.css";

// import { FcGoogle } from "react-icons/fc";

export default function AddUser(){

    // state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")


    // loading page
    const [loading, setLoading] = useState(false);

    // save token in cookie
    const cookie = Cookie();
    const token = cookie.get("e-commerce");
    
    // error
    const [err, setErr] = useState("");
    //  const [flag, setFlag] = useState(true);


    // handleData
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
    // ----------------------------------------------------------
    // handel submit
    async function handelSubmit(e) {
        e.preventDefault()
        try {
             await axios.post(`${basic}/${usersUrl}/add`,
                {
                    name: name,
                    email: email,
                    password: password,
                    role: role
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            addOrUpdateUser({
                    id:"1",
                    name: name,
                    email: email,
                    role: role
                })
            setLoading(true)
            window.location.pathname = "/dashboard/users"

        } catch (err) {
            err.response.status===422?setErr("email has alredy been taken"):setErr('');
        }
    }

    return (
        <>
            {loading && <LoadingSubmit />}
            <div className="container mt-3">
                <div className="row" style={{ hight: "90vh", width: "100%" }}>
                    <Form onSubmit={handelSubmit}>
                        <h1>Add User</h1>
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
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    minLength={6}
                                    required
                                />
                                <Form.Label>email</Form.Label>


                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput4"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="password..."
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={6}
                                    required
                                />
                                <Form.Label>password</Form.Label>


                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput3"
                            >
                                <Form.Select


                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}

                                >
                                    <option selected>select role</option>
                                    <option value={'1995'}>admin</option>
                                    <option value={'2001'}>user</option>
                                    <option value={'1996'}>writer</option>
                                    <option value={'1999'}>product Manager</option>
                                </Form.Select>
                                <Form.Label>role</Form.Label>


                            </Form.Group>
                            <button disabled={name !=="" &&email !==""&&role !==""?false:true} type="submit" className="btn btn-primary">
                                Add User
                            </button>
                            {err ?  (
                                <span className="error">{err}</span>
                            ):""}
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}