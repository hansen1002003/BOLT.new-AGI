import { useState, useEffect } from "react";
import React from "react";


function App() {
  const [backendResponse, setBackendResponse] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5001/")
      .then((res) => res.json())
      .then((data) => setBackendResponse(data.status))
      .catch((error) => console.error("Error fetching backend:", error));
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "blue" }}>Frontend Connected to Backend</h1>
      <p style={{ fontSize: "18px" }}>
        <strong>Backend says:</strong> {backendResponse}
      </p>
    </div>
  );
}

export default App;
