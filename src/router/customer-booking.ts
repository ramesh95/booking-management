import { CustomerBookResource } from "../resource/customer-booking";
import express from "express";
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post('/customer-booking', async (req, res) => {
    try {
        let customerId = req.body.customerId;
        let requestStatus = req.body.requestStatus;
        let date = req.body.date;
        let timeSlot = req.body.timeSlot;
        let address = req.body.address;
        let bookingRes = new CustomerBookResource()
        const results = await bookingRes.addCustomerBooking(customerId, requestStatus, date, timeSlot, address)
        res.send(results)
    } catch (error) {
        res.send(error)
    }
})


app.get('/BookingSlots', async (req, res) => {
    try {
        let skip = req.query.skip;
        let limit = req.query.limit;
        let bookingRes = new CustomerBookResource()
        const results = await bookingRes.getAllBookingSlots(skip, limit)
        res.send(results)
    } catch (error) {
        res.send(error)
    }
})

app.get('/bookingById/:id', async (req, res) => {
    try {
        let bookingId = req.params.id;
        let bookingRes = new CustomerBookResource()
        const results = await bookingRes.getBookingById(bookingId)
        res.send(results)
    } catch (error) {
        res.send(error)
    }
})

app.get('/bookingByStatus/:bookingStatus', async (req, res) => {
    try {
        let bookingStatus = req.params.bookingStatus;
        let bookingRes = new CustomerBookResource()
        const results = await bookingRes.getAllBookingByStatus(bookingStatus)
        res.send(results)
    } catch (error) {
        res.send(error)
    }
})



app.put('/updateBooking', async (req, res) => {
    try {
        let bookingId = req.body.bookingId;
        let bookingStatus = req.body.bookingStatus;
        let bookingRes = new CustomerBookResource()
        const results = await bookingRes.updateBookingStatus(bookingId, bookingStatus)
        res.send(results)
    } catch (error) {
        res.send(error)
    }
})


module.exports = app;