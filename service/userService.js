"use strict";

const userDao = require("../dao/userDao");
const { ApplicationError } = require("../helper/error");

function getUser(credentials) {
  if (!credentials.email) {
    throw new ApplicationError(403, "Invalid username or password");
  }
  if (!credentials.password) {
    throw new ApplicationError(403, "Invalid username or password");
  }

  return userDao.getUser(credentials.email, credentials.password);
}

function createUser(user) {
  const expected = [
    "email",
    "password",
    "role",
    "first_name",
    "last_name",
    "dob",
    "phone",
    "street",
    "country",
    "state",
    "city",
    "postal_code"
  ];

  for (let key of expected) {
    if (!user[key]) {
      throw new ApplicationError(400, `Invalid request, missing ${key}`);
    }
  }

  return userDao.createUser(user);
}

module.exports = {
  getUser,
  createUser
};
