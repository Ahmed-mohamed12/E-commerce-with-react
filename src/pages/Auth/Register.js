import axios from "axios";
import { useState } from "react";
import { basic, registerUrl } from "../../api";
import LoadingSubmit from "../../component/loading/loading";
import Cookie from "cookie-universal";
import "./Auth.css";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

// import { Navigate } from "react-router-dom";
// const nav=Navigate()
export default function Register() {
  // state
   const [form, setForm] = useState({
    username: "emilys",
    password: "emilyspass",
  });
  // const [form, setForm] = useState({
  //   name: "",
  //   email:"",
  //   password: "",
  // });
  // loading page
  const [loading, setLoading] = useState(false);
  const Navigate=useNavigate()
  // save token in cookie
  const cookie = Cookie();
  // error
  const [err, setErr] = useState("");
  const [flag, setFlag] = useState(false);
  // handelSubmet
  function handelData(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // sendData
  async function handelSubmet(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`https://dummyjson.com/auth/login`, form);
      // const res = await axios.post(`http://127.0.0.1:8000/api/register`, form);
      setLoading(false);
     const token = res.data.accessToken;
    //  const token = await res.data.token;
     
    
      cookie.set("e-commerce", token);
      cookie.set("refreshToken", res.data.refreshToken);
      // Navigate("/dashboard/users")
      window.location.pathname="/dashboard/users"
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email is alredy been taken");
        setFlag(true);
      } else {
        setErr("interval server err");
      }
    }
  }

  return (
    // eslint-disable-next-line
    <>
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handelSubmet}>
            <div className="custom-form">
              <h1>Register Now</h1>

              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="emilys@example.com"
                  name="name"
                  // value="emilys"
                  value={form.name }
                  onChange={handelData}
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
                  // value="emilys@gmail.com"
                  value={form.email}
                  onChange={handelData}
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Control
                  type="password"
                  placeholder="password@example.com"
                  name="password"
                  value={form.password}
                  onChange={handelData}
                  minLength={6}
                  required
                />
                <Form.Label>password</Form.Label>

                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                {err !== " " && flag && <span className="error">{err}</span>}
                <a
                  className="google-btn"
                  href={`http://127.0.0.1:8000/login-google`}
                >
                  {/* <div className="google-icon-wrapper" style={{display:"inline-block"}}>
            <img className="google-icon"
            src=""
            alt="sign in with google"
            />
          </div> */}
                  <FcGoogle style={{ fontSize: "40px" }} />
                  <span>sign in with google</span>
                </a>
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
