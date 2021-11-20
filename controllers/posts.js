import mongoose from "mongoose";
import Desk from "./models/postMessage.js";
import Booking from "./models/bookings.js";

export const getPost = async (req, res) => {
    try {
        const AllDesks = await Desk.find();
        const AllBookings = await Booking.find();
        
        for (let i in AllDesks) { 
            for (let y in AllBookings) {
                if(AllDesks[i].deskID == AllBookings[y].deskID) {
                    
                   AllDesks[i].user = AllBookings[y].user;
                   AllDesks[i].bookingID = AllBookings[y].id;
                } 
            }
        }

        res.status(200).json(AllDesks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    //const today = new Date();
    const post = req.body;
    const newPost = new Desk({
        deskID: post.deskID,
        user: post.user
      });
    try {
        await newPost.save(); 
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
} 

export const updatePost = async (req, res) => {
    const { id : _id } = req.params; //ID OF DESK
    const post = req.body; //user, deskID, userID, email

    const CheckIfDeskIsBooked = await Booking.findOne({ deskID: post.deskID });
    const CheckIfUserIsBooked = await Booking.findOne({ user: post.user }); 
    
    if(CheckIfDeskIsBooked == null && CheckIfUserIsBooked == null) {

        try {
        const newBooking = new Booking(post);
        await newBooking.save(); 
        res.status(201).json(newBooking);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    } else { 
        res.status(409).json({ message: "Already Booked" });
    }
    
    //const updatedPost = await Desk.findByIdAndUpdate(_id, post, { new: true });
    
    //res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id : _id } = req.params;

    await Booking.findByIdAndRemove(_id);

    res.json({message: 'post deleted.'});
}

