import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgetPassword from "./component/forgetPassword/ForgetPassword";
import Home from "./component/home/Home";
import Login from "./component/login/Login";
import Signup from "./component/signup/Signup";
import Update from "./component/updateProfile/Update";
import PageNotFound from "./PageNotFound";
export const AuthContext = createContext({});

function App() {
  let [User, setUser] = useState({
    name: "",
    id: 0, // user id
  });
  let info = {
    User,
    setUser,
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("http://localhost:4001/api/v1/auth/getdata", {
          headers: { token: `osama__${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setUser({
            name: res.data.userName,
            id: res.data.id,
          });
          localStorage.setItem("name", res.data.userName);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
//xxxxxxx
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthContext.Provider value={info}>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/update-profile" element={<Update />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthContext.Provider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
