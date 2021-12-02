const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to Database
connectDB();

// Init midleware
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));

// Defines routes
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
