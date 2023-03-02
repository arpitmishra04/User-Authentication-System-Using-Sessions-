import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function FileList() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the list of files from the API
    axios
      .get("http://localhost:5000/api/fetch")
      .then((response) => {
        console.log(response.data);
        setFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function dashboard() {
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>List of Uploaded Files:</h1>
      {files.map((file) => (
        <h2>{file}</h2>
      ))}

      <button className="btn btn-primary" onClick={dashboard}>
        Dashboard
      </button>
    </div>
  );
}

export default FileList;
