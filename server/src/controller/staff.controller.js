



const {createVoucher,getAllUser} = require('../services/staff.services');

const createVoucherController = async (req, res) => {
    const {discount, expiration_date} = req.body;
    console.log(req.body);
    try {
        const result = await createVoucher(discount, expiration_date);
        console.log(result);
        if (result.success) {
            return res.status(200).json({
                message: result.message,
                status: 200,
            });
        }
    } catch (error) {
        console.log("fail to create a voucher");
    }
}






module.exports = {
    createVoucherController,
   
}