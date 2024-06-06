const { getAllOrder } = require("../services/order.services");

const getOrder = async (req, res) => {
  try {
    const result = await getAllOrder();
    if (result.success) {
      res.json(result.order);
    } else {
      res.json({ message: result.message });
    }
  } catch (error) {
    console.log("Faill to get Order");
  }
};


module.exports = {
  getOrder,
  getOrderById
};
