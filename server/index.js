const express = require("express");
const cors = require("cors");
const connectDB = require("../server/ConnectDB/connectDB");
const taskRoutes = require("../server/routes/taskRoutes");
const userRoutes = require("../server/routes/userRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());

connectDB();

app.use("/task", taskRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
