const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

const employeeRoute = require('./routes/employeeRoute');
const authRoute = require('./routes/authRoute');
const passportConfig = require("./middleware/passportConfig");

const app = express();

passportConfig(passport);

app.use(express.json());
app.use(passport.initialize());

//routes
app.use("/api/employees", employeeRoute);
app.use("/api/auth", authRoute);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(error);
})

