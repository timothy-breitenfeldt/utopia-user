"use strict";

const db = require("./db");
const { ApplicationError } = require("../helper/error");

function getUser(email, password) {
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * from user WHERE email = ?;";
    db.connection.query(sql, [email], function(error, result) {
      if (error) {
        return reject(error);
      }
      if (result.length == 0) {
        return reject(
          new ApplicationError(403, "Invalid username or password")
        );
      }
      if (password != result[0].password) {
        return reject(
          new ApplicationError(403, "Invalid username or password")
        );
      }

      return resolve(result[0]);
    });
  });
}

module.exports = {
  getUser
};
