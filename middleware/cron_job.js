const cron = require("node-cron");
const UserOTPVerification = require("../models/otpVerification.js");


const runCron = cron.schedule("3 * * * *", async () => {
    try {
        const currentTime = Date.now();
        console.log("-------------------", currentTime);

        await UserOTPVerification.deleteMany({ expireAt: { $lt: currentTime } });
        console.log("-------------------")
        console.log("Expired OTPs deleted successfully");
    } catch (error) {
        console.error("Error deleting expired OTPs:", error);
    }
});

module.exports = { runCron };