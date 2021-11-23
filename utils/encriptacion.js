const bcrypt = require('bcrypt');

const cryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    return hash;
};

const comparePassword = (plainPass, hashword) => {
    const valida = bcrypt.compareSync(plainPass, hashword);

    return valida;
};

module.exports = {
    cryptPassword,
    comparePassword
}

