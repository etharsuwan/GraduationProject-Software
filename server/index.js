require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const morgan = require('morgan');

const app = express();
const bp = require('body-parser')

mongoose.connect(process.env.DATABASE)
        .then(() => console.log('Connected to MongoDB...'))
        .catch((err) => console.log("Db Connection Error:",err));

//Middlewares
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("dev"));

//Route middlewares
app.use("/api", authRoutes);

app.listen(8000, () => console.log('Server started on port 8000'));