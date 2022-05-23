import * as mongoose from 'mongoose';

export interface ICustomerBooking extends mongoose.Document {
    _id: string;
    customerId: string;
    requestStatus: string;
    date: string;
    timeSlot: Date;
    address: string;
};

const CustomerBookingSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },

    customerId: {
        type: String,
        require: true,
    },

    bookingStatus: {
        type: String,
        require: true,
    },

    date: {
        type: Date,
        require: true,
    },

    timeSlot: {
        type: String,
        require: true,
    },

    address :{
        type: String,
        require:true
    }

}, { versionKey: false });

export const CustomerBooking = mongoose.model<ICustomerBooking>('customer_bookings', CustomerBookingSchema);
