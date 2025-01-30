import { useState } from "react";

function App() {
  const [apiName, setApiName] = useState("");
  const [apiData, setApiData] = useState("");

  const handlePublish = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/publish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ apiName, apiData }),
        }
      );

      if (response.ok) {
        alert("API Published!");
      } else {
        alert("Failed to Publish API");
      }
    } catch (error) {
      alert("Error publishing API");
    }
  };

  return (
    <div>
      <h1>Create & Publish API</h1>
      <input
        type="text"
        placeholder="Enter API Name"
        value={apiName}
        onChange={(e) => setApiName(e.target.value)}
      />
      <textarea
        placeholder="Enter API Data (JSON format)"
        value={apiData}
        onChange={(e) => setApiData(e.target.value)}
      />
      <button onClick={handlePublish}>Publish API</button>
    </div>
  );
}

export default App;

////////////////
