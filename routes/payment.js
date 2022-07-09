const express = require("express");
const {
  sendStripeKey,
  captureStripePayment,
  sendRazorpayKey,
  captureRazorpayPayment,
} = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/User");
const router = express.Router();

router.route('/stripeKey').get(isLoggedIn,sendStripeKey);
router.route('/razorpaykey').get(isLoggedIn,sendRazorpayKey);

router.route('/stripePayment').post(isLoggedIn,captureStripePayment);
router.route('/razorPayment').post(isLoggedIn,captureRazorpayPayment);


module.exports=router;