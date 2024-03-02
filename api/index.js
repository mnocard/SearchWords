import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config();
try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to mongodb.');
} catch (error) {
    console.log("Connection error. Check VPN." + err);
}

const app = express();
// next line allows to receive json from api 
app.use(express.json());

app.listen(3000, () => {
    console.log("Server started on port 3000. Url: http://localhost:3000");
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error (1)";

    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode
    });
});
