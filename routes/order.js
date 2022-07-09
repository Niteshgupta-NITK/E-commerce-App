const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOneOrder,
  getLoggedInOrder,
  admingetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
} = require("../controllers/orderController");

const { isLoggedIn, customRole } = require("../middlewares/User");

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/order/myOrders").get(isLoggedIn, getLoggedInOrder);
router.route("/order/:id").get(isLoggedIn, getOneOrder);

router
  .route("/admin/orders")
  .get(isLoggedIn, customRole("admin"), admingetAllOrders);
router
  .route("/admin/order/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOrder)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOrder);

module.exports = router;
