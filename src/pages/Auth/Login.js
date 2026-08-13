import axios from "axios";
import { useState } from "react";
import { LoginUrl, basic } from "../../api";
import LoadingSubmit from "../../component/loading/loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import "../../css/components/google.css";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  // state
  const [form, setForm] = useState({
    // admin account
    username: ""||"emilys",
    password: ""||"emilyspass",
  });
  // const [form, setForm] = useState({
  //   username: "emilys",
  //   password: "emilyspass",
  // });
 

  // loading page
  const [loading, setLoading] = useState(false);

  // save token in cookie
  const cookie = Cookie();

  // error
  const [err, setErr] = useState("");
  const [flag, setFlag] = useState(false);

  // useNavigate hook

  // handleData
  function handleData(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // sendData
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // const res = await axios.post(`${basic}/${LoginUrl}`, form);
      console.log(form)
      const res = await axios.post(`https://dummyjson.com/auth/login`, form);
      setLoading(false);
      const token = res.data.accessToken;
      cookie.set("e-commerce", token);
      cookie.set("refreshToken", res.data.refreshToken);
      const role=`res.data.role`;
      const go=role==="admin"?"/dashboard/users":role==="1996"?"/dashboard/Writer":"/"
      navigate(`${go}`, { replace: true });
      // window.location.pathname=go
    } catch (err) {
      setLoading(false);
      console.log(err);
      // if (err.response.status === 401) {
      //   setErr("Wrong username or password");
      //   setFlag(true);
      // } else {
      //   setErr("Internal server error");
      // }
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Login</h1>
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="text"
                  placeholder="username@example.com"
                  name="username"
                  value={form.username ||"chloem"}
                  // value=""
                  onChange={handleData}
                  required
                />
                <Form.Label>username</Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Control
                  type="password"
                  placeholder="password@example.com"
                  name="password"
                  value={form.password ||"chloempass"}
                  // value=""
                  onChange={handleData}
                  minLength={6}
                  required
                />
                <Form.Label>Password</Form.Label>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                {err !== "" && flag && (
                  <span className="error">{err}</span>
                )}
              <a className="google-btn" href={`http://127.0.0.1:8000/login-google`}>
          {/* <div className="google-icon-wrapper" style={{display:"inline-block"}}>
            <img className="google-icon"
            src=""
            alt="sign in with google"
            />
          </div> */}
<FcGoogle  style={{fontSize:"40px"}}/>
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