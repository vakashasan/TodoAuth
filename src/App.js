import "./styles.css";
import Welcome from "./component/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./component/homepage";
import Signup from "./component/Signup";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
