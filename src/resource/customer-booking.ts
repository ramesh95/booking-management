import { CustomerBooking } from '../model/customer-booking'
import * as UUID from 'uuid'

export class CustomerBookResource {
    // to add Booking
    async addCustomerBooking(
        customerId: string,
        bookingStatus: string,
        date: string,
        timeSlot: Date,
        address: string,
    ): Promise<object> {
        try {
            let id: string = UUID.v4()
            await CustomerBooking.create({
                _id: id,
                customerId: customerId,
                bookingStatus: bookingStatus,
                date: date,
                timeSlot: timeSlot,
                address: address
            });
            let res = {
                status: 200,
                statusMessage: "Booking successfully added"
            }
            return res
        } catch (e) {
            throw e;
        }
    }


    // to find all Booking
    async getAllBookingSlots(
        skip: any, limit: any
    ): Promise<object> {
        try {
            let results = await CustomerBooking.find({ bookingStatus: "pending" }).skip(parseInt(skip)).limit(parseInt(limit));
            if (results.length) {
                let res = {
                    status: 200,
                    statusMessage: "Success",
                    data: results
                }
                return res
            } else {
                let res = {
                    status: 204,
                    statusMessage: "Bookings are not available",
                    data: results
                }
                return res
            }
        } catch (e) {
            throw e;
        }
    }


    // to find Booking by id
    async getBookingById(
        bookingId: string
    ): Promise<object> {
        if (bookingId == "") {
            let res = {
                status: 400,
                statusMessage: "please enter Booking id"
            }
            return res;
        }
        try {
            let results = await CustomerBooking.find({ _id: bookingId })
            if (results.length) {
                let res = {
                    status: 200,
                    statusMessage: "Success",
                    data: results
                }
                return res
            } else {
                let res = {
                    status: 204,
                    statusMessage: "Please check the booking id",
                    data: results
                }
                return res
            }
        } catch (e) {
            throw e;
        }
    }

    // to find Booking by status
    async getAllBookingByStatus(
        bookingStatus: string
    ): Promise<object> {
        if (bookingStatus == "") {
            let res = {
                status: 400,
                statusMessage: "please enter Booking id"
            }
            return res;
        }
        try {
            let results = await CustomerBooking.find({ bookingStatus: bookingStatus })
            if (results.length) {
                let res = {
                    status: 200,
                    statusMessage: "Success",
                    data: results
                }
                return res
            } else {
                let res = {
                    status: 204,
                    statusMessage: `No ${bookingStatus} booking found`,
                    data: results
                }
                return res
            }
        } catch (e) {
            throw e;
        }
    }

    // to update Booking status 
    async updateBookingStatus(
        bookingId: string,
        bookingStatus: string
    ): Promise<object> {
        if (bookingId == "") {
            let res = {
                status: 400,
                statusMessage: "please enter Booking id"
            }
            return res;
        }
        try {
            let results = await CustomerBooking.find({ _id: bookingId })
            if (results.length) {
                if (results[0].bookingStatus == "pending" && bookingStatus == "payment") {
                    let res = {
                        status: 204,
                        statusMessage: "cannot update from pending to payment",
                    }
                    return res
                } else {
                    await CustomerBooking.update({ _id: bookingId }, { $set: { bookingStatus: bookingStatus } })
                    let res = {
                        status: 200,
                        statusMessage: "Success",
                    }
                    return res
                }
            } else {
                let res = {
                    status: 204,
                    statusMessage: "Booking not found",
                }
                return res
            }
        } catch (e) {
            throw e;
        }
    }
}