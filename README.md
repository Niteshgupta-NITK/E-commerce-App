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

`DB_URL` - MongoDB url either cloud or localhost for your database

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
![image](https://user-images.githubusercontent.com/56041569/179413814-95d8ccec-5fd7-4519-be7c-dd1c133f6292.png)



## Authors

-   [@Niteshgupta-NITK](https://github.com/Niteshgupta-NITK)
