import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DeskSchema = new Schema({
    user: String,
    deskID: Number,
    bookingID: String,
    userID: String
}, {
    timestamps: true
});

const Desk = mongoose.model('desk', DeskSchema);

export default Desk;