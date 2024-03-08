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
        const authError = errorHandler(404, 'Wrong credentials');

        if (!user) return next(authError);
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return next(authError);

        GetToken(res, user).status(200);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            GetToken(res, user).status(200);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const passwordHash = bcrypt.hashSync(generatedPassword, 10);
            const username = req.body.username.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 1000).toString();

            console.log(req.body);

            const newUser = await User.create({
                username: username,
                email: req.body.email,
                password: passwordHash,
                profilePicture: req.body.photoURL
            });
            GetToken(res, newUser).status(201);
        }
    } catch (error) {
        console.log(error);
    }
};

function GetToken(response, user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...userDTO } = user._doc;
    return response
        .cookie('access_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .json(userDTO);
}
