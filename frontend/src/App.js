import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5001/")
      .then((response) => response.json())
      .then((data) => setMessage(data.status))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Frontend Connected to Backend</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
