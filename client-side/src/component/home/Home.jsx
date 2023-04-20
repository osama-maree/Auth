import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

function Home() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const info = useContext(AuthContext);
  const handelLogout = async () => {
    try {
      setError("");
      localStorage.clear();
      navigate("/");
    } catch (err) {
      setError("Error in logout");
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile Page</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <span className="bg-dark p-3 text-white rounded border">
            {" "}
            <strong>Name:</strong>
            <span className="">{info.User.name}</span>
          </span>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button className="btn btn-primary" onClick={handelLogout}>
          Log out
        </Button>
      </div>
    </>
  );
}

export default Home;
