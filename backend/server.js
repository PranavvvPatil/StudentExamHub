require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const examRoutes = require("./routes/exam");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);

app.listen(5001, () => console.log("Server started on port 5001"));
