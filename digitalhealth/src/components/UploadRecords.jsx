import React from 'react';
import axios from 'axios';

function UploadRecords() {
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await axios.post('http://your-backend-api.onrender.com/api/upload/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Uploaded: ' + res.data.filename);
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="dashboard-section">
      <h3>Upload Medical Records</h3>
      <input type="file" onChange={handleUpload} />
    </div>
  );
}

export default UploadRecords;

