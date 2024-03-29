const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user.js");
const cronjob = require("./middleware/cron_job.js");
const multer = require('multer');
const upload = multer({ dest: 'C:/usman/new data base/images' });


// const cron = require("node-cron");

const UserOTPVerification = require("./models/otpVerification.js");
const mongooseConnection = require("./db/mongodb.js");
const corsMiddleware = require("./middleware/cors_middleware");
const signupRoute = require("./routes/Auth/signup.js");
const signinRoute = require("./routes/Auth/signin.js");
const getDataRoute = require("./routes/getdata.js");
const updateRoute = require("./routes/update.js");
const deleteRoute = require("./routes/delete.js");
const changePassword = require("./routes/Auth/changePassword.js");
const forgotPassword = require("./routes/Auth/forgotPassword.js");
const resetPassword = require("./routes/Auth/resetPassword.js");
const saveUsers = require("./routes/saveUsers.js");
const getUsers = require("./routes/getAllDataUsers.js");
const getOneUsers = require("./routes/getUserData.js");
const verifyOTP = require("./routes/verifyOtp.js");
const signUpVander = require("./routes/AuthVender/signup.js");
const signInVander = require("./routes/AuthVender/signin.js");
const resetVander = require("./routes/AuthVender/resetPassword.js");
const passwordVander = require("./routes/AuthVender/changePassword.js");
const forgotVander = require("./routes/AuthVender/forgotPassword.js");
const app = express();
const PORT = 3000;
require('dotenv').config();

app.use(corsMiddleware);

// Middleware
app.use(cors());
app.use(bodyParser.json());

const cron = cronjob


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'C:/usman/new data base/images');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname);
    }
});


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
    app.use("/api/saveUsers", saveUsers);
    app.use("/api/getUsers", getUsers);
    app.use("/api/getOneUsers", getOneUsers);
    app.use("/api/signUpVander", signUpVander);
    app.use("/api/signInVander", signInVander);
    app.use("/api/resetVander", resetVander);
    app.use("/api/forgotVander", forgotVander);
    app.use("/api/passwordVander", passwordVander);

    // Other code related to Express setup, routes, and starting the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

});