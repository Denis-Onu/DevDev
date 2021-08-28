# DevDev
A functional MERN blog for developers.

## TechStack

Backend:
1. Node.js and Express for the server
2. MongoDB and Mongoose for the database
3. JWT for handling user tokens
4. Express File Upload for uploading images
5. Nodemailer for sending emails

Frontend:
1. ReactJS as the JS framework
2. MaterialUI for the UI design
3. Redux for state management
4. Axios for API requests
5. React-Router for frontend routes

## Configuration

Install the dependencies for the server by typing `npm install`, for the client `cd client` and `npm install`.
To start the app run `npm run dev` in the root folder.

### Environment variables

This projects has quite a few secret variables, so it needs a little more configuration.
In the server create a **.env** file and add the following variables:

```
PORT = 5000
MONGO_URI = your_mongodb_database_uri
JWT_SECRET = you_can_type_here_whatever_you_want
EMAIL_SERVICE = whatever_email_service_you_use
EMAIL_PASSWORD = your_email_password
CLIENT_URL = http://localhost:3000
```

In the client create a new **.env** file and add the following:

```
REACT_APP_SERVER_URL = http://localhost:5000
```

### Important note!

This project uses nodemailer for sending emails when a user forgets password. Which means it might have a different configuration depending on the email service.
If you use yahoo, you need to create an app password and set it as the email password for this project in the **.env** file.
If you use gmail, you only need to type in the actual password for your email.