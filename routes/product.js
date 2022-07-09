const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProduct,
  admingetAllProduct,
  getSingleProduct,
  adminUpdateOneProduct,
  adminDeleteOneProduct,
  addAReview,
  DeleteReview,
  getOnlyReviewsForOneProduct
} = require("../controllers/productController");
const { isLoggedIn, customRole } = require("../middlewares/User");

router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addProduct);


router.route("/admin/product/:id").put(isLoggedIn,customRole('admin'),adminUpdateOneProduct).delete(isLoggedIn,customRole('admin'),adminDeleteOneProduct);

router.route("/review").post(isLoggedIn,addAReview);
router.route("/review/:id").get(isLoggedIn,getOnlyReviewsForOneProduct);
router.route("/review").delete(isLoggedIn,DeleteReview);



router.route("/products").get(getAllProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/admin/products").get(isLoggedIn,customRole('admin'),admingetAllProduct);



module.exports = router;
