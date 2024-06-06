const { poolPromise, sql } = require("./database.services");
const crypto = require("crypto");

async function createVoucher(discount, expiration_date) {
  try {
    const pool = await poolPromise;
    let code;
    let isUnique = false;

    // Generate a unique voucher code
    while (!isUnique) {
      code = generateVoucherCode();
      const result = await pool
        .request()
        .input("code", sql.VarChar, code)
        .query(`SELECT COUNT(*) as count FROM Vouchers WHERE code = @code`);

      if (result.recordset[0].count === 0) {
        isUnique = true;
      }
    }

    // Insert the voucher into the database
    const result = await pool
      .request()
      .input("code", sql.VarChar, code)
      .input("discount", sql.Decimal, discount)
      .input("expiration_date", sql.DateTime, new Date(expiration_date))
      .query(`INSERT INTO Vouchers (code, discount, expiration_date) 
                VALUES (@code, @discount, @expiration_date)`);
    return { success: true, message: "Voucher created successfully" };
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

function generateVoucherCode() {
  return crypto.randomBytes(8).toString("hex").toUpperCase();
}






module.exports = {
  createVoucher,
  
};
