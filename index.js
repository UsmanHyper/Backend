const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user.js");
const cronjob = require("./middleware/cron_job.js");
// const cron = require("node-cron");

const UserOTPVerification = require("./models/otpVerification.js");
const mongooseConnection = require("./db/mongodb.js");
const corsMiddleware = require("./middleware/cors_middleware");
const signupRoute = require("./routes/signup.js");
const signinRoute = require("./routes/signin.js");
const getDataRoute = require("./routes/getdata.js");
const updateRoute = require("./routes/update.js");
const deleteRoute = require("./routes/delete.js");
const changePassword = require("./routes/changePassword.js");
const forgotPassword = require("./routes/forgotPassword.js");
const resetPassword = require("./routes/resetPassword.js");
const verifyOTP = require("./routes/verifyOtp.js");
const app = express();
const PORT = 3000;
require('dotenv').config();

app.use(corsMiddleware);

// Middleware
app.use(cors());
app.use(bodyParser.json());



const cron = cronjob
// console.log("--------------", cron)

mongooseConnection.on('open', () => {
    console.log('MongoDB connected');

    // Use the imported routes
    app.use("/api/signup", signupRoute);
    app.use("/api/signin", signinRoute);
    app.use("/api/getdata", getDataRoute);
    app.use("/api/update", updateRoute);
    app.use("/api/changePassword", changePassword);
    app.use("/api/forgotPassword", forgotPassword);
    app.use("/api/resetPassword", resetPassword);
    app.use("/api/verifyOTP", verifyOTP);
    app.use("/api/delete", deleteRoute);

    // Other code related to Express setup, routes, and starting the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});