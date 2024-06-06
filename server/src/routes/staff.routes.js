const express = require("express");
const staffRouters = express.Router();


const { createVoucherController } = require("../controller/staff.controller");
const { createVoucherMiddleware } = require("../middlewares/staff.middleware");


// staff crrate voucher
staffRouters.post("/createVoucher", createVoucherMiddleware, createVoucherController);







module.exports = staffRouters;
