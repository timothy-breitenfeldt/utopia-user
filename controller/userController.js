"use strict";

const routes = require("express").Router();
const userService = require("../service/userService");
const { handleError } = require("../helper/error");
const jwt = require("../helper/jwt");

routes.post("/account", async function(request, response, next) {
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

routes.post("/account/register", async function(request, response, next) {
  try {
    const user = request.body;
    const userId = await userService.createUser(user);
    response.status(201);
    response.send(userId);
  } catch (error) {
    handleError(error, next);
  }
});

//Endpoint for healthcheck
routes.get("/account", function(request, response, next) {
  response.send("Health check").status(200);
});

module.exports = routes;
