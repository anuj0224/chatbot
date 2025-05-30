const express = require("express");
const axios = require("axios");
const cors = require("cors");
const db = require("./db/db"); // Adjust the path as necessary
const chatwithAiRoute = require("./routes/response.route"); // Adjust the path as necessary

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});



app.use("/api", chatwithAiRoute); // Use the route for chat

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
