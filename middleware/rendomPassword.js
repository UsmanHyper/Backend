// Function to generate a random password
// const generateRandomPassword = () => {
//     const randomBytes = crypto.randomBytes(4); // Using 4 bytes to get 8 hexadecimal characters (2 characters per byte)
//     const password = randomBytes.toString('hex').slice(0, 8);
//     return password;
// };

const generateRandomPassword = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}|;:,.<>?'; // Add your desired special characters
    const passwordLength = 8;

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    return password;
};


module.exports = { generateRandomPassword };