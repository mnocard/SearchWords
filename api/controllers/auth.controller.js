import User from "../models/user.model.js";

export const signup = (req, res) => {
    const { username, email, password } = req.body;
    User.create({ username, email, password }).then((status) => {
        console.log(status);
        res.status(201).json({ "message": "User created!" });
    }).catch((err) => {
        console.log(err.message)
        res.status(500).json(err.message);
    });
};