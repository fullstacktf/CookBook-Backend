import { User, UserModel } from '../models/users.model';


export default class UserCRUD {

    static async getAllUsers(): Promise<UserModel[]> {
        const users = await User.find();
        return users;
    }

    static async getUser(id: string): Promise<UserModel> {
        const user = await User.findById(id);
        return user;
    }

    static async signUp(body): Promise<UserModel> {
        const { userName, email, password } = body;
        const newUser = new User({
            userName,
            email,
            password
        });
        //esto peta
        //newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        return newUser;
    }

    static async logIn(body): Promise<Boolean> {
        const existEmail = await User.findById(body.email);
        const userToLogIn = await User.findById(body.email);
        const userPasswordToLogin = await User.findById(body.password);
        if ((existEmail != null)) {
            return true;
        }
        else {
            return false;
        }
    }

    static async updateUser(id, body): Promise<UserModel> {
        const userUpdated = await User.findOneAndUpdate(id, body);
        return userUpdated;
    }

    static async deleteUser(id: string, body): Promise<UserModel> {
        const userDeleted = await User.findByIdAndDelete(id);
        return userDeleted;
    }
}