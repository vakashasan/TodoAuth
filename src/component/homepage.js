import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { onValue, ref, set, remove, update } from "firebase/database";
import { uid } from "uid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import "./home.css";

export default function Homepage() {
  const navigate = useNavigate("");
  const [task, setTask] = useState("");
  const [updatebtn, setUpdatebtn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [tempUidd, setTempUidd] = useState();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handletask = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: task,
      uidd: uidd
    });
    setTask("");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  const handleUpdate = (todo) => {
    setTask(todo.todo);
    setUpdatebtn(true);
    setTempUidd(todo.uidd);
  };

  const updatetodb = () => {
    const uidd = uid();
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: task,
      tempUidd: tempUidd
    });

    setUpdatebtn(false);
  };

  return (
    <div className="homepagediv">
      <h1> Your Own TODO List </h1>
      <div className="todoinput">
        <TextField
          id="outlined-basic"
          label="Add Your Task"
          variant="outlined"
          type="text"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        {updatebtn ? (
          <div>
            <Button variant="contained" onClick={updatetodb}>
              {" "}
              Updated{" "}
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="contained"
              size="large"
              className="btn"
              onClick={handletask}
            >
              {" "}
              Submit{" "}
            </Button>
          </div>
        )}
      </div>
      {todos.map((todo) => (
        <div className="todo">
          <h1>{todo.todo}</h1>
          <Stack spacing={2} direction="row">
            <Button
              size="small"
              className="uibtn"
              variant="contained"
              onClick={() => handleUpdate(todo)}
            >
              {" "}
              Edit{" "}
            </Button>
            <Button
              size="small"
              className="uibtn"
              variant="contained"
              onClick={() => handleDelete(todo.uidd)}
            >
              {" "}
              Delete{" "}
            </Button>
          </Stack>
        </div>
      ))}
      <br />{" "}
      <Button variant="outlined" onClick={handleSignOut}>
        {" "}
        Sign Out{" "}
      </Button>
    </div>
  );
}
