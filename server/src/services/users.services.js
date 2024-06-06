const { poolPromise, sql } = require("./database.services");

async function loginUser(email, password) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}' AND status = 1`
      );
    const user = result.recordset[0];

    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: "Invalid Email or password" };
    }
  } catch (error) {
    // console.log("Error logging", error);
    throw error;
  }
}

async function registerUser(username, password, email) {
  try {
    const pool = await poolPromise;
    //insert new user
    await pool.request().query(
      `INSERT INTO Users (username, password, email, role_id) VALUES 
        ('${username}', '${password}', '${email}', 'customer' )`
    );

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    throw error;
  }
}

async function applyVoucher(user_id, voucher_id) {
  try {
    const pool = await poolPromise;
    // Get the voucher
    await pool
      .request()
      .query(
        `INSERT INTO User_Vouchers (user_id, voucher_id, used) VALUES ('${user_id}', '${voucher_id}', 1)`
      );

    return { success: true, message: "Voucher applied successfully" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginUser,
  registerUser,
  applyVoucher,
};
