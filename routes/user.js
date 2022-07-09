const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails,
  adminAllUser,
  managerAllUser,
  adminOneUser,
  adminupdateOneuserDetails,
  adminOneUserDelete
} = require("../controllers/userController");
const { isLoggedIn,customRole } = require("../middlewares/User");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);
router.route("/password/update").put(isLoggedIn, changePassword);
router.route("/userdashboard/update").put(isLoggedIn, updateUserDetails);

router.route("/admin/users").get(isLoggedIn,customRole('admin'),adminAllUser);
router.route("/admin/user/:id").get(isLoggedIn,customRole('admin'),adminOneUser).put(isLoggedIn,customRole('admin'),adminupdateOneuserDetails).delete(isLoggedIn,customRole('admin'),adminOneUserDelete);




router.route("/manager/users").get(isLoggedIn,customRole('manager'),managerAllUser);

module.exports = router;
