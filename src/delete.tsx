import React, { useState } from "react";
import axios from "axios";

const DeleteButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.delete("https://bitespeedverifications.vercel.app/api/clear-contacts");
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to delete contacts.");
      console.error("Error deleting contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "50px" }}>
      <button 
        onClick={handleDelete} 
        disabled={loading}
        style={{
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
          borderRadius: "5px"
        }}
      >
        {loading ? "Deleting..." : "Delete All Contacts"}
      </button>

      {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
    </div>
  );
};

export default DeleteButton;
