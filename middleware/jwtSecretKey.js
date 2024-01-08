const crypto = require('crypto');


const generateSecretKey = () => {
    // const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}|;:,.<>?'; // Add your desired special characters
    // const passwordLength = 64;

    // let password = '';
    // for (let i = 0; i < passwordLength; i++) {
    //     const randomIndex = Math.floor(Math.random() * characters.length);
    //     password += characters.charAt(randomIndex);
    // }

    // return password;
    return crypto.randomBytes(128).toString('hex');
};


module.exports = { generateSecretKey };