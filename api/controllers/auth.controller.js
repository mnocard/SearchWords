import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const user = await User.create({ username, email, password: passwordHash });
        GetToken(res, user).status(201);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const authError = errorHandler(404, 'User not found');

        if (!user) return next(authError);
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return next(authError);

        GetToken(res, user).status(200);
    } catch (error) {
        next(error);
    }
};

function GetToken(response, user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...userDTO } = user._doc;
    return response
        .cookie('access_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .json(userDTO);
}