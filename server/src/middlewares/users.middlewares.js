const { poolPromise, sql } = require("../services/database.services");

const registerUserMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { username, password, confirmPassword, email, role_id } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
      errors.push({
        name: "username",
        success: false,
        message: "Username is required",
        status: 400,
      });
    }

    if (!email) {
      errors.push({
        name: "email",
        success: false,
        message: "Email is required",
        status: 400,
      });
    }

    if (!password) {
      errors.push({
        name: "password",
        success: false,
        message: "Password is required",
        status: 400,
      });
    }

    if (!emailRegex.test(email)) {
      errors.push({
        name: "email",
        success: false,
        message: "Invalid email format",
        status: 400,
      });
    }

    if (password.length < 8 && password.length > 0) {
      errors.push({
        name: "password",
        success: false,
        message: "Password must be at least 8 characters long",
        status: 400,
      });
    }

    if (password && password.length > 20) {
      errors.push({
        name: "password",
        success: false,
        message: "Password must be less than 20 characters long",
        status: 400,
      });
    }

    if (password !== confirmPassword) {
      errors.push({
        name: "confirm password",
        success: false,
        message: "Passwords do not match",
        status: 400,
      });
    }

    const pool = await poolPromise;

    const userResult = await pool
      .request()
      .query(`SELECT * FROM Users WHERE username = '${username}'`);

    if (userResult.recordset.length > 0) {
      errors.push({
        name: "username",
        success: false,
        message: "Username already exists",
        status: 401,
      });
    }

    const userEmailResult = await pool
      .request()
      .query(`SELECT * FROM Users WHERE email = '${email}'`);

    if (userEmailResult.recordset.length > 0) {
      errors.push({
        name: "email",
        success: false,
        message: "Email already exists",
        status: 401,
      });
    }

    if (errors.length > 0) {
      return next(errors);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const applyVoucherMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const pool = await poolPromise;
    const { user_id, voucher_id } = req.body;
    if (!user_id) {
      errors.push({
        name: "user_id",
        success: false,
        message: "User ID is required",
        status: 400,
      });
    }

    if (!voucher_id) {
      errors.push({
        name: "voucher_id",
        success: false,
        message: "Voucher ID is required",
        status: 400,
      });
    }

    const result = await pool.request()
      .query(`SELECT voucher_id, expiration_date
       FROM Vouchers WHERE voucher_id = '${voucher_id}'`);

    if (result.recordset.length === 0) {
      errors.push({
        name: "voucher_id",
        success: false,
        message: "Voucher does not exist",
        status: 400,
      });
    } else {
      const voucher = result.recordset[0];
      const currentDate = new Date();

      if (new Date(voucher.expiration_date) < currentDate) {
        errors.push({
          name: "voucher_id",
          success: false,
          message: "Voucher has expired",
          status: 400,
        });
      }
    }

    const usageResult = await pool.request()
      .query(`SELECT used FROM User_Vouchers WHERE user_id = '${user_id}' 
    AND voucher_id = '${voucher_id}'`);
    console.log(usageResult.recordset);
    if (
      usageResult.recordset.length > 0 &&
      usageResult.recordset[0].used === true
    ) {
      errors.push({
        name: "voucher_id",
        success: false,
        message: "Voucher has already been used",
        status: 400,
      });
    }

    if (errors.length > 0) {
      return next(errors);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserMiddleware,
  applyVoucherMiddleware,
};
