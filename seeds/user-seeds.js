
const { User } = require('../models');

const userData = [
  {
    username: 'j',
    password: 'password1',
  },
  {
    username: 'd',
    password: 'password2',
  },
  {
    username: 'm',
    password: 'password3',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;