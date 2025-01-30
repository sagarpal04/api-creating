const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import cors package
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Allow only localhost:5173 to access
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions)); // Enable CORS with the above options

app.post("/publish", (req, res) => {
  const { apiName, apiData } = req.body;
  const filePath = path.join(__dirname, "apis", `${apiName}.json`);

  try {
    if (!fs.existsSync(path.join(__dirname, "apis"))) {
      fs.mkdirSync(path.join(__dirname, "apis"));
    }

    fs.writeFileSync(filePath, JSON.stringify(JSON.parse(apiData), null, 2));

    res.status(200).json({ message: "API Published", url: `/api/${apiName}` });
  } catch (error) {
    res.status(500).json({ message: "Invalid JSON format" });
  }
});

// Serve the published APIs
app.get("/api/:apiName", (req, res) => {
  const { apiName } = req.params;
  const filePath = path.join(__dirname, "apis", `${apiName}.json`);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    // res.status(200).json({ message: "API Not Found" });
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(404).json({ message: "API Not Found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
