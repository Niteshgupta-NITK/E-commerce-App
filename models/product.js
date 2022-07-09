const mongoose = require("mongoose");
const user = require("./user");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide product name"],
    trim: true,
    maxlength: [120, "Product name shouldnot be more than 120 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please Provide price"],
  },
  description: {
    type: String,
    required: [true, "Please Provide product description"],
  },
  photos: [
    {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  stock:{
    type:Number,
    required:[true,'Please Add Stock'],
  },
  category: {
    type: String,
    required: [
      true,
      "Please select category from - short-sleeves, long-sleeves, sweat-shirts,hoodies",
    ],
    enum: {
      values: ["shortsleeves", "longsleeves", "sweatshirts", "hoodies"],
      message:
        "Please Select category from short-sleeves, long-sleeves, sweat-shirts and hoodies",
    },
  },
  brand: {
    type: String,
    required: [true, "Please provide a brand"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
         type:mongoose.Schema.ObjectId,
         ref:'User',
         required:true,
      },
      name:{
         type:String,
         required:true,
      },
      rating:{
          type:Number,
          required:true,
      },
      comment:{
         type:String,
         required:true,
      },
    },
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }
});

module.exports = mongoose.model("Product", productSchema);
