const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const CustomError = require("../utils/customError");
const crypto = require("crypto");
const mailHelper = require("../utils/emailHelper");
const { resolveAny } = require("dns");
exports.signup = BigPromise(async (req, res, next) => {
  if (!req.files) {
    return next(new customError("photo is required", 400));
  }
  let file = req.files.photo;
  let result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "users",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  console.log(name + " email " + email + " password " + password);
  if (!email || !name || !password) {
    return next(
      new customError("Name , email and password are mandatory", 400)
    );
  }
  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: result.public_id,
      secure_url: result.secure_url,
    },
  });
  // console.log(typeof cookieToken);
  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new customError("Please Provide email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new customError("You are not registered yet!", 400));
  }
  const valid = await user.isValidatedPassword(password);
  if (!valid) {
    return next(new customError("Username and Password Doesnt match!", 400));
  }
  //everything is find lets send token lol
  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    succes: true,
    message: "Logout successful",
  });
});

exports.forgotPassword = BigPromise(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new customError("email not found", 500));
  }
  const forgotToken = user.getforgotpasswordToken();
  await user.save({ validateBeforeSave: false });
  const myUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${forgotToken}`;
  const message = `Copy Paste this link in your URL and hit enter \n\n ${myUrl}`;
  try {
    console.log(user);
    await mailHelper({
      email: user.email,
      subject: "Password reset ",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Email sent succesfully",
    });
  } catch (error) {
    user.forgotpasswordToken = undefined;
    user.forgotpasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new CustomError(error.message, 500));
  }
});

exports.passwordReset = BigPromise(async (req, res, next) => {
  const token = req.params.token;
  console.log(token);
  const encrytoken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(encrytoken);
  const user = await User.findOne({
    forgotpasswordToken: encrytoken,
    forgotpasswordExpiry: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    return next(new customError("Token is invalid/expired", 400));
  }

  if (req.body.password !== req.body.confirmpassword) {
    return next(
      new customError("Password and Confirm Password Do not match", 400)
    );
  }
  user.forgotpasswordToken = undefined;
  user.forgotpasswordExpiry = undefined;
  user.password = req.body.password;
  await user.save();
  cookieToken(user, res);
});

exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.changePassword = BigPromise(async (req, res, next) => {
  const userId = req.user.id;
  //since passwor is by default doesn come
  const user = await User.findById(userId).select("+password");
  const isOldPasswordCorrect = await user.isValidatedPassword(
    req.body.Oldpassword
  );
  if (!isOldPasswordCorrect) {
    return next(new customError("Old Password is incorrect", 400));
  }
  user.password = req.body.password;
  await user.save();
  cookieToken(user, res);
});

exports.updateUserDetails = BigPromise(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.files) {
    const tempuser = await User.findById(req.user.id);
    const imageId = tempuser.photo.id;
    const resp = await cloudinary.v2.uploader.destroy(imageId);
    const result = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: "users",
        width: 150,
        crop: "scale",
      }
    );
    newData.photo = {
      id: result.public_id,
      secure_url: result.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

exports.adminAllUser = BigPromise(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

exports.managerAllUser = BigPromise(async (req, res, next) => {
  const users = await User.find({ role: "user" });
  res.status(200).json({
    success: true,
    users,
  });
});

exports.adminOneUser = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new customError("No user found", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.adminupdateOneuserDetails = BigPromise(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  if (req.body.files) {
    const tempuser = await User.findById(req.params.id);
    const imageId = tempuser.photo.id;
    const resp = await cloudinary.v2.uploader.destroy(imageId);
    const result = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: "users",
        width: 150,
        crop: "scale",
      }
    );
    newData.photo = {
      id: result.public_id,
      secure_url: result.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

exports.adminOneUserDelete = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new customError("No user found", 400));
  }
  const imageId=user.photo.id;
  await cloudinary.v2.uploader.destroy(imageId);
  await user.remove();
  res.status(200).json({
    success: true,
    user,
  });
});
