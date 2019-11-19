import User from "../models/users";

const mongoose = require('mongoose');
const User = require('../models/users');

module.exports = class UserCRUD {

    static async getAllUsers(req, res) {
        const allUsers = await User.findById();
        return res.json(allUsers);
    }

    // static async getUserByUserName(req, res) {
    //     const userToSearch = await User.findById(req.body.userName, (err, user) => {
    //         if (err) {
    //             return res.status(500).json({ message: `Error searching user ${err}` });
    //         }
    //         if (!user) {
    //             return res.status(404).json({ message: 'User doesnt exist'});
    //         }
    //     });
    //     res.json(userToSearch);
    // }

    static async getUserByMail(req, res) {
        const userToSearch = await User.findById(req.body.email);
        res.json(userToSearch);
    }
    
    static async signUp(req, res) {
        // Validador de si ya existe un usuario
        const newUser = new user({
            userName = req.body.userName,
            email = req.body.email,
            password = req.body.password
        });
        await newUser.save();
        return newUser;
    }     

    static async logIn(req, res) {
        // Validador de si los campos introducidos por el clientes son correctos
        const existEmail = await User.findById(req.body.email);
        const userToLogIn = await User.findById(req.body.email);
        if ((existEmail != null) || (userToLogIn.password === req.body.password)) {
            return true;
        }
        else {
            return false;
        }
    }

    static async deleteUserById(req, res) {
        const userToDelete = await User.findByIdAndDelete(req.body.email);
        res.json({ message: 'User deleted'});
    }
}