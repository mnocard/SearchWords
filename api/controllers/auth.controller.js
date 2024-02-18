import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = (req, res) => {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    User.create({ username, email, password: passwordHash, salt }).then((status) => {
        console.log(status);
        res.status(201).json({ "message": "User created!" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).json(err.message);
    });
};