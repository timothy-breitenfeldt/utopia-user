"use strict";

const routes = require("express").Router();
const userService = require("../service/userService");
const { handleError } = require("../helper/error");
const jwt = require("../helper/jwt");

routes.post("/account/login", async function(request, response, next) {
  try {
    const credentials = request.body;
    const user = await userService.getUser(credentials);
    const token = jwt.generateToken(user.id, user.role);
    response.status(200);
    response.send({ token: token, user: user });
  } catch (error) {
    handleError(error, next);
  }
});

module.exports = routes;
