"use strict";

const db = require("./db");
const { ApplicationError } = require("../helper/error");

function getUser(email, password) {
  return new Promise(async function(resolve, reject) {
    //delay a random amount of time up to 1 second to discourage brute force attacks
    const delay = Math.floor(Math.random() * 1200) + 300;
    await new Promise(resolve => setTimeout(resolve, delay));

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

function createUser(user) {
  return new Promise(async function(resolve, reject) {
    const emailExists = await _checkIfEmailExists(user.email);

    if (emailExists) {
      return reject(
        new ApplicationError(
          409,
          "That email already exists, please use a different email."
        )
      );
    }

    try {
      const parameters = [
        user.email,
        user.password,
        user.role,
        user.agency_id,
        user.first_name,
        user.last_name,
        user.dob,
        user.phone,
        user.street,
        user.country,
        user.state,
        user.city,
        user.postal_code
      ];
      const sql =
        "INSERT INTO user (email, password, role, agency_id, first_name, last_name, dob, phone, street, country, state, city, postal_code) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);";
      await db.connection.query(sql, parameters);
      const id = await db.getLastInsertedId();
      return resolve(id);
    } catch (error) {
      return reject(error);
    }
  });
}

function _checkIfEmailExists(email) {
  return new Promise(function(resolve, reject) {
    const sql = "SELECT id FROM user WHERE email = ?;";
    db.connection.query(sql, [email], function(error, result) {
      if (error) {
        reject(error);
      }
      if (result.length != 0) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
}

module.exports = {
  getUser,
  createUser
};
