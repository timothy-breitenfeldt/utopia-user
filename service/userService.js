"use strict";

const userDao = require("../dao/userDao");
const { ApplicationError } = require("../helper/error");

function getUser(credentials) {
    if ( !credentials.email) {
        throw new ApplicationError(403, "Invalid username or password")
    }
    if (!credentials.password) {
        throw new ApplicationError(403, "Invalid username or password")
    }
    
    return userDao.getUser(credentials.email, credentials.password);
}

module.exports = {
    getUser
};