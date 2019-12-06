import userController from '../controllers/user.controller';
import { Router } from 'express';

const router: Router = Router();

// Get all users

router.get('/', (req, res, next) => {
  userController.getAllUsers()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      next('Error in the db looking for users');
    });

});

// Get ONE user by id

router.get('/:id', async (req, res, next) => {
  userController.getUser(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      next('Error looking the user');
    });

});

// Add new user

router.post('/signup', async (req, res, next) => {
  userController.signUp(req.body)
    .then(token => {
      res.status(200).json(token);
    })
    .catch(() => {
      next('Error sign up');
    });
});

// Log in user

router.post('/signin', async (req, res, next) => {
  userController.signIn(req.body)
    .then(token => {
      res.status(200).json(token);
    })
    .catch(() => {
      next('Error sign in');
    });
});

// Update new recipe

router.put('/:id', async (req, res, next) => {
  userController.updateUser(req.params.id, req.body)
    .then(userDeleted => {
      res.status(200).json(userDeleted);
    })
    .catch(() => {
      next('Error in db trying to delete user');
    });
});

// Delete user

router.delete('/:id', async (req, res, next) => {
  userController.deleteUser(req.params.id)
    .then(userDeleted => {
      res.status(200).json(userDeleted);
    })
    .catch(() => {
      next('Error in DB deleting user');
    });
});


export = router;