const bcrypt = require('bcrypt');

const passwordHased = async (password) => {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    return hash
}

const comparePassword = async (password, passwordHased) => {
    const match = await bcrypt.compare(password, passwordHased);
    return match
}

module.exports = {
    passwordHased,
    comparePassword
}