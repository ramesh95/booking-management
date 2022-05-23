require('dotenv').config();
import express from "express";
import mongoose from "mongoose";
const app = express();
const customerBooking = require("./router/customer-booking");
var cors = require('cors');
app.use(cors());
app.use('/', customerBooking)
var port = process.env.PORT
var userName = process.env.MONGO_USER
var password = process.env.MONGO_PASSWORD
var host = process.env.MONGO_HOST
var dbName = process.env.MAIN_DATABASE
let MONGO_URI = `mongodb+srv://${userName}:${password}@${host}/${dbName}?retryWrites=true`;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, }).then(async () => {
    console.log("successfully connected to database");
}).catch((e) => {
    console.log("database connection failed.");
    console.log(e);
});
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
