import User from '../models/users.model';


export default class UserCRUD {

    static async getAllUsers() {
        const users = await User.find();
        return users;
    }

    static async getUser(id) {
        const user = await User.findById(id);
        return user;
    }
    
    static async signUp(body) {
        const { userName, email, password, confirm_password } = body;
        const newUser = new User({
            userName,
            email,
            password,
            confirm_password
        });
        await newUser.save();
        return newUser;     
    }     

    static async logIn(body) {
        const existEmail = await User.findById(body.email);
        const userToLogIn = await User.findById(body.email);
        if ((existEmail != null) ) {
            return true;
        }
        else {
            return false;
        }
    }

    static async updateUser(id, body) {
        const userUpdated = await User.findOneAndUpdate(id, body);
        return userUpdated;
    }

    static async deleteUser(id, body) {
        const userDeleted = await User.findByIdAndDelete(id);
        return userDeleted;
    }
}