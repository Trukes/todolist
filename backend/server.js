const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const { globalRoute, registerRoute, authRoute, projectRoute, taskRoute } = require("./src/routes/routes.js");

require("dotenv").config();

const app = express();
const port = process.env.BACKEND_PORT || 8081;


app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.use("/", globalRoute);
app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/projects", projectRoute);
app.use("/tasks", taskRoute);

mongoose.connect(process.env.MONGO_CONNECTOR, {
    useNewUrlParser: "true",
});

mongoose.connection.on("connected", (err, res) => {
    if(err)
        console.log(err);
    
    if(res)
        console.log("mongoose is connected");
});

app.listen(port, () => {
    console.log(`Backend ToDo working at http://localhost:${port}`);
});