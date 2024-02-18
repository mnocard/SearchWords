import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected.'))
    .catch((err) => console.log(err));

const app = express();
// next line allows to receive json from api 
app.use(express.json());

app.listen(3000, () => {
    console.log("port 3000!");
}); 

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);