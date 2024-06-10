const bcrypt = require('bcrypt');

module.exports = async (password) => {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    return hash
}