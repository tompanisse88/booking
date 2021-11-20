import mongoose from "mongoose";

const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    user: String,
    email: String,
    userID: String,
    deskID: { type: Number, unique: true}
});

export default mongoose.model("bookings", bookingSchema);