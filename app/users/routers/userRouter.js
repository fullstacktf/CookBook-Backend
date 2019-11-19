const express = require('express');
const router = express.Router();

// Controller 

const userController = require('../controllers/userController');

// User model

const User = require('../models/users');

// Get all users

router.get('/', async (req, res) => {
    try {
        const users = await userController.getAllUsers();
        res.status(200).json(users);
    }
    catch (e) {
        next('There is a problem getting all users');
    }
});

// Get user by id

router.get('/:id', async (req, res) => {
    try {
        const user = await userController.getUserByMail(req.body.email);
        res.status(200).json(user);
    }
    catch (e) {
        next('There is a problem getting user by email')
    }

});

// Add new user

router.post('/', async (req, res) => {
    try {
        const newUser = await userController.signUp(req.body);
        res.status(200).json(newUser)
    }
    catch (e) {
        next('Error adding new user');
    }

});

// Delete user

router.delete('/:id', async (req, res) => {
    try {
        const userToDelete = await userController.deleteUserById(req.body.email);
        res.status(200).json({ message: 'Deleted user' });
    }
    catch (e) {
        next('Error deleting user');
    }

});

// Sign Up


// Log In 

module.exports = router;