import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { AuthContext } from "../../App";
import "./../signup/signup.css";
function Login() {
  let infor = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      await axios
        .post(`http://localhost:4001/api/v1/auth/signin`, data)
        .then((res) => {
          if (res.data.error === "veryfing email")
            return setError("please Verifynig your email");
          else if (res.data.error === "Fail")
            return setError("error please try again");
          else if (res.data.message === "logged") {
            const decoded = jwt_decode(res.data.token);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", decoded.name);
            localStorage.setItem("id", decoded.id);
            infor.setUser({
              name: decoded.name,
              id: decoded.id,
            });
            navigate("/home");
          }
        });
    } catch (err) {
      setError("error,please try again");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handelSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              Log In
            </Button>
          </Form>
          <div className=" rounded text-center mt-2 py-2">
            Need an account ? <Link to="/signup">Sign Up</Link>
          </div>
          <div className="w-100 text-center mt-3">
            <Link to="/forget-password" className="text-danger">
              Forget Password
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;
