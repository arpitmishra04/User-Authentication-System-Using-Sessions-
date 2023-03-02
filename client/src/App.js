import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import ImageUpload from "./components/image_upload";
import FileList from "./components/image_Fetch";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Signup />} />

            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/fetch" element={<FileList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
