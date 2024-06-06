const express = require("express");

const {
  createUserController,
  updateUserController,
  deleteUserController,
  getAllUserController,
  getUserByIdController,
} = require("../controller/admins.controller");

const {
  createUserMiddleware,
  updateUserMiddleware,
} = require("../middlewares/admin.middlewares");
const adminRoutes = express.Router();

// admin CRUD api

//api create User
adminRoutes.post("/create", createUserMiddleware, createUserController);

//api get User
adminRoutes.get("/getUser/:id", getUserByIdController);

// get All User
adminRoutes.get("/allUsers", getAllUserController);

// Delete user

adminRoutes.get("/delete/:id", deleteUserController);

//api update User
adminRoutes.put("/update/:id", updateUserMiddleware, updateUserController);

module.exports = adminRoutes;
