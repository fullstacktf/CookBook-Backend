import userController from '../controllers/user.controller';
import { Router } from 'express';
const router: Router = Router();
import bcrypt from 'bcryptjs';

// Get all users

router.get('/', (req, res, next) => {
    try {
        userController.getAllUsers()
        .then(recipes => {
            res.status(200).json(recipes);
        })
        .catch(error => {
            next(`Error in the db looking for users: ${error}`);
        });
    } 
    catch (error) {
        next(`DB empty : ${error}`);
    }
});

// Get ONE user by id

router.get('/:id', async (req, res, next) => {
    try {
        // Validator id here
        userController.getUser(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            next(`Error looking the user: ${error}`);
        });
    }
    catch (error) {
        next(`Error getting the user or user doesnt exist: ${error}`);
    }
});

// Add new user

router.post('/', async (req, res, next) => {
    try {
        // Validator body here
        userController.signUp(req.body)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            next(`Error saving new user: ${error}`);
        });
    }
    catch (error) {
        next(`Error saving: ${error}`);
    }
});

// Update new recipe

router.put('/:id', async (req, res, next) =>{
    try {
        // Validator body here
        userController.updateUser(req.params.id, req.body)
        .then(userDeleted => {
            res.status(200).json(userDeleted);
        })
        .catch(error => {
            next(`Error in db trying to delete user: ${error}`);
        });
    }
    catch (error) {
        next(`Error deleting user: ${error}`);
    }
});

// Delete user

router.delete('/:id', async (req, res, next) => {
    try {
        // Validator id here
        userController.deleteUser(req.params.id, req.body)
        .then(userDeleted => {
            res.status(200).json(userDeleted);
        })
        .catch(error => {
            next(`Error in DB deleting user: ${error}`);
        });
    }
    catch (error) {
        next(`Error in DB deleting: ${error}`)
    }
});


export = router;