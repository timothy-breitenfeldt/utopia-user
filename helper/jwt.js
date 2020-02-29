"use strict";

const jwt = require("jwt-simple");
const config = require("config");
const moment = require("moment");

function generateToken(user_id, role) {
  const expires = moment()
    .add(7, "days")
    .valueOf();
  const secret = config.get("jwt.secret");
  const token = jwt.encode(
    {
      id: user_id,
      role: role,
      exp: expires
    },
    secret
  );

  return token;
}

module.exports = {
  generateToken
};
