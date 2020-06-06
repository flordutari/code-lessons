const bcrypt = require('bcryptjs');

const saltRounds = 10; // el costo
const salt = bcrypt.genSaltSync(saltRounds);
const password = 'holaBola';
const password2 = 'holaBolas';
const hash = bcrypt.hashSync(password, salt);
const hash1 = bcrypt.hashSync(password2, salt);

console.log(hash)
console.log(hash1)