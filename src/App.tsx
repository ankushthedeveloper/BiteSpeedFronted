import React, { useState } from "react";
import axios from "axios";
import DeleteButton from "./delete";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [responseData, setResponseData] = useState<any>("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setResponseData(null); // Reset response before new request
  
    try {
      const response = await axios.post("https://bitespeedverifications.vercel.app/api/identify", {
        email: email.trim() !== "" ? email : null, // Send null if empty
        phoneNumber: phoneNumber.trim() !== "" ? phoneNumber : null, // Send null if empty
      });
  
      setResponseData(response.data);
      alert("Go to https://bitespeedverifications.vercel.app/api/all-contacts to view all the current documents in the database after this operation ");
    } catch (err) {
      setError("Error sending data. Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Identity Resolution Form</h2>
      <h3> Current State of Database : {` https://bitespeedverifications.vercel.app/api/all-contacts`}</h3>
      <h5>
        This form sends an email and/or phone number to an API endpoint. The API will return the identity of the provided email or phone number.
        If no email or phone number is provided, the API will return null for that field.
      </h5>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter Email (By default null)"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Enter Phone Number (By default null)"
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
       
      {error && <p style={styles.error}>{error}</p>}
      <DeleteButton/>
      {responseData && (
        <div style={styles.responseContainer}>
          <h3>Response:</h3>
          <pre style={styles.responseBox}>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as const,
    padding: "20px",
    width:"100vw"
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "10px",
    maxWidth: "300px",
    margin: "auto",
    justifyContent:"center"
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  responseContainer: {
    marginTop: "20px",
    textAlign: "left" as const,
    maxWidth: "400px",
    margin: "auto",
    padding: "10px",
    backgroundColor: "black",
    borderRadius: "5px",
  },
  responseBox: {
    whiteSpace: "pre-wrap" as const,
    wordWrap: "break-word" as const,
    fontSize: "14px",
    backgroundColor: "black",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default App;
