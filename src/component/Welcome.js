import { useState, useEffect } from "react";
import "../styles.css";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Signup } from "./Signup";
import "./welcome.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Welcome() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handleuserid = (e) => {
    setUser(e.target.value);
  };

  const handlepass = (e) => {
    setPass(e.target.value);
  };

  const handlesignup = () => {
    navigate("/signup");
  };

  const getAuth = () => {
    signInWithEmailAndPassword(auth, user, pass)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };
  console.log(user, pass);

  return (
    <div className="App">
      <h1> Welcome to Your Personnel Todo APP </h1>
      <div className="logindiv">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="text"
            onChange={handleuserid}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={handlepass}
          />
          <br />
          <Button variant="contained" onClick={getAuth}>
            {" "}
            Sign In{" "}
          </Button>
          <br />
          <Button variant="outlined" onClick={handlesignup}>
            {" "}
            Sign Up{" "}
          </Button>
        </Box>
      </div>
    </div>
  );
}
