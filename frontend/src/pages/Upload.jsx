import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post("/api/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("File upload error:", error);
      }
    } else {
      alert("Please select a file before uploading.");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
};

export default Upload;
