const bcrypt = require('bcryptjs');

const hash = bcrypt.hashSync('cms2026', 10);

console.log(hash);