import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        setUser(response.data);
      } catch (error) {
        console.log(error.response.data);
        // redirect the user to the login page
      }
    }

    fetchUserData();
  }, []);

  async function handleLogout() {
    // remove the session ID from the cookie or local storage
    // redirect the user to the login page
    try {
      const response = await axios.get("http://localhost:5000/api/logout");
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  function handleUpload() {
    navigate("/upload");
  }

  function handleDownload() {
    navigate("/fetch");
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Welcome!</h1>
      <div className="button">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleUpload}>Upload Image</button>
        <button onClick={handleDownload}>Fetch Files</button>
      </div>
    </div>
  );
};

export default Dashboard;
