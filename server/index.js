import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from "cors";

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/users', userRoutes);


const PORT = process.env.PORT || 5000;
const dbURI = 'mongodb+srv://tompanisse:tompanisse@deskbookingdb.lnn2w.mongodb.net/DeskDB?retryWrites=true&w=majority';

mongoose.connect(dbURI);
mongoose.connection.once("open", function(){
  app.listen(PORT, () => console.log("listening on port: " + PORT));
}).on("error", function(error){
  console.log("ERROR IS:", error);
});