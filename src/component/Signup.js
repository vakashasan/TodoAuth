import { useNavigate } from "react-router";
import { auth } from "../../firebase";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import "./home.css";

export default function Signup() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, user, password).then(() => {
      // Signed in
      // const user = userCredential.user;
      navigate("/");
      // ...
    });
  };

  return (
    <div className="signupdiv">
      <h1> Sign Up for Free </h1>
      <br />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="text"
        onChange={(e) => setUser(e.target.value)}
      />
      <br />
      <br />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="text"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <Button variant="contained" onClick={handleSignup}>
        {" "}
        Sign Up{" "}
      </Button>
    </div>
  );
}
