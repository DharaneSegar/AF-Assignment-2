import express from "express";
import UserController from '../controllers/userController.mjs';

const UserRouter = express.Router();

UserRouter.post('/', UserController.createUser);
UserRouter.post('/login', UserController.Login);
UserRouter.get('/',UserController.getAllUsers);
UserRouter.delete('/:id',UserController.deleteUserById);
UserRouter.get('/:id',UserController.getUserbyId);
// UserRouter.post('/forgot',authenticate,authorize('admin' || 'faculty' || 'student'),UserController.forgotPassword);
// UserRouter.post('/reset/:id',authenticate,authorize('admin' || 'faculty' || 'student'),UserController.resetPassword);

export default UserRouter;