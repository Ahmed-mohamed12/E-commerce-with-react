import axios from "axios";
import { useEffect, useState } from "react";
import { basic, usersUrl, userUrl } from "../../api";
import LoadingSubmit from "../../component/loading/loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import "../../css/components/google.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const params = useParams();
  const id = params.id;
  const nav = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  // ====== جلب البيانات ======
  useEffect(() => {
    axios.get(`${basic}/${userUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((data) => {
      setName(`${data.data.firstName} ${data.data.lastName}`);
      setEmail(data.data.email);
      setRole(data.data.role);
    })
    .then(() => setDisabled(false))
    .catch(() => nav("/dashboard/page/404", { replace: true }));
  }, [id, nav, token]);

  // ====== دالة localStorage الصحيحة ======
  function addOrUpdateUser(newUser) {
    let users = [];
    
    try {
      const data = localStorage.getItem("users");
      users = data ? JSON.parse(data) : [];
      if (!Array.isArray(users)) users = [];
    } catch (e) {
      console.error("خطأ في localStorage:", e);
      users = [];
    }
    
    const index = users.findIndex(u => u.id === newUser.id);
    
    if (index !== -1) {
      users[index] = newUser;
      console.log(`✅ تم تحديث المستخدم ID: ${newUser.id}`);
    } else {
      users.push(newUser);
      console.log(`✅ تم إضافة مستخدم جديد ID: ${newUser.id}`);
    }
    
    localStorage.setItem("users", JSON.stringify(users));
    return users;
  }

  // ====== handle submit ======
  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.put(`${basic}/${usersUrl}/${id}`, {
        name: name,
        email: email,
        role: role
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const newUserDate = {
        id: id,
        name: name,
        email: email,
        role: role,
      };
      
      addOrUpdateUser(newUserDate);
      nav("/dashboard/users");
      
    } catch (error) {
      console.error("خطأ في التحديث:", error);
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container mt-3">
        <h1 className="m-2">Update User</h1>
        <div className="row mt-3" style={{ height: "90vh", width: "100%" }}>
          <Form onSubmit={handelSubmit}>
            <div className="custom-form">
              <Form.Group className="mb-3 form-c" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="name..."
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>
              
              <Form.Group className="mb-3 form-c" controlId="exampleForm.ControlInput2">
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength={6}
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>
              
              <Form.Group className="mb-3 form-c" controlId="exampleForm.ControlInput3">
                <Form.Select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">select role</option>
                  <option value="1995">admin</option>
                  <option value="2001">user</option>
                  <option value="1996">writer</option>
                </Form.Select>
                <Form.Label>Role</Form.Label>
              </Form.Group>
              
              <button type="submit" className="btn btn-primary" disabled={disabled}>
                Update
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}