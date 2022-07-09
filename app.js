const express=require("express");
const app =express();
require('dotenv').config();
const morgan=require("morgan");
const cookieParser=require("cookie-parser");
const fileupload=require("express-fileupload");
//for swagger documentation
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/temp/",
}));
//regular middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//morgan middlewares
app.use(morgan('tiny'))

//home routes
const home=require("./routes/home");
const User=require("./routes/user");
const product=require("./routes/product");
const payment=require("./routes/payment");
const order=require("./routes/order");
const fileUpload = require("express-fileupload");
//Router middlewares
app.use('/api/v1',home);
app.use('/api/v1',User);
app.use('/api/v1',product);
app.use('/api/v1',payment);
app.use('/api/v1',order);
app.get('/signuptest',(req,res)=>{
    res.render('signuptest');
})
module.exports=app;