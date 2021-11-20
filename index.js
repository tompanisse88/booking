import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from "cors";
import path from "path";

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//use routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
const dbURI = 'mongodb+srv://tompanisse:tompanisse@deskbookingdb.lnn2w.mongodb.net/DeskDB?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//if in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })

  mongoose.connection.once("open", function(){
    app.listen(PORT, () => console.log("listening on port: " + PORT));
  }).on("error", function(error){
    console.log("ERROR IS:", error);
  });
}

