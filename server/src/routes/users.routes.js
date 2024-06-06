const express = require("express");
const {
  registerUserController,
  loginUserController,
  applyVoucherController,
} = require("../controller/users.controller");
const {
  registerUserMiddleware,
  applyVoucherMiddleware,
} = require("../middlewares/users.middlewares");
const userRoutes = express.Router();

userRoutes.post("/login", loginUserController);

userRoutes.post("/register", registerUserMiddleware, registerUserController);

userRoutes.post("/apply-voucher", applyVoucherMiddleware, applyVoucherController);

module.exports = userRoutes;
