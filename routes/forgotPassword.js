const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const cron = require("node-cron");

const User = require("../models/user.js");
const UserOTPVerification = require("../models/otpVerification.js");

const { sendEmail } = require("../middleware/sendEmail.js");
const { generateOTP } = require("../middleware/genrateOtp");

const STATUS_SUCCESS = 200;
const STATUS_BAD_REQUEST = 401;
const STATUS_INTERNAL_SERVER_ERROR = 500;

// // let otpKeyData
router.post("/", async (req, res) => {
    try {
        const { email } = req.body;
        // Find the user in the database
        const user = await User.findOne({ email: email });

        if (email === "") {
            res.status(401).json({ status: "401", message: 'Email Should be Entered' });
        } else if (!user) {
            res.status(401).json({ status: "401", error: 'Invalid Email' });
            return;
        }

        let userId = user._id

        const otpKeyData = generateOTP();
        const hashedOTP = await bcrypt.hash(otpKeyData, 8);

        const checkUser = await UserOTPVerification.findOne({ userId: userId })
        if (checkUser) {

            const otpUpdate = {
                // userId: checkUser.userId,
                otp: hashedOTP,
                createdAt: Date.now(),
                expireAt: Date.now() + 360000,
                // expireAt: Date.now() + 360000,
            };
            const updateOtp = await UserOTPVerification.findByIdAndUpdate(
                { _id: checkUser._id },
                otpUpdate, { new: true }
            );
            res.status(200).json({ status: "200", message: 'OTP re-sent successfully' });
        }
        else {
            const otpVerification = new UserOTPVerification({
                userId: user._id,
                // email: email,
                otp: hashedOTP,
                createdAt: Date.now(),
                expireAt: Date.now() + 360000, // Fixed duplicate createdAt key
            });
            await otpVerification.save();
            res.status(200).json({ status: "200", message: 'OTP sent successfully' });
        }

        await sentOTPVerificationEmail(user.email, otpKeyData);
        // Respond to the client if needed

    } catch (error) {
    }
});

// Fixed the function definition and added missing parameters
const sentOTPVerificationEmail = async (user, oTp) => {

    await sendEmail(user, 'verifyPassoword', { otpKey: oTp });

};

cron.schedule("0 0 * * *", async () => {
    try {
        const currentTime = Date.now();

        // Find and delete records where the expireAt field is older than the current time
        await UserOTPVerification.deleteMany({ expireAt: { $lt: currentTime } });

        console.log("Expired OTPs deleted successfully");
    } catch (error) {
        console.error("Error deleting expired OTPs:", error);
    }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// // const cron = require("node-cron");

// const User = require("../models/user.js");
// const UserOTPVerification = require("../models/otpVerification.js");

// const { sendEmail } = require("../middleware/sendEmail.js");
// const { generateOTP } = require("../middleware/genrateOtp");

// const STATUS_SUCCESS = 200;
// const STATUS_BAD_REQUEST = 401;
// const STATUS_INTERNAL_SERVER_ERROR = 500;

// router.post("/", async (req, res) => {
//     try {
//         const { email } = req.body;

//         if (email === "") {
//             return res.status(STATUS_BAD_REQUEST).json({ status: STATUS_BAD_REQUEST, message: 'Email should be entered' });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(STATUS_BAD_REQUEST).json({ status: STATUS_BAD_REQUEST, error: 'Invalid Email' });
//         }

//         let userId = user._id;

//         const otpKeyData = generateOTP();

//         const checkUser = await UserOTPVerification.findOne({ userId });

//         if (checkUser) {
//             const otpUpdate = {
//                 otp: otpKeyData,
//                 createdAt: Date.now(),
//                 expireAt: Date.now() + 360000,
//             };
//             await UserOTPVerification.findByIdAndUpdate(checkUser._id, otpUpdate, { new: true });
//             return res.status(STATUS_SUCCESS).json({ status: STATUS_SUCCESS, message: 'OTP re-sent successfully' });
//         } else {
//             const otpVerification = new UserOTPVerification({
//                 userId,
//                 otp: otpKeyData,
//                 createdAt: Date.now(),
//                 expireAt: Date.now() + 360000,
//             });
//             await otpVerification.save();
//             return res.status(STATUS_SUCCESS).json({ status: STATUS_SUCCESS, message: 'OTP sent successfully' });
//         }

//         await sentOTPVerificationEmail(user.email, otpKeyData);
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ status: STATUS_INTERNAL_SERVER_ERROR, error: 'Something went wrong' });
//     }
// });

// const sentOTPVerificationEmail = async (user, otp) => {
//     try {
//         await sendEmail(user, 'verifyPassword', { otpKey: otp });
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw error;
//     }
// };

// // cron.schedule("0 0 * * *", async () => {
// //     try {
// //         const currentTime = Date.now();

// //         await UserOTPVerification.deleteMany({ expireAt: { $lt: currentTime } });

// //         console.log("Expired OTPs deleted successfully");
// //     } catch (error) {
// //         console.error("Error deleting expired OTPs:", error);
// //     }
// // });

// module.exports = router;
