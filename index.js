const app =require('./app');
const connectWithDB = require('./config/db');
require("dotenv").config();
const cloudinary = require('cloudinary');
connectWithDB();
cloudinary.config({
      cloud_name:process.env.CLOUDINARY_NAME,
      api_key:process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET,
})
const port=process.env.PORT||4000;
app.listen(port,()=>{
      console.log("Server is up and running at "+ port);
}); 