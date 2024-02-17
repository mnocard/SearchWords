import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected.'))
    .catch((err) => console.log(err));

const app = express();
app.listen(3000, () => {
    console.log("port 3000!");
}); 

app.get('/', (req, res) => {
    res.json({ message: 'Api is working!'});
}); 