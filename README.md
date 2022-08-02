# E-commerce backend 

A website where customers have various merhchandise.It can be purchased  and shipped to shipping address of customers.

## Features

-   User Authentication , Authorization
-   Forgot Password ,Reset Password Functionality
-   Secure Payment Functionality
-   Order an item, cancle an order
-   Access to ordered items(cart)
-   Admin can add/remove items


## Tech Stack

**Server:** Node, Express, MongoDB

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```DB_URL``` - MongoDB url either cloud or localhost for your database

`JWT_SECRET` - Jwt secret token 

`JWT_EXPIRY` -Jwt Token expiry days write as `xd` for token to expire in x days

`COOKIE_TIME` - Time to expire the cookie stored write number x for x days

`CLOUDINARY_NAME`- Cloudinary Cloud Name

`CLOUDINARY_API_KEY`- Cloudinary API key

`CLOUDINARY_API_SECRET`- Cloudinary  API Secret  string

`SMTP_HOST`- SMTP Host (smtp.mailtrap.io)

`SMTP_PORT`- SMTP Port (2525)

`SMTP_USER`- SMTP Username

`SMTP-PASS`- SMTP Password

`STRIPE_API_KEY`- Stripe API key

`STRIPE_SECRET`- Stripe Secret string

`RAZORPAY_API_KEY`- Razorpay API key

`RAZORPAY_SECRET`- Razorpay Secret String



## Run Locally

Clone the project

```bash
  git clone https://github.com/Niteshgupta-NITK/E-commerce-App
```

Go to the project directory and install dependencies

```bash
  cd E-commerce-App
  npm install
```

Start the server
```bash
  npm run dev
```

## Screenshots
![image](https://user-images.githubusercontent.com/56041569/179414112-6410fab1-7db5-4ddc-80db-4823488f2137.png)
![image](https://user-images.githubusercontent.com/56041569/179414301-5dd99cb7-142e-490c-8213-b45ca284e5d2.png)
![image](https://user-images.githubusercontent.com/56041569/179414571-008c284a-c8d5-48a7-bf2b-ee9d0871fd9f.png)
![image](https://user-images.githubusercontent.com/56041569/179414981-528b1c74-3305-4f9b-9734-a73bd91718a5.png)
![image](https://user-images.githubusercontent.com/56041569/179416378-cc5a30de-95a8-4543-8710-e3ea8e95b78f.png)
![image](https://user-images.githubusercontent.com/56041569/179416401-87f68425-aa95-4256-b417-70d31319677f.png)
![image](https://user-images.githubusercontent.com/56041569/179416417-bf53601b-bfbc-480d-a200-0a3bab90a710.png)
![image](https://user-images.githubusercontent.com/56041569/179416434-b3412442-68ef-4c11-90f6-e69d1b60f645.png)
![image](https://user-images.githubusercontent.com/56041569/179416443-5d4f1709-7edc-4943-b7da-948cb6de65b8.png)
![image](https://user-images.githubusercontent.com/56041569/179416450-41cfa052-3066-4bf8-b4dd-3ce7722ce7ec.png)




## Authors

-   [@Niteshgupta-NITK](https://github.com/Niteshgupta-NITK)
