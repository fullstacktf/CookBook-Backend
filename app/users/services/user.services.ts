import { User, UserModel } from '../models/users.model';
import { createToken } from '../services/jwt.services';

export default class UserCRUD {

  static async getUsers(): Promise<UserModel[]> {
    const users = await User.find().limit(10);
    return users;
  }

  static async getUser(id: string): Promise<UserModel> {
    const user = await User.findById(id);
    return user;
  }

  static async signUp(body: UserModel): Promise<string> {
    const { userName, email, password } = body;

    const newUser: UserModel = new User({
      userName,
      email,
      password,
      ingredientsPreferences: {
        preferent: [],
        ignore: []
      },
      follows: [],
      ownRecipes: [],
      otherRecipes: [],
      rol: 'user'
    });
    newUser.avatar = newUser.gravatar();
    await newUser.save(err => { if (err) throw err; });

    return createToken(newUser);
  }

  static async signIn(body: UserModel): Promise<string> {
    const { userName, password } = body;
    const user = await User.findOne({ userName });
    if (user === null) throw Error;
    user.comparePasswords(password, (error, isMatch) => {
      if (error) throw error;
      if (!isMatch) throw error;
      console.log('controller');
    });
    const token = createToken(user);
    return token;
  }

  static async updateUser(id: string, body: string): Promise<UserModel> {
    const userUpdated = await User.findOneAndUpdate(id, body);
    return userUpdated;
  }

  static async deleteUser(id: string): Promise<UserModel> {
    const userDeleted = await User.findByIdAndDelete(id);
    return userDeleted;
  }
}