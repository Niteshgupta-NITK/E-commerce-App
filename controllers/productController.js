const BigPromise = require("../middlewares/bigPromise");
const cloudinary = require("cloudinary");
const Product = require("../models/product");
const customError = require("../utils/customError");
const WhereClause = require("../utils/whereClause");
const CustomError = require("../utils/customError");

exports.addProduct = BigPromise(async (req, res, next) => {
  let imageArray = [];
  if (!req.files) {
    return next(new customError("Images are required", 401));
  }
  if (req.files) {
    console.log("Multiple Files");
    for (let index = 0; index < req.files.photos.length; index++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[index].tempFilePath,
        {
          folder: "Product",
        }
      );
      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  req.body.photos = imageArray;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProduct = BigPromise(async (req, res, next) => {
  const resultPerPage = 6;
  const totalcountProduct = await Product.countDocuments();

  const productsObj = new WhereClause(Product.find(), req.query)
    .search()
    .filter();

  let products = await productsObj.base;
  const filteredProductNumber = products.length;

  //products.limit().skip()

  productsObj.pager(resultPerPage);
  products = await productsObj.base.clone();

  res.status(200).json({
    success: true,
    products,
    filteredProductNumber,
    totalcountProduct,
  });
});

exports.getSingleProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new customError("No product found with this id", 401));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

exports.admingetAllProduct = BigPromise(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

exports.adminUpdateOneProduct = BigPromise(async (req, res, next) => {
  var product = await Product.findById(req.params.id);
  if (!product) {
    return next(new customError("No product found with this id", 401));
  }
  var imageArray = [];
  if (req.files) {
    //destroy the existing images lol

    if (product.photos) {
      for (var i = 0; i < product.photos.length; i++) {
        const resp = await cloudinary.v2.uploader.destroy(product.photos[i].id);
      }
    }

    for (let index = 0; index < req.files.photos.length; index++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[index].tempFilePath,
        {
          folder: "Product",
        }
      );
      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }
  req.body.photos = imageArray;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.adminDeleteOneProduct = BigPromise(async (req, res, next) => {
  var product = await Product.findById(req.params.id);
  console.log(product);
  if (!product) {
    return next(new customError("No product with this id", 401));
  }
  for (var index = 0; index < product.photos.length; index++) {
    await cloudinary.v2.uploader.destroy(product.photos[index].id);
  }
  await product.remove();
  res.status(200).json({
    suceess: true,
    msg: "Product was deleted",
  });
});

exports.addAReview = BigPromise(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  // console.log(review);
  const product = await Product.findById(productId);

  const AlreadyReview = product.reviews.find((rev) => {
    //JSON.stringify(rev.user)==req.user._id.toString()
    var t = JSON.stringify(rev.user);
    var end = t.length;
    return t.substr(1, end - 2) === req.user._id.toString();
  });
  //console.log( JSON.stringify(rev.user),"+ ",req.user._id.toString());
  if (AlreadyReview) {
    console.log("Idhr aya bc");
    product.reviews.forEach((review) => {
      if (JSON.stringify(review.user) === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //console.log(review);
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  // adjust ratings

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  //save

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.DeleteReview = BigPromise(async (req, res, next) => {
  const { productId } = req.query;
  const product = await Product.findById(productId);
  const reviews = product.reviews.filter((rev) => {
    var t = JSON.stringify(rev.user);
    var end = t.length;
    return t.substr(1, end - 2) === req.user._id.toString();
  });
  product.numberOfReviews = product.reviews.length;
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  //update the product 

  await Product.findByIdAndUpdate(productId,{
    reviews,ratings,numberOfReviews
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getOnlyReviewsForOneProduct=BigPromise(async(req,res,next)=>{
  const product=await Product.findById(req.query.id);
  res.status(200).json({
    review:product.reviews,
  })

});