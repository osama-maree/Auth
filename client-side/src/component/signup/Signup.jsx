import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messege, setMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpassword = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const nameRef = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (
      passwordRef.current.value !== cpassword.current.value &&
      cpassword.current.value &&
      cpassword.current.value
    ) {
      return setError("password not matched");
    }
    if (
      !emailRef.current.value ||
      !genderRef.current.value ||
      !nameRef.current.value ||
      !ageRef.current.value
    ) {
      return setError("Invalid Data account fill all field");
    }
    try {
      setError("");
      setLoading(true);
      const data = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        gender: genderRef.current.value,
        age: ageRef.current.value,
      };
      await axios
        .post(`http://localhost:4001/api/v1/auth/signup`, data)
        .then((response) => {
          if (response.data.message === "added user") {
            setMessage(
              "success,check your email and verify it,finally go to login "
            );
          } else if (response.data.error === "fail to singup") {
            setError("Fail in create account please try again");
          }
        });
    } catch (err) {
      setError("Failed to create an acount");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {messege && <Alert variant="success">{messege}</Alert>}
          <Form onSubmit={handelSubmit}>
            <Form.Group>
              <Form.Label htmlFor="name">name</Form.Label>
              <Form.Control type="text" id="name" ref={nameRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="cpassword">Confirm Password</Form.Label>
              <Form.Control type="password" id="cpassword" ref={cpassword} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="gender">Gender</Form.Label>
              <Form.Select type="textbox" id="gender" ref={genderRef}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="age">Age</Form.Label>
              <Form.Control
                type="number"
                min="12"
                max="80"
                id="age"
                ref={ageRef}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center ,t-2">
        Already have an account ? <Link to="/">Login</Link>
      </div>
    </>
  );
}

export default Signup;
