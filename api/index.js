import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import path from 'path';

dotenv.config();
try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to mongodb.');
} catch (err) {
    console.log("Connection error. Check VPN. " + err);
}

const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// next line allows to receive json from api 
app.use(express.json());
app.use(cookieParser());

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
